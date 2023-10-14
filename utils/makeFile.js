import fs from "fs";
import path from "path";

export const makeFile = ({data, filename}) => {
    const jsonData = JSON.stringify(data, null, 0);
    const directory = './results/';
    const filePath = path.join(directory, `${filename}.json`);

    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }

    fs.writeFile(filePath, jsonData, 'utf8', (err) => {
        if (err) {
            console.error('파일 생성 실패:', err);
        } else {
            console.clear();
            console.log(`./${filePath}에 파일이 생성되었습니다!: ${data.length}건`.green);
            console.log(`다음 동작을 위해 키보드의 아무 방향키를 눌러주세요`.yellow);
        }
    });
}
