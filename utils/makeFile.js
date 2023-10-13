import fs from "fs";
import path from "path";

export const makeFile = ({data, filename}) => {
    const jsonData = JSON.stringify(data, null, 2);
    const directory = './results/';
    const filePath = path.join(directory, `${filename}.json`);

    // Create the directory if it doesn't exist
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }

    fs.writeFile(filePath, jsonData, 'utf8', (err) => {
        if (err) {
            console.error('파일 생성 실패:', err);
        } else {
            console.log('파일이 생성되었습니다!');
        }
    });
}
