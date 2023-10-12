import {regions} from "../regions.js";
import cities from "../assets/cities.json" assert {type: "json"};
import {makeFile} from "../utils/makeFile.js";

export const generateCityData = () => {
    const data = [];
    regions.map((region) => {
        data.push(region);
        cities[region.name].map((city) => {
            let name = region.name;
            if(city.a){
                name+=` ${city.a}`;
            }
            if(city.b){
                name+=` ${city.b}`;
            }
            if(city.c){
                name+=` ${city.c}`;
            }
            if(city.d){
                name+=` ${city.d}`;
            }
            data.push({
                name,
                latitude: city.lat==="undefined"?0:Number(city.lat),
                longitude: city.lng==="undefined"?0:Number(city.lng),
            });
        });
    });

    makeFile(data);
}
