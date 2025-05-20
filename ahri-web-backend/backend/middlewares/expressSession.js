// =============================================================================
//   o__ __o     o          o      o__ __o                    o__ __o     o
//  <|     v\   <|\        <|>    /v     v\                  /v     v\   <|>
//  / \     <\  / \\o      / \   />       <\                />       <\  < >
//  \o/     o/  \o/ v\     \o/  _\o____          o__ __o    \o            |
//   |__  _<|    |   <\     |        \_\__o__   /v     v\    |>_          o__/_
//   |       \  / \    \o  / \             \   />       <\   |            |
//  <o>      /  \o/     v\ \o/   \         /   \         /  <o>           |
//   |      o    |       <\ |     o       o     o       o    |            o
//  / \  __/>   / \        < \    <\__ __/>     <\__ __/>   / \           <\__
//
// =============================================================================
//
// All Rights Reserved.
// Any use of this source code is subject to a license agreement with the BNSoft
//
// Contact URL : www.bns.co.kr.
// =============================================================================
// =============================================================================
// expressSession (module definition)
// express session과 socket.io 연결을 위한 미들웨어 설정
// 사용자 인증 및 세션 관리를 위한 설정 포함
// =============================================================================
var session = require('express-session');

// =============================================================================
// sessionMiddleware (middleware)
// Express 및 Socket.io에서 사용할 세션 미들웨어 설정
//    [설정값 설명]
//    secret: 세션 암호화를 위한 키 (보안을 위해 환경 변수로 관리 권장)
//    resave: 변경되지 않은 세션을 계속 저장할지 여부 (false로 설정하여 불필요한 저장 방지)
//    saveUninitialized: 초기화되지 않은 세션을 저장할지 여부 (false로 설정하여 빈 세션 저장 방지)
//    cookie.secure: HTTPS 환경에서만 세션 쿠키를 전송할지 여부 (배포 시 true로 변경 필요)
//    [RETURN]   : Express 세션 미들웨어 (Function)
// =============================================================================
// const sessionMiddleware = session({
//     secret: "ahri-web-session",
//     resave: false,
//     saveUninitialized: false, // 초기화되지 않은 세션은 저장하지 않도록 설정
//     cookie: { secure: false } // HTTPS 환경에서는 true로 변경 필요
// });

const sessionMiddleware = session({
    secret: 'ahri-web-session',          // 고유한 값 (노출 X)
    resave: false, //세션 아이디를 접속할때마다 새롭게 발급하지 않음
    saveUninitialized: true,  //세션 아이디를 실제 사용하기전에는 발급하지 않음
    cookie: {
        maxAge: 1000 * 60 * 2,         // 세션 유효 시간 (30분)
        httpOnly: true,
        sameSite : 'lax' // 기본적으로 탭 간 공유는 되지만, 브라우저가 context를 바꾸면 달라질 수 있음
    }
});

// =============================================================================
// 모듈 내보내기
// =============================================================================
module.exports = sessionMiddleware;