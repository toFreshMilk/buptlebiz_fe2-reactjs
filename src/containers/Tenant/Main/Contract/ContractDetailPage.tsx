import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppConfig } from '@/core/hooks/useAppConfig';
import { useTenantComponent, useTenantService } from '@/core/hooks/useTenantModule';
import type { IContractService, ApproveResultDto } from '@/standard/contract/services/contract.service';
import PageContainer from '@/uikit/layout/PageContainer';

const ContractDetailPage = () => {
  const { tenantId } = useAppConfig();
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  // 1. Dynamic Service & Components Loading
  // [수정] Layout 컴포넌트 로딩 제거
  const { service, isLoading: isServiceLoading } = useTenantService<IContractService>('ContractService');
  const { Component: ContractDetailTop } = useTenantComponent('ContractDetailTop');
  const { Component: ContractDetailLeft } = useTenantComponent('ContractDetailLeft');
  const { Component: ContractDetailRight } = useTenantComponent('ContractDetailRight');

  // 2. Data Fetching
  const {
    data: contract,
    isLoading: isDataLoading,
    error: dataError,
  } = useQuery({
    queryKey: ['contract', tenantId, id],
    queryFn: () => service!.getContractsDetail(id),
    enabled: !!service && !!id,
  });

  // 3. Action Logic (Approve)
  const approveMutation = useMutation({
    mutationFn: async () => {
      if (!service || !contract) throw new Error('Not ready');
      // 서비스가 반환하는 결과값(ApproveResultDto)을 받아서 리턴
      return await service.approve(String(contract.id));
    },
    onSuccess: (data: ApproveResultDto) => {
      // 쿼리 갱신
      queryClient.invalidateQueries({ queryKey: ['contract', tenantId, id] });

      // 결과 알림
      console.log('Approved At:', data.approvedAt);
      alert(`${data.message || '승인되었습니다.'} (상태: ${data.newStatus})`);
    },
    onError: (err) => {
      alert(`오류 발생: ${(err as Error).message}`);
    },
  });

  // 4. Loading & Error Handling
  // [수정] Layout 로딩 체크 제거
  const isResourcesLoading = isServiceLoading || !ContractDetailTop || !ContractDetailLeft || !ContractDetailRight;

  if (isResourcesLoading || isDataLoading) {
    return <PageContainer>Loading Contract Details...</PageContainer>;
  }

  if (dataError) {
    return <PageContainer>Error fetching data: {(dataError as Error).message}</PageContainer>;
  }

  if (!contract) {
    return <PageContainer>Contract not found.</PageContainer>;
  }

  // 5. Render
  // [수정] 별도 Layout 컴포넌트 없이 직접 배치
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* 본문 영역 (직접 레이아웃 구성) */}
      <PageContainer className="mt-6">
        {/* 상단 영역 (Top Component) */}
        <ContractDetailTop
          contract={contract}
          onApprove={() => approveMutation.mutate()}
          isApproving={approveMutation.isPending}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <ContractDetailLeft contract={contract} />
          </div>
          <div className="lg:col-span-1">
            <ContractDetailRight contract={contract} />
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

export default ContractDetailPage;
