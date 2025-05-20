// services/ChatService.js
import React, { useState, useEffect, useRef } from 'react';
import { getTimeNow } from '../common/TimeUtil';
import { fetchAhriResponse } from './Api';
import { LoadingUtil } from '../common/LoadingUtil';
import Modal from '../components/Modal'; // 경로에 맞게 수정
import AhriChatBox from '../components/AhriChatBox';

export const useChat = () => {
    const chatContainerRef = useRef(null);
    const inputRef = useRef(null);
    const [isAhriActive, setIsAhriActive] = useState(false);
    const [inputText, setInputText] = useState('');
    const [chatLog, setChatLog] = useState([]);
    const [clientId, setClientId] = useState('');

    const [modalContent, setModalContent] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const resetAhriChat = () => {
        setChatLog([]);
        setInputText('');
        setIsAhriActive(false);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {

            if (isModalOpen) return;

            if (inputRef.current && !inputRef.current.contains(e.target)) {
                const isChildElementClicked = e.target.closest('.ahri-chat-container');
                if (!isChildElementClicked) {
                    setIsAhriActive(false);
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isModalOpen]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage(clientId, inputText, chatLog, setChatLog, setInputText);
        }
    };

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleFocus = () => {
        setIsAhriActive(true);
    };

    const handleSendButtonClick = () => {
        handleSendMessage(clientId, inputText, chatLog, setChatLog, setInputText);
    };

    const handleSendMessage = async (clientId, inputText, chatLog, setChatLog, setInputText) => {
        if (!inputText.trim()) return;

        const userMessage = {
            role: 'user',
            content: inputText,
            time: getTimeNow()
        };

        setChatLog(prev => [...prev, userMessage]);
        setInputText('');
        LoadingUtil.showLoading();
        const aiResponse = await fetchAhriResponse(clientId, inputText);

        if (!clientId && aiResponse.clientId) {
            setClientId(aiResponse.clientId);
            sessionStorage.setItem('clientId', aiResponse.clientId);
        }
        LoadingUtil.hideLoading();
        setChatLog(prev => [...prev, aiResponse]);
    };

    const handleFileContent = (fileName) => {
        let content = '';
        switch (fileName) {
            case '비에네스소프트.txt':
                content = '비에네스소프트는 IT 솔루션을 제공하는 회사입니다.';
                break;
            case '사원수.txt':
                content = '총 사원 수는 124명입니다.';
                break;
            case '매출액.txt':
                content = '2024년 기준 매출액은 약 120억원입니다.';
                break;
            case '회사위치.txt':
                content = '서울시 강남구 테헤란로 123에 위치하고 있습니다.';
                break;
            default:
                content = '알 수 없는 파일입니다.';
        }

        setModalContent(content);
        setIsModalOpen(true);
    };

    const AhriChatBox = ({ containerRef, chatLog }) => {
        const boxRef = useRef(null);
        const chatRef = useRef(null);
        const [leftOffset, setLeftOffset] = useState(0);

        useEffect(() => {
            if (containerRef?.current && boxRef.current) {
                const chatBox = containerRef.current.querySelector('.chat-box');
                const offset = chatBox.getBoundingClientRect().left - containerRef.current.getBoundingClientRect().left;
                const width = chatBox.getBoundingClientRect().width;
                boxRef.current.style.width = `${width}px`;
            }
        }, [containerRef]);

        useEffect(() => {
            if (chatRef.current) {
                chatRef.current.scrollTop = chatRef.current.scrollHeight;
            }
        }, [chatLog]);

        const handleFileClick = () => {
            const fileList = document.getElementById('file-list');
            fileList.style.display = (fileList.style.display === "none" || fileList.style.display === "") ? "block" : "none";
        };

        return (
            <>
                <div
                    className="ahri-chat-container"
                    ref={boxRef}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="ahri-chat-header">
                        <h3>Ahri</h3>
                        <button className="file-button" onClick={handleFileClick}>
                            <i className="fas fa-folder"></i>
                        </button>
                    </div>
                    <div className="file-list" id="file-list">
                        <ul>
                            <li onClick={() => handleFileContent('비에네스소프트.txt')}>비에네스소프트.txt</li>
                            <li onClick={() => handleFileContent('사원수.txt')}>사원수.txt</li>
                            <li onClick={() => handleFileContent('매출액.txt')}>매출액.txt</li>
                            <li onClick={() => handleFileContent('회사위치.txt')}>회사위치.txt</li>
                        </ul>
                    </div>
                    <div className="ahri-chat-log" ref={chatRef}>
                        {chatLog.map((msg, idx) => (
                            <div key={idx} className={`ahri-chat-message ${msg.role}`}>
                                <div className="bubble">
                                    <strong>{msg.role === 'user' ? '나' : 'Ahri'}</strong>
                                    <br />
                                    {msg.content}
                                </div>
                                <div className="time">{msg.time}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {isModalOpen && (
                    <Modal content={modalContent} onClose={() => setIsModalOpen(false)} />
                )}
            </>
        );
    };

    return {
        chatContainerRef,
        inputRef,
        isAhriActive,
        inputText,
        chatLog,
        clientId,
        setClientId,
        setInputText,
        setChatLog,
        handleKeyDown,
        handleInputChange,
        handleFocus,
        handleSendButtonClick,
        AhriChatBox,
        resetAhriChat
    };
};
