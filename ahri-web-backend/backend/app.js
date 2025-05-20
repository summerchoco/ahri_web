require("reflect-metadata");
var createError = require('http-errors');
var express = require('express');
const cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sessionMiddleware = require('./middlewares/expressSession');
const { notFoundHandler, errorHandler } = require('./common/error/errorHandler');


var indexRouter = require('./routes');
var apiRouter = require('./routes/api');

var app = express();

app.use(cors({
    origin: 'https://ahri.bns.co.kr/3001', // 와일드카드(*) 절대 사용 안 됨, front-domain만 열어주기, nginx 사용 및 설정 생각해보기
    credentials: true // 쿠키나 인증정보 포함한 요청 허용
}));
app.use(sessionMiddleware);

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/files',express.static(path.join(__dirname, 'files')));

app.use('/', indexRouter);
app.use('/api', apiRouter);



// // 404 에러 처리 (라우트가 없을 때)
// app.use((req, res, next) => {
//   const err = new Error('페이지를 찾을 수 없습니다.');
//   err.status = 404;
//   next(err);
// });
//
// // 오류 처리 미들웨어
// app.use((err, req, res, next) => {
//   res.status(err.status || 500);
//   res.render('error', { message: err.message, error: err });
// });

//에러 핸들링 미들웨어 등록
app.use(notFoundHandler)
app.use(errorHandler)

module.exports = {app};

