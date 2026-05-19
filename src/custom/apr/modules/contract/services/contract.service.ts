import { apiPost } from '@/core/service/apiClient';
import { StandardContractService } from '@/standard/modules/contract/services/contract.service';
import type { StandardContractDto, ContractListResponseDto } from '@/standard/modules/contract/services/contract.service';

//
// 🔴 단점 (Cons)
//
// 1. 번들(Build) 사이즈 증가와 Tree Shaking의 불리함  ==> 수십KB 수준.
// * 함수형: 최신 번들러(Vite, Webpack)는 파일에서 사용하지 않는 함수(Dead Code)를
// 빌드 결과물에서 자동으로 잘라냅니다 (Tree Shaking).
// * 클래스형: 클래스는 하나의 거대한 덩어리로 인식되어, 내부에 메서드가 10개인데
// 컴포넌트에서 단 1개만 사용하더라도 10개 메서드가 모두 빌드 결과물에 포함되는
// 경우가 많습니다. (최신 번들러들이 클래스 메서드 단위의 Tree Shaking을
// 시도하고는 있지만 여전히 함수형보다 불리합니다.)
//
// 2. this 바인딩의 함정
// * 클래스의 메서드를 React 컴포넌트의 이벤트 핸들러(예:
// onClick={service.approve})로 직접 넘길 때 this 컨텍스트가 끊어지는 문제가
// 발생할 수 있습니다.
// * 이를 막기 위해 화살표 함수로 감싸거나(onClick={() => service.approve()}),
// 클래스 내부에서 애초에 화살표 함수로 선언해야 하는 번거로움이 있습니다.
//
// 3. React 생태계와의 철학적 차이
// * 최신 React(Hooks 이후)는 클래스형 컴포넌트를 버리고 철저하게 함수형
// 프로그래밍(FP) 패러다임을 따르고 있습니다.
// * 상태 관리, 부수 효과(useEffect) 등이 모두 함수형 기반이므로, 서비스 레이어만
// 철저한 OOP(클래스) 기반으로 가면 코드 스타일의 일관성이 다소 떨어져 보일 수
// 있습니다.

export class AprContractService extends StandardContractService {
  // 1. Core의 apiGet을 래핑(Wrapping)하여 전/후처리 추가
  protected async customApiGet<T>(path: string, tenantId: string): Promise<T> {
    console.log(`[APR Custom] API 요청 전 특별한 암호화 토큰 생성 로직... (경로: ${path})`);
    const customHeaders = { 'X-APR-Token': 'super-secret' };

    // fetch 직접 구현 (Mock)
    const res = await fetch(`/mock-data/${path.replace(/^\/+/, '')}/${tenantId}.json`, { headers: customHeaders });
    return res.json();
  }

  // 2. 상속받은 메서드 오버라이딩 (Core 대신 Custom 메서드 사용)
  override async getContracts(tenantId: string, q?: string, tab?: string): Promise<ContractListResponseDto> {
    console.log('[APR] 계약 목록은 우리만의 특별한 통신 API를 탑니다.');
    // 부모가 쓰던 apiGet 대신 내가 만든 customApiGet 호출
    const allData = await this.customApiGet<StandardContractDto[]>('/contracts', tenantId);
    
    const query = (q || '').trim().toLowerCase();
    const currentTab = (tab || 'all').toLowerCase();

    const filtered = allData.filter((c) => {
      const matchQ = !query || c.title.toLowerCase().includes(query);
      const matchTab =
        currentTab === 'all' ||
        (currentTab === 'draft' && c.status.toLowerCase() === 'draft') ||
        (currentTab === 'review' && c.status.toLowerCase() === 'review') ||
        (currentTab === 'active' && c.status.toLowerCase() === 'active');
      return matchQ && matchTab;
    });

    return {
      totalCount: filtered.length,
      items: filtered,
    };
  }

  override async approve(tenant: string, contractId: string): Promise<void> {
    console.log('[APR] 결재 처리 시 유효성 검증을 먼저 수행합니다.');
    await apiPost('contracts/validate', tenant, { contractId });

    // 이어서 부모의 approve를 호출하거나 직접 구현 가능
    // 여기서는 명시적으로 apiPost 직접 구현 (기존 로직 유지)
    await apiPost('contracts/approve', tenant, {
      contractId,
      status: 'APPROVED',
    });
  }
}

export default new AprContractService();