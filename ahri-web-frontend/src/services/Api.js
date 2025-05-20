import { getTimeNow } from '../common/TimeUtil';

export const fetchAhriResponse = async (clientId,userInput) => {
    console.log("clientId 확인 :",clientId);
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/sendToChat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                clientId: clientId,
                chatText: userInput,
                previousId: '',
                resId : ''

            }),
            credentials: 'include'
        });

        const data = await response.json();
        console.log("채팅 데이터 :", data);

        return {
            role: 'ahri',
            content: data.outputText || '(응답 없음)',
            clientId: data.clientId || '',

        };
    } catch (err) {
        console.error('Ahri 응답 오류:', err);
        return {
            role: 'ahri',
            content: '오류가 발생했습니다.',
            time: getTimeNow()
        };
    }
};

