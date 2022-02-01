const express = require('express');
const path = require('path');
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

sequelize.sync({ force:true })
  .then(() => {
    console.log('DB 연결 성공');
  })
  .catch((err) => { // Promise 객체에 꼭 .catch를 붙이는 것을 권장한다.
    console.error(err);
  });


app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});


app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});