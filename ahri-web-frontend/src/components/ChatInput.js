import React from 'react';
import { useChat } from '../services/ChatService'; // useChat 훅을 chatService에서 import

const ChatInput = () => {
    const {
        chatContainerRef,
        inputRef,
        isAhriActive,
        inputText,
        chatLog,
        clientId,
        handleKeyDown,
        handleInputChange,
        handleFocus,
        handleSendButtonClick,
        AhriChatBox,
        resetAhriChat
    } = useChat(); // 커스텀 훅 호출

    return (
        <div className="chat-container" ref={chatContainerRef}>
            {isAhriActive && (
                <AhriChatBox
                    containerRef={chatContainerRef}
                    chatLog={chatLog}
                />
            )}
            <div className="chat-box" ref={inputRef}>
                <input
                    type="text"
                    placeholder="무엇이든 물어보세요."
                    value={inputText}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    onKeyDown={handleKeyDown} // 엔터키 처리
                />
                {/* 숨겨진 clientId */}
                <input
                    type="hidden"
                    id="clientId"
                    className="clientId"
                    value={clientId}
                    readOnly
                />

                <button className="chat-button" onClick={handleSendButtonClick}>
                    <img src="img/send_c.png" alt="send" />
                </button>
            </div>
        </div>
    );
};

export default ChatInput;
