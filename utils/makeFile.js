import fs from "fs";

export const makeFile = (data) => {

    const jsonData = JSON.stringify(data, null, 2);

    const filename = 'data.json';

    fs.writeFile(filename, jsonData, 'utf8', (err) => {
        if (err) {
            console.error('파일 생성 실패:', err);
        } else {
            console.log('파일 생성!');
        }
    });
}
