
// async/await 함수(비동기) 안에서 에러 발생 시 자동으로 next(err)로 넘겨줌

// 라우터나 컨트롤러에서 try/catch 안 써도 됨

const asyncHandler = fn => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next)

module.exports = asyncHandler