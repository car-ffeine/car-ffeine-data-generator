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
            {
                name: 'msw용 충전소/충전기 통합 정보를 쪼개서 생성한다',
                value: 'stations_split',
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
        case 'stations_split':
            await generateStationData('seoul');
            await generateStationData('incheon');
            await generateStationData('gwangju');
            await generateStationData('daegu');
            await generateStationData('ulsan');
            await generateStationData('daejeon');
            await generateStationData('busan');
            await generateStationData('gyeonggi');
            await generateStationData('gangwon');
            await generateStationData('chungnam');
            await generateStationData('chungbuk');
            await generateStationData('gyeongbuk');
            await generateStationData('gyeongnam');
            await generateStationData('jeonbuk');
            await generateStationData('jeonnam');
            await generateStationData('jeju');

            break;
        case 'bye':
            console.log('프로그램을 종료합니다.'.red);
            process.exit(1);
            break;
        default:
            console.log('준비중입니다.');
    }

}
