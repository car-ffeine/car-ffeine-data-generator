import {getConnection} from "../utils/mysql.js";
import {generateRandomData} from "../utils/generateRandomData.js";
import {makeFile} from "../utils/makeFile.js";

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
    chargerMap.set(charger.station_id, []);
  }

  for(const charger of chargersRow) {
    const newCharger = {
      type: charger.type,
      price: charger.price,
      capacity: Number(charger.capacity),
      latestUpdateTime: charger.latest_update_time,
      state: charger.charger_condition,
      method: charger.method,
    }
    chargerMap.get(charger.station_id).push(newCharger);
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

export const getRegionName = (regionName) => {
  switch (regionName) {
    case 'seoul':
      return '서울특별시';
    case 'incheon':
      return '인천광역시';
    case 'gwangju':
      return '광주광역시';
    case 'daegu':
      return '대구광역시';
    case 'ulsan':
      return '울산광역시';
    case 'daejeon':
      return '대전광역시';
    case 'busan':
      return '부산광역시';
    case 'gyeonggi':
      return '경기도';
    case 'gangwon':
      return '강원특별자치도';
    case 'chungnam':
      return '충청남도';
    case 'chungbuk':
      return '충청북도';
    case 'gyeongbuk':
      return '경상북도';
    case 'gyeongnam':
      return '경상남도';
    case 'jeonbuk':
      return '전라북도';
    case 'jeonnam':
      return '전라남도';
    case 'jeju':
      return '제주특별자치도';
    default:
      return undefined;
  }
};

export const generateStationData = async (region) => {
  await makeStation();
  await addChargers();
  addChargersToStation();
  // TODO: 충전기 사용량 데이터 추가
  const stationData = Array.from(stationMap.values());
  if(region) {
    const filteredStationData = stationData.filter(station => station.address.includes(getRegionName(region)));
    makeFile({data: filteredStationData, filename: `real_station_${region}`});
  }
  else {
    makeFile({data: stationData, filename: 'real_station'});
  }
}
