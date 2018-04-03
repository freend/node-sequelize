# Express Sequelize
## 개요
express3 상태와 sequelize를 학습할 목적으로 만들었습니다.<br>
우선적으로 sequelize를 학습하며 추후 express4로 마이그래이션 할 예정입니다.<br>
지극히 개인적인 내용을 적어둔 부분입니다. 다른 의견이 있으면 알려주시면 감사하겠습니다.

## model folder

#### required folder
required('folder-name')으로 폴더를 호출하면
folder-name not defined 에러가 발생한다.
이때 폴더에 index.js가 있으면 index.js를 기본적으로 불러들이게 된다.

#### models/index.js
1. document에서 정의한 sequelize 호출을 보면 최소 아래내용이 포함되어야 한다.<br>
“`const sequelize = new Sequelize(dbname, dbId, dbpass, {host, dialect})“`
2. model이 있기만 하고 선언이 재대로 되어만 있다면 컬럼내용이 없어도 테이블을 생성하고 id, createdAt, updatedAt을 자동으로 생성함.
3. db[modelName].associate(db); <br>git site에는 이 부분이 존재함. 그런데 이 부분의 내용을 몰라 확인하던 결과 "Sequelize has changed how associations and instance methods are defined, post version > 4."
라는 내용이 있었음. 상호 연관있는 column을 연결하기 위해 만든 거 같은데 공식 documents에는 git과 내용이 다름. 현재는 associate를 사용하지 않으므로 주석 처리함.
- git : “`Task.associate = function (models) {models.Task.belongsTo(models.User, {“` 으로 선언.
- document : “`Player.belongsTo(Team);“`으로 되어있음.

## 참조사이트
 sequelize<p>
 [한글로 된 공부사이트](http://totuworld.github.io/2015/08/07/sequelize/)<br>
 [sequelize git-hub](https://github.com/sequelize/express-example)<br>
 [sequelize documents](http://docs.sequelizejs.com/)