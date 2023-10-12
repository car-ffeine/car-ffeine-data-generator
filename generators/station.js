import {getConnection} from "../utils/mysql.js";

export const generateStationData = () => {
    getConnection().query('SELECT * from charge_station', (error, rows, fields) => {
        if (error) {
            throw error;
        }
        console.log('charge_station data is: ', rows);
    });
}
