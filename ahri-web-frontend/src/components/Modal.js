// components/Modal.js
import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ content, onClose }) => {
    return ReactDOM.createPortal(
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h4>파일 내용</h4>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>
                <div className="modal-body">
                    <p>{content}</p>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default Modal;
