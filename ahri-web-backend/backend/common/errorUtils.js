const {
    ValidationError,
    AuthError,
    ChatError,
    ExternalAPIError
} = require('./error/customError');

function chatCustomError(status, message) {
    switch (status) {
        case 400:
            return new ValidationError(message, status);
        case 401:
            return new AuthError('인증 오류 (KEY값 확인)', status);
        case 403:
            return new AuthError('접근 권한이 없습니다.', status);
        case 404:
            return new ChatError('요청한 리소스를 찾을 수 없습니다.', status);
        case 502:
        case 503:
        case 504:
            return new ExternalAPIError('외부 API 오류가 발생했습니다.', status);
        default:
            return new ChatError(message, status);
    }
}

module.exports = { chatCustomError };
