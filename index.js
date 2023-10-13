import {generateCityData} from "./generators/city.js";
import select, { Separator } from '@inquirer/select';
import {generateStationData} from "./generators/station.js";
import colors from 'colors';

while(true){

    const answer = await select({
        message: '무엇을 할까요?',
        choices: [
            {
                name: '도시 데이터를 생성한다.',
                value: 'city',
            },
            {
                name: 'msw용 충전소/충전기 통합 정보를 생성한다',
                value: 'stations',
            },
            new Separator(),
        ],
    });

    console.log('***** 잠시만 기다려주세요... *****'.yellow)

    switch (answer) {
        case 'city':
            await generateCityData();
            break;
        case 'stations':
            await generateStationData();
            break;
        default:
            console.log('준비중입니다.');
    }

}
