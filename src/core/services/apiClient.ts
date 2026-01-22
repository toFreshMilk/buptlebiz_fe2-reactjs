import axios from 'axios';

// 환경변수 또는 하드코딩된 API Base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// 인터셉터 (옵션: 에러 핸들링, 토큰 주입 등)
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // 공통 에러 처리 로직
        console.error('[API Error]', error);
        return Promise.reject(error);
    }
);
