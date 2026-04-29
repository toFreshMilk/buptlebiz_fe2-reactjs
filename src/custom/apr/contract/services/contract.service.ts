import { apiGet, apiPost } from '@/core/service/apiClient';
import type { StandardContractDto } from '@/standard/contract/services/contract.service';

async function getContracts(tenant: string): Promise<StandardContractDto[]> {
  return await apiGet<StandardContractDto[]>('contracts', tenant);
}

async function getContractsDetail(tenant: string): Promise<StandardContractDto[]> {
  return await apiGet<StandardContractDto[]>('contracts/detail', tenant);
}

async function getContractsDetail2(tenant: string): Promise<StandardContractDto[]> {
  return await apiGet<StandardContractDto[]>('contracts/detail2', tenant);
}

async function approve(tenant: string, contractId: string): Promise<void> {
  await apiPost('contracts/validate', tenant, { contractId });
  await apiPost('contracts/approve', tenant, {
    contractId,
    status: 'APPROVED',
  });
}

const contractService = {
  getContracts,
  getContractsDetail,
  getContractsDetail2,
  approve,
};

export default contractService;