import {generateCityData} from "./generators/city.js";
import select, { Separator } from '@inquirer/select';
import {generateStationData} from "./generators/station.js";

const answer = await select({
    message: '어떤 데이터를 생성할까요?',
    choices: [
        {
            name: '도시 생성기',
            value: 'city',
            description: '도시 데이터를 생성합니다.',
        },
        {
            name: '충전소 종합 정보 생성기',
            value: 'stations',
            description: '충전소 + 충전기의 종합 정보를 생성합니다.',
        },
        new Separator(),
        {
            name: '준비중',
            value: 'no',
            disabled: '(준비중인 메뉴입니다)',
        },
    ],
});

switch (answer) {
    case 'city':
        generateCityData();
        break;
    case 'stations':
        generateStationData();
        break;
    default:
        console.log('준비중입니다.');
}
