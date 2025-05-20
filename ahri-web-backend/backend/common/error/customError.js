class ChatError extends Error {
    constructor(message, status = 500) {
        super(message);
        this.name = 'ChatError';
        this.status = status;
        Error.captureStackTrace(this, this.constructor);
    }
}

class AuthError extends Error {
    constructor(message = '인증이 필요합니다.', status = 401) {
        super(message);
        this.name = 'AuthError';
        this.status = status;
    }
}

class ValidationError extends Error {
    constructor(message = '잘못된 요청입니다.', status = 400) {
        super(message);
        this.name = 'ValidationError';
        this.status = status;
    }
}

class ExternalAPIError extends Error {
    constructor(message = '외부 API 오류가 발생했습니다.', status = 502) {
        super(message);
        this.name = 'ExternalAPIError';
        this.status = status;
    }
}

module.exports = {
    ChatError,
    AuthError,
    ValidationError,
    ExternalAPIError,
};
