// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@/standard/standard.css'; // [필수] Tailwind 및 기본 스타일 로드

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
