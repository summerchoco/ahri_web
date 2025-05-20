import React, { useEffect, useRef, useState } from 'react';
import Modal from './Modal';

const AhriChatBox = ({ containerRef, chatLog, onFileContent }) => {
    const boxRef = useRef(null);
    const chatRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

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

export default AhriChatBox;
