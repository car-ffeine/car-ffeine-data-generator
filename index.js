import {generateCityData} from "./generators/city.js";
import select, { Separator } from '@inquirer/select';
import {generateStationData} from "./generators/station.js";
import colors from 'colors';

while(true){

    const answer = await select({
        message: '무엇을 할까요? (방향키 + 엔터로 선택하세요)',
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
            {
                name: '프로그램을 종료한다',
                value: 'bye',
            },
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
        case 'bye':
            console.log('프로그램을 종료합니다.'.red);
            process.exit(1);
            break;
        default:
            console.log('준비중입니다.');
    }

}
