import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { reportWebVitals } from './reportWebVitals';  // 임포트 추가

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// 웹 성능을 측정하려면 이 부분을 활성화
reportWebVitals();
