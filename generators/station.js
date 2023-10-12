import {getConnection} from "../utils/mysql.js";

export const generateStationData = async () => {
    const [rows, fields] = await getConnection().query('SELECT * from charge_station');
    console.log(rows);

}
