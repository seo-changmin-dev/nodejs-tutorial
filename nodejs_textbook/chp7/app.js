const express = require('express');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

// config 설정을 따르고 있는, sequelie 객체
// 비구조화 할당으로 선언
const { sequelize } = require('./models');

// express는 factory function을 리턴함에 주의
// node_modules/express/index.js -> ./lib/express -> createApplication()와 그에 따른 프로퍼티들 리턴
const app = express();

// app.set, app.get으로 express에 전역적으로 데이터 저장 가능
// 앱 전체의 설정을 공유할 때 유용하다.
// 지금 set된 'port'는 listen시 사용한다.
app.set('port', process.env.PORT || 3001);
app.set('view engine', 'html');

nunjucks.configure('views', {
  express: app,
  watch: true, // html 파일 변경시 템플릿 엔진 다시 렌더링.
});


app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});