// src/tenants/apr/contract/services/contract.service.ts
import { apiPost } from '@/core/services/apiClient';
// [핵심] Standard Class를 상속받기 위해 import
import { ContractService as StandardContractService } from '@/standard/contract/services/contract.service';

/**
 * APR 전용 계약 서비스
 * Standard 기능을 상속받고, 'approve' 메서드만 오버라이드합니다.
 */
export class AprContractService extends StandardContractService {
    // 생성자는 Standard와 동일하므로 생략 가능 (자동으로 super 호출)

    // [Override] 승인 로직 변경 (유효성 검사 추가)
    async approve(contractId: string): Promise<void> {
        // 1. APR 전용 유효성 검사 API 호출
        // (this.tenantId는 부모 클래스에서 상속받아 사용 가능 - protected/public 일 경우)
        // 만약 private라면 접근 불가하므로 Standard에서 protected로 바꿔줘야 함.
        // 여기서는 apiPost 인자로 넘기는 방식 유지
        await apiPost('/contracts/validate', this['tenantId'], { contractId });

        // 2. 부모(Standard)의 승인 로직 재사용 (또는 완전히 새로 구현)
        // super.approve(contractId); // 부모 로직 호출 시

        // 2-1. 혹은 아예 다르게 구현 (요청 사항대로)
        await apiPost('/contracts/approve', this['tenantId'], {
            contractId,
            status: 'APPROVED',
        });
    }
}

// Default Export는 클래스 자체
export default AprContractService;
