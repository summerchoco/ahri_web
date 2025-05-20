// common/error/errorHandler.js

// 모든 라우터/서비스에서 발생한 에러를 한 곳에서 통합 처리
// res.status(...).json(...) 형태로 일관된 응답 제공

// 404 Not Found 처리
const notFoundHandler = (req, res, next) => {
    const err = new Error('페이지를 찾을 수 없습니다.')
    err.status = 404
    next(err)
}

// 전역 에러 핸들링
const errorHandler = (err, req, res, next) => {
    const status = err.status || 500
    const message = err.message || '서버 오류가 발생했습니다.'

    // 에러 로그 출력 (개발용)
    console.error(`[Error ${status}] ${message}`)

    // EJS 템플릿을 이용한 에러 페이지 렌더링
    res.status(status)
    res.render('error', {
        message,
        error: req.app.get('env') === 'development' ? err : {}, // 개발 환경만 전체 에러 표시
    })
}

module.exports = {
    notFoundHandler,
    errorHandler,
}
