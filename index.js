const cities = require('./cities.json');
const fs = require('fs');

console.log(cities["서울특별시"].length);

const data = {
    name: 'gabriel',
};

const jsonData = JSON.stringify(data, null, 2);

const filename = 'data.json';

fs.writeFile(filename, jsonData, 'utf8', (err) => {
    if (err) {
        console.error('파일 생성 실패:', err);
    } else {
        console.log('파일 생성!');
    }
});
