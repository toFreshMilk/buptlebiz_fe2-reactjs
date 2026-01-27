// src/core/service/apiClient.ts
export async function apiGet<T>(path: string, tenantId: string): Promise<T> {
  // http://apr.localhost:3000/mock-data/... 로 요청하게 됨 -> Same Origin -> 성공
  const res = await fetch(`/mock-data/${path.replace(/^\/+/, '')}/${tenantId}.json`);
  return res.json();
}

// [NEW] POST 요청 처리 (Mock 환경 시뮬레이션)
export async function apiPost<T>(path: string, tenantId: string, body: any): Promise<T> {
  console.log(`[API MOCK POST] Path: ${path}, Tenant: ${tenantId}`, body);

  // 실제 백엔드가 없으므로, 마치 서버가 처리 후 성공 응답을 준 것처럼 0.5초 대기
  await new Promise((resolve) => setTimeout(resolve, 500));

  // 성공 응답 리턴 (제네릭 T가 있다고 가정, 기본값으로 성공 메시지 리턴)
  return {
    success: true,
    message: 'Processed successfully (Mock)',
  } as unknown as T;
}

// ssr이냐 clent냐 를 구별해야되는 이유를 모르겠다.
