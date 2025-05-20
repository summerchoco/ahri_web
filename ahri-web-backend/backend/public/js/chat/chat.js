//-------------------------------------------------------------------------------------------------------------------------------
//          _                   _       _           _                _                                 _                    _
//         / /\                / /\    / /\        /\ \             /\ \                              / /\                 /\ \
//        / /  \              / / /   / / /       /  \ \            \ \ \                            / /  \                \ \ \
//       / / /\ \            / /_/   / / /       / /\ \ \           /\ \_\                          / / /\ \               /\ \_\
//      / / /\ \ \          / /\ \__/ / /       / / /\ \_\         / /\/_/                         / / /\ \ \             / /\/_/
//     / / /  \ \ \        / /\ \___\/ /       / / /_/ / /        / / /                           / / /  \ \ \           / / /
//    / / /___/ /\ \      / / /\/___/ /       / / /__\/ /        / / /                           / / /___/ /\ \         / / /
//   / / /_____/ /\ \    / / /   / / /       / / /_____/        / / /                           / / /_____/ /\ \       / / /
//  / /_________/\ \ \  / / /   / / /       / / /\ \ \      ___/ / /__      ________________   / /_________/\ \ \  ___/ / /__
// / / /_       __\ \_\/ / /   / / /       / / /  \ \ \    /\__\/_/___\    /______________\ \ / / /_       __\ \_\/\__\/_/___\
// \_\___\     /____/_/\/_/    \/_/        \/_/    \_\/    \/_________/    \_______________\/ \_\___\     /____/_/\/_________/
//-------------------------------------------------------------------------------------------------------------------------------


const resizer = document.getElementById('resizer');
const chatSection = document.getElementById('chatSection');
const rightPanel = document.getElementById('rightPanel');
const rightChatInput = document.getElementById('right-chat-input');
const chatContainer = document.querySelector('.chat-messages'); // 1, 2번 메시지용
const ahriContainer = document.querySelector('.ahri-chat'); // 3번 메시지용
const userContainer = document.querySelector('.participant-list'); // 3번 메시지용

let isResizing = false;

document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
});
// ----------------------------------------------------------------------------
// setupEventListeners ()
// 이벤트리스너들을 정의한다.
// ----------------------------------------------------------------------------
function setupEventListeners() {
    // 창 크기 조절
    resizer?.addEventListener('mousedown', startResize);
    document.querySelectorAll('.tab').forEach(tab => tab.addEventListener('click', handleTabClick));

    // 메시지 전송
    rightChatInput?.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') fnSendMessage();
    });

    document.body.addEventListener('click', (event) => {
        const clickedElement = event.target.closest(".message.sent, .message.received");
        if (!clickedElement) return;

        const responseIdClass = Array.from(clickedElement.classList).find(cls => cls.startsWith("response-"));
        if (!responseIdClass) return alert("아리가 응답하지 않은 채팅입니다.");

        const responseId = responseIdClass.replace("response-", "");
        const targetMessage = document.querySelector(`.ahri-chat .message.response-${responseId}.ahri`);
        if (targetMessage) {
            targetMessage.scrollIntoView({ behavior: "smooth", block: "center" });
            targetMessage.style.border = "2px solid #ff7f50";
            setTimeout(() => targetMessage.style.border = "", 1000);
        } else {
            alert("해당 메시지에 대한 Ahri의 응답을 찾을 수 없습니다.");
        }
    });

}
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal1");
    // const modalContent = document.getElementById("modal1DropZone");

    window.addEventListener("click", function (event) {
        // modalContent 외부 클릭 시
        if (event.target === modal) {
            modal.style.display = "none"; // 모달 닫기

            const fileList = document.getElementById('modal1FileList');
            if (fileList) {
                fileList.innerHTML = '';
            }
        }

    });
});


// ----------------------------------------------------------------------------
// startResize ()
//  창 크기 조절을 시작하는 함수로, 마우스 이벤트를 등록한다.
// ----------------------------------------------------------------------------
function startResize() {
    isResizing = true;
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResize);
}
// ----------------------------------------------------------------------------
// resize (event)
//  사용자의 마우스 움직임에 따라 창 크기를 조절하는 함수이다.
//  event : 마우스 이벤트 객체
// ----------------------------------------------------------------------------
function resize(event) {
    if (!isResizing) return;
    const newWidth = (event.clientX / window.innerWidth) * 100;
    chatSection.style.flex = `${newWidth}`;
    rightPanel.style.flex = `${100 - newWidth}`;
}
// ----------------------------------------------------------------------------
// stopResize ()
//  창 크기 조절이 완료되었을 때, 마우스 이벤트를 제거하는 함수이다.
// ----------------------------------------------------------------------------
function stopResize() {
    isResizing = false;
    document.removeEventListener('mousemove', resize);
    document.removeEventListener('mouseup', stopResize);
}

// ----------------------------------------------------------------------------
// fnClearChatContainers ()
//  채팅 컨테이너를 초기화하여 모든 메시지를 지운다.
// ----------------------------------------------------------------------------
function fnClearChatContainers() {
    if (chatContainer) chatContainer.innerHTML = '';  //
    if (ahriContainer) ahriContainer.innerHTML = '';  //
}
// ----------------------------------------------------------------------------
// fnGetChatLog (roomIdx)
//  특정 채팅방의 대화 기록을 불러오는 비동기 함수이다.
//  roomIdx : 불러올 채팅방의 인덱스 (Number)
// ----------------------------------------------------------------------------
async function fnGetChatLog(roomIdx) {
    try {
        const url = '/api/selectChatLog';
        const reqData = { roomIdx: Number(roomIdx) };

        const data = await fetchUtils.postFetch(url, reqData);

        if (data.success) {
            data.ahriChatLog.forEach(ahriLog => {
                const filePath = ahriLog.filePath === "NO FILEID" ? null : ahriLog.filePath;
                fnAddMessageBox('Ahri', ahriLog.content, ahriLog.resId, filePath, ahriLog.createDt);
            });

            data.userChatLog.forEach(userLog => {
                fnAddMessageBox(userLog.userId, userLog.content, userLog.resId,'', userLog.createDt);
            });

        } else {
            console.error("채팅 로그 가져오기 실패:", data.message);
        }
    } catch (error) {
        console.error("서버 요청 오류:", error);
    }
}

// ----------------------------------------------------------------------------
// fnClearChatContainers ()
//  유저 컨테이너를 초기화하여 모든 메시지를 지운다.
// ----------------------------------------------------------------------------
function fnClearRoomUser() {
    if (userContainer) userContainer.innerHTML = '';  //

}

// ----------------------------------------------------------------------------
// fnGetRoomUser (roomIdx)
//  특정 채팅방의 참여 멤버를 불러오는 비동기 함수이다.
//  roomIdx : 불러올 채팅방의 인덱스 (Number)
// ----------------------------------------------------------------------------
function fnAddRoomUserList(userNm) {
    const messageHTML = `
        <li class="member_box">
            ${userNm}
        </li>
    `;
    const targetContainer = document.querySelector('.participant-list');

    targetContainer.innerHTML += messageHTML;
}
// ----------------------------------------------------------------------------
// fnSendMessage ()
//  사용자가 입력한 메시지를 소켓을 통해 전송하는 함수이다.
// ----------------------------------------------------------------------------
async function fnSendMessage() {
    var text = rightChatInput.value.trim();
    rightChatInput.value = "";
    // 만약 fileUrls가 없으면 빈 배열을 사용하여 보내기
    const fileUrls = [];

    // 파일이 없으면 텍스트만 보내고, 있으면 텍스트와 파일 경로를 함께 보내기
    console.log("text : ",text);



    // const {clientId, outputText} = await fnSocketSendMessage(text, fileUrls);
    const {clientId, outputText,sessionExpired, roomDeleted, roomNotFound} = await fnSocketSendMessage(text, fileUrls);
    console.log("clientId : ",clientId);
    console.log("output : ",outputText);
    document.getElementById('clientId').value = clientId;
    const resId =  null;

    if (sessionExpired || roomDeleted || roomNotFound) {
        clearChatMessages(); // 모든 초기화 조건에 대응
    }

    // 1. 사용자 메시지 표시
    fnAddMessageBox('user', text, null);

    fnAddMessageBox('Ahri', outputText, resId);


}

async function fnSocketSendMessage(text, fileUrls) {
    // const roomIdx = document.getElementById('connectRoom').value;

    // ✅ 현재 마지막 Ahri 응답 ID (resId) 와 이어받을 ID (prevId) 설정
    const resId = window.lastAhriResponseId || null;
    const prevId = window.lastAhriPreviousId || null;
    const selected = document.querySelector('input[name="searchType"]:checked');
    const clientId = document.getElementById('clientId').value;


    try {
        const response = await fetch('/api/sendToChat', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // roomIdx: Number(roomIdx),// 채팅방번호로 바꿀 예정
                chatText: text,
                clientId: clientId,
                resId: resId,
                prevId: prevId
            })
            ,credentials: 'include'
        });


        const json = await response.json(); //json으로 뽑아서줌.
        return json;

    } catch (error) {
        console.error("서버 요청 오류:", error);
        return null
    }

}


// ----------------------------------------------------------------------------
// fnAddMessageBox (userId, text, runId, filePath)
//  채팅 화면에 메시지를 추가하는 함수이다.
//  userId  : 메시지를 보낸 사용자 ID (String)
//  text    : 메시지 내용 (String)
//  runId   : 실행 ID (String)
//  filePath: 첨부 파일 경로 (String, Optional)
// ----------------------------------------------------------------------------
function fnAddMessageBox(userId, text, resId, filePath = '', time) {
    const loginId = document.getElementById('userId').value;
    const currentTime = time
        ? new Date(time).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
        : new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });

    const isAhri = userId === 'Ahri';
    const isMine = userId === loginId;

    const wrapperClass = isMine ? 'sent-wrapper' : isAhri ? 'ahri-wrapper' : 'received-wrapper';
    const messageClass = isMine ? 'sent' : isAhri ? 'ahri' : 'received';
    const alignTime = isMine ? 'left' : 'right';

    let file = '';
    if (filePath && filePath !== 'NO FILEID') {
        const fileUrl = `/files/${filePath}`;
        file = `<br><br><img src="${fileUrl}" alt="첨부 이미지" class="chat-img" onclick="fnOpenModal('${fileUrl}')" />`;

        const modalImg = document.getElementById("modal-img");
        if (modalImg) modalImg.src = fileUrl;
    }

    const messageHTML = `
  <div class="message-wrapper ${wrapperClass}">
    <div class="message response-${resId} ${messageClass}">
      <strong>${isMine ? '나' : userId}</strong>
      ${text}
      ${file}
    </div>
    <div class="time-below">${currentTime}</div>
  </div>
`;

    chatContainer.innerHTML += messageHTML;
    scrollToBottom(chatContainer);
}

function clearChatMessages() {
    // const container = document.getElementById('chatSection');
    // if (container) container.innerHTML = '';

    chatContainer.innerHTML = '';
}


// ----------------------------------------------------------------------------
// scrollToBottom (container)
//  채팅 컨테이너의 스크롤을 최신 메시지로 이동시키는 함수이다.
//  container : 스크롤할 채팅 컨테이너 (HTMLElement)
// ----------------------------------------------------------------------------
function scrollToBottom(container) {
    setTimeout(() => {
        container.scrollTop = container.scrollHeight;
    }, 10);
}



// ----------------------------------------------------------------------------
// getUserList ()
//  모든 사용자의 목록을 가져와 저장하는 함수이다.
// ----------------------------------------------------------------------------
async function getUserList(){
    const data = await fetchUtils.getFetch('/api/selectAllUser');
    storeUserList(data);
}
