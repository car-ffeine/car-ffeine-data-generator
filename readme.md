# 카페인 서비스 실제 데이터 기반의 data 생성기

실제 데이터를 가지고 프로젝트에서 사용 가능한 json 파일을 생성합니다.

## 설치
```
yarn
```

## 실행
```
yarn start
```

키보드로 조작 후 엔터 클릭

[MySQL 오류 발생 시 참고 문서](https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
)

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '비밀번호를 입력하세요';
```

```sql
flush privileges;
```

