import {getConnection} from "../utils/mysql.js";
import {generateRandomData} from "../utils/generateRandomData.js";

const stationMap = new Map();
const chargerMap = new Map();

const makeStation = async ()=>{
  const [stationsRow, _stationsFields] = await getConnection().query('SELECT * from charge_station');
  for(const station of stationsRow) {
    const newStation = {
      stationId: station.station_id,
      stationName: station.station_name,
      companyName: station.company_name,
      contact: station.contact,
      chargers: [], // 다음 단계에서 추가
      isParkingFree: station.is_parking_free > 0,
      operatingTime: station.operating_time,
      address: station.address,
      detailLocation: station.detail_location,
      latitude: Number(station.latitude),
      longitude: Number(station.longitude),
      isPrivate: station.is_private > 0,
      totalCount: 0, // 다음 단계에서 추가
      availableCount: 0, // 다음 단계에서 추가
      quickChargerCount: 0, // 다음 단계에서 추가
      stationState: station.station_state,
      privateReason: station.private_reason,
      reportCount: generateRandomData([0, 0, Math.floor(Math.random() * 99)]), // 랜덤 데이터 추가
    }
    stationMap.set(station.station_id, newStation);
  }
}

const addChargers = async () => {
  const [chargersRow, _chargersFields] = await getConnection().query(`
        SELECT charger.*, charger_status.charger_condition, charger_status.latest_update_time
        FROM charger
        INNER JOIN charger_status
        ON charger.charger_id = charger_status.charger_id
        AND charger.station_id = charger_status.station_id
    `);
  for(const charger of chargersRow) {
    if(chargerMap.has(charger.station_id)) {
      chargerMap.get(charger.station_id).push(charger);
    } else {
      chargerMap.set(charger.station_id, [charger]);
    }
  }
}

const addChargersToStation = () => {
  for(const [stationId, chargers] of chargerMap) {
    const station = stationMap.get(stationId);
    station.chargers = chargers;
    station.totalCount = chargers.length;
    station.availableCount = chargers.filter(charger => charger.charger_condition === 'STANDBY').length;
    station.quickChargerCount = chargers.filter(charger => Number(charger.capacity) >= 50).length;
  }
}

export const generateStationData = async () => {
  await makeStation();
  await addChargers();
  addChargersToStation();
  console.log(stationMap.get("PW013287"));
}
