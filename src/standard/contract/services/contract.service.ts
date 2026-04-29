import { apiGet, apiPost } from '@/core/service/apiClient';

export type ContractStatus = 'Active' | 'Draft' | 'Review' | 'APPROVED' | 'REJECTED' | (string & {});

export interface StandardContractDto {
  id: number | string;
  title: string;
  status: ContractStatus;
  partner?: string;
  date?: string;
  amount?: string;
  category?: string;
  templateName?: string;
  requester?: string;
  reviewer?: string;
  documentCode?: string;
  smartEmail?: string;
  signDate?: string;
  reviewFrom?: string;
  reviewTo?: string;
  weeklyActivity?: Array<{
    week: string;
    comments: number;
    files: number;
  }>;
  timeline?: Array<{
    title: string;
    time: string;
  }>;
}

async function getContracts(tenant: string): Promise<StandardContractDto[]> {
  return await apiGet<StandardContractDto[]>('/contracts', tenant);
}

async function getContractsDetail(tenant: string): Promise<StandardContractDto[]> {
  return await apiGet<StandardContractDto[]>('/contracts/detail', tenant);
}

async function getContractsDetail2(tenant: string): Promise<StandardContractDto[]> {
  return await apiGet<StandardContractDto[]>('/contracts/detail2', tenant);
}

async function approve(tenant: string, contractId: string): Promise<void> {
  await apiPost('/contracts/approve', tenant, {
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

export type StandardContractService = typeof contractService;

export default contractService;