const express = require('express');
const path = require('path');
const morgan = require('morgan');


const app = express();
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'views'))); // 요청 주소가 '/' 이여도, 이제는 '/views/'로 해석된다.
app.use(express.json()); // application/json을 파싱해서 req.body 객체로 만든다

// application/x-www-form-urlencoded를 파싱해서 req.body 객체로 만든다.
// key=value 쌍이 '&' 로 구분되는, form을 위한 문자열들
// extended false면 노드의 queryString 모듈로 쿼리스트링 파싱
app.use(express.urlencoded({ extended: false }));

// app.use, app.get, app.post, app.put, app.delete 모두 미들웨어를 사용하는 메서드였다...
app.use((req, res, next) => {
  console.log('모든 요청에 다 실행됩니다.');
  next();
});


const fs = require('fs');
const multer = require('multer');
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/')
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 새로 생성합니다.');
  fs.mkdirSync('uploads');
}

app.post('/upload', upload.single('image'), (req, res) => {
  console.log(req.file, req.body);
  res.send('ok');
});

app.get('/', (req, res, next) => {
  console.log('GET / 요청에서만 실행됩니다.')
  res.sendFile(path.join(__dirname, 'views/multipart.html'));
});
// , (req, res) => {
//   throw new Error('에러는 에러처리 미들웨어로 갑니다.');
// });

// parameter가 4개인 경우 에러처리 미들웨어로 간주된다.
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'),'번 포트에서 대기중');
});