export async function apiGet<T>(path: string, tenantId: string): Promise<T> {
  const url = `/mock-data/${path.replace(/^\/+/, '')}/${tenantId}.json`;
  const res = await fetch(url);
  
  if (!res.ok) {
    throw new Error(`[API 오류] GET ${url} 요청이 상태 코드 ${res.status}로 실패했습니다.`);
  }
  
  return res.json();
}

// POST 요청 처리 (Mock 환경 시뮬레이션)
export async function apiPost<T>(path: string, tenantId: string, body?: any): Promise<T> {
  console.log(`[API MOCK POST] 경로: ${path}, 테넌트: ${tenantId}`, body);

  // 실제 백엔드가 없으므로, 마치 서버가 처리 후 응답을 준 것처럼 0.5초 대기
  await new Promise((resolve) => setTimeout(resolve, 500));

  const url = `/mock-data/${path.replace(/^\/+/, '')}/${tenantId}.json`;
  const res = await fetch(url);
  
  if (!res.ok) {
    throw new Error(`[API 오류] ${url}에서 POST Mock 데이터를 찾을 수 없습니다.`);
  }

  return res.json();
}