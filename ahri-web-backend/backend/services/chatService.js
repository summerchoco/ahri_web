const axios = require("axios");
const ahriConfig = require('../config');
const roomService = require("./roomService");
const ahriContextMap = new Map
global.ahriContextMap = ahriContextMap;
const {chatCustomError} = require("../common/errorUtils");

const openSession = async (roomId) => {
    console.log('chatService.openSession');

    const response = await axios.post(`${ahriConfig.ahriConfig.apiUrl}/web/openSession`,{
        roomId :roomId,
    },{
        headers:{'Content-Type' : 'application/json'}
    });

    return response
}


const checkSession = async(req,clientId)=> {
// 1. 세션 자체 초기화되었음
    let sessionExpired = false;

// 2. 방이 만료되어 삭제됨
    let roomDeleted = false;

// 3. 기존 방 자체가 없었음 (처음 접속)
    let roomNotFound = false;

// 세션 체크
    if (!req.session.chatMap) {
        sessionExpired = true;
        req.session.chatMap = {};
    }

// 방 체크
    if (!req.session.chatMap[clientId]) {
        roomNotFound = true;

        if (sessionExpired) {
            // 세션이 날아가면서 방도 날아간 것
            // 이미 처리함
        } else {
            // 기존 세션인데 방이 없으면 → 오래돼서 지워졌을 수도 있음
            roomDeleted = true;
        }

        clientId = roomService.generateUUID();
        req.session.chatMap[clientId] = {
            createdAt: new Date().toISOString()
        };
        await saveRoomId(clientId);
    }
    return {sessionExpired,roomDeleted,roomNotFound,clientId}
}

const sendToChat = async (clientId, chatText) => {
    console.log('chatService.sendToChat');

    try {
        const response = await axios.post(`${ahriConfig.ahriConfig.apiUrl}/web/chat`, {
            roomId: clientId,
            text: chatText,
            previousId: '',
            searchType: ''
        }, {
            headers: { 'Content-Type': 'application/json' }
        });

        return response;
    } catch (error) {
        if (error.response) {
            // 서버가 응답했지만 상태 코드가 2xx 범위를 벗어남
            const status = error.response.status;
            const message = error.response.data?.message || '서버 응답 오류가 발생했습니다.';
            throw chatCustomError(status, message);
        }
    }
};

const sendToRoom = async (clientId, chatData) => {
    console.log('chatService.sendToRoom');


    const outputText = await mkAllText(chatData.response);

    console.log("outputText 확인 : ",outputText);

    return {clientId:clientId ,outputText: outputText};
}

const mkAllText= async(chatData) => {

    const texts = (chatData.output_texts || []).join('\n');
    const sources = (chatData.annotations || []);
    const sourceText = sources.length > 0
        ? `\n\n출처: ${sources.join(', ')}`
        : '';

    return texts + sourceText;
}

const delAhriSession = async (clientId)=> {
    console.log('chatService.delAhriSession');
    const now = new Date();

    console.log(` ${clientId} context TTL 초과 → 정리함`);
    // 실제 제거
    const response = await axios.post(`${ahriConfig.ahriConfig.apiUrl}/web/delSession`, {
        roomId: clientId
    }, {
        headers: {'Content-Type': 'application/json'}
    });

    // map에서도 제거하기
    delete ahriContextMap[clientId];

}
const saveRoomId= async (clientId)=>{
    ahriContextMap[clientId] = {
        createdAt: new Date().toISOString(),
    };

    console.log("ahriContextMap : ",ahriContextMap);
}

module.exports = {openSession, sendToChat, sendToRoom, checkSession, delAhriSession}