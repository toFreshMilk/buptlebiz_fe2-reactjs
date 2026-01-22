import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import PageContainer from '@/uikit/layout/PageContainer';

// Services
import { StandardContractService } from '@/standard/contract/services/contract.service';
import { DemoContractService } from '@/tenants/demo/contract/services/contract.service';

// Components
import ContractDetailTop from '@/standard/contract/components/ContractDetailTop';
import ContractDetailLeft from '@/standard/contract/components/ContractDetailLeft';
import ContractDetailRight from '@/standard/contract/components/ContractDetailRight';

const ContractDetailPage = () => {
    const { tenantId } = useAppConfig();
    const { id } = useParams<{ id: string }>();

    // Service Selection
    const service = tenantId === 'demo' ? DemoContractService : StandardContractService;

    const { data: contract, isLoading } = useQuery({
        queryKey: ['contract', tenantId, id],
        queryFn: () => service.getContractDetail(id!),
        enabled: !!id,
    });

    if (isLoading) return <PageContainer>Loading...</PageContainer>;
    if (!contract) return <PageContainer>Contract not found</PageContainer>;

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* 1. Top Section */}
            <ContractDetailTop contract={contract} />

            <PageContainer className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* 2. Left Content (2/3 width) */}
                    <div className="lg:col-span-2">
                        <ContractDetailLeft contract={contract} />
                    </div>

                    {/* 3. Right Sidebar (1/3 width) */}
                    <div className="lg:col-span-1">
                        <ContractDetailRight />
                    </div>
                </div>
            </PageContainer>
        </div>
    );
};

export default ContractDetailPage;
