# 카페인 서비스 실제 충전소 기반의 데이터 생성기

실제 데이터를 가지고 프로젝트에서 사용 가능한 json 파일을 생성합니다.

## 동작 환경

- node.js 20 이상 (필수)
- mysql 8.0 이상 (필수)

## 설치
```
yarn
```

### mysql 계정 설정 관련

```js
//utils/mysql.js

const connection = await mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : '0000',
  database : 'charge'
});
```

위의 코드에서 user와 password 등 자신의 mysql 계정에 맞게 수정합니다.

### 데이터베이스 생성
- charge 테이블을 만듭니다.
- ./assets 폴더에 있는 sql파일을 활용하여 데이터베이스를 생성합니다.



[MySQL 오류 발생 시 참고 문서](https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
)

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '비밀번호를 입력하세요';
```

```sql
flush privileges;
```


## 실행
```
yarn start
```

키보드로 조작 후 엔터 클릭

## 생성된 데이터

- ./results 폴더에 생성된 데이터를 확인할 수 있습니다.
