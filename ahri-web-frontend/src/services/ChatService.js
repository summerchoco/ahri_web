// services/ChatService.js
import { useState, useEffect, useRef } from 'react';
import { getTimeNow } from '../common/TimeUtil';
import { fetchAhriResponse } from './Api';
import { LoadingUtil } from '../common/LoadingUtil';

export const useChat = () => {
    const chatContainerRef = useRef(null);
    const inputRef = useRef(null);

    const [isAhriActive, setIsAhriActive] = useState(false);
    const [inputText, setInputText] = useState('');
    const [chatLog, setChatLog] = useState([]);
    const [clientId, setClientId] = useState('');

    // AhriChatBox에서 필요한 파일 클릭 이벤트 핸들러 제공
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

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isModalOpen]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleFocus = () => {
        setIsAhriActive(true);
    };

    const handleSendButtonClick = () => {
        handleSendMessage();
    };

    const handleSendMessage = async () => {
        if (!inputText.trim()) return;

        const userMessage = {
            role: 'user',
            content: inputText,
            time: getTimeNow()
        };

        setChatLog((prev) => [...prev, userMessage]);
        setInputText('');
        LoadingUtil.showLoading();

        const aiResponse = await fetchAhriResponse(clientId, inputText);

        if (!clientId && aiResponse.clientId) {
            setClientId(aiResponse.clientId);
            sessionStorage.setItem('clientId', aiResponse.clientId);
        }

        LoadingUtil.hideLoading();
        setChatLog((prev) => [...prev, aiResponse]);
    };

    return {
        // 상태 및 참조
        chatContainerRef,
        inputRef,
        isAhriActive,
        inputText,
        chatLog,
        clientId,

        // setter
        setClientId,
        setInputText,
        setChatLog,

        // 이벤트 핸들러
        handleKeyDown,
        handleInputChange,
        handleFocus,
        handleSendButtonClick,
        resetAhriChat,

        // 파일 관련
        // handleFileContent,
        modalContent,
        isModalOpen,
        setIsModalOpen,
    };
};
