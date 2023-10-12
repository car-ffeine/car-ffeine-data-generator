import {getConnection} from "../utils/mysql.js";

const stationMap = new Map();
const chargerMap = new Map();

const makeStation = async ()=>{
  const [stationsRow, _stationsFields] = await getConnection().query('SELECT * from charge_station');
  for(const station of stationsRow) {
    stationMap.set(station.station_id, station);
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
  }
}

export const generateStationData = async () => {
  await makeStation();
  await addChargers();
  addChargersToStation();
}
