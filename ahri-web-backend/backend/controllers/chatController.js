const chatService = require('../services/chatService');


const sendToChat = async (req, res, next) => {
    try {
        console.log('chatController.sendToChat');

        let { chatText, clientId } = req.body;

        console.log("clientId: ", clientId);
        console.log('세션 ID:', req.sessionID);


        // 채팅방 cliendId 생성 및 세션 확인
        const sessionCheck = await chatService.checkSession(req, clientId);
        clientId = sessionCheck.clientId;

        // roomId(clientId)를 만들어서 ahriSession 및 express-session과 연결
        await chatService.openSession(clientId);

        // 채팅 데이터를 구현 (text, roomId)
        const resChat = await chatService.sendToChat(clientId, chatText);

        // Ahri에 채팅을 보냄
        const lastChat = await chatService.sendToRoom(clientId, resChat.data);

        return res.status(200).json({
            clientId: lastChat.clientId,
            outputText: lastChat.outputText || null
        });
    } catch (error) {
        next(error); // 에러를 전역 에러 핸들러로 전달
    }
};

const expireSession = async (req, res, next) => {
    if(req.body.clientId !== undefined && req.body.clientId !== null && req.body.clientId !== ''){
        await chatService.delAhriSession(req.body.clientId);
        delete req.session.chatMap[req.body.clientId];
    }
    res.status(200).json({ message: '세션 만료 완료' });
};
module.exports = { sendToChat ,expireSession };