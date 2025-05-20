// utils/timeUtil.js

// 현재 시간을 가져오는 함수 (HH:mm 형식)
export const getTimeNow = () => {
    return new Date().toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
    });
};

// 다른 시간 관련 유틸리티 함수 추가 (예: 날짜 포맷 변환 등)
export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
};
