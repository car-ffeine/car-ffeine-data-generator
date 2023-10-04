const cities = require('./cities.json');
const fs = require('fs');
const regions = require('./regions.js');
regions.map((region) => {
    const {name} = region;
    const length = cities[name].length;
    console.log(name, length);
});


// const data = {
//     name: 'gabriel',
// };
//
// const jsonData = JSON.stringify(data, null, 2);
//
// const filename = 'data.json';
//
// fs.writeFile(filename, jsonData, 'utf8', (err) => {
//     if (err) {
//         console.error('파일 생성 실패:', err);
//     } else {
//         console.log('파일 생성!');
//     }
// });
