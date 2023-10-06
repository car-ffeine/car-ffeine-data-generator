const cities = require('./cities.json');
const fs = require('fs');
const regions = require('./regions.js');
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


const jsonData = JSON.stringify(data, null, 2);

const filename = 'data.json';

fs.writeFile(filename, jsonData, 'utf8', (err) => {
    if (err) {
        console.error('파일 생성 실패:', err);
    } else {
        console.log('파일 생성!');
    }
});
