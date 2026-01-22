import React from 'react';
import { Contract } from '../types';
import Section from '@/uikit/layout/Section';

const ContractDetailLeft = ({ contract }: { contract: Contract }) => {
    return (
        <div className="space-y-6">
            <Section title="General Information">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                    <div>
                        <dt className="text-sm font-medium text-gray-500">Counterparty</dt>
                        <dd className="mt-1 text-sm text-gray-900">{contract.counterparty}</dd>
                    </div>
                    <div>
                        <dt className="text-sm font-medium text-gray-500">Amount</dt>
                        <dd className="mt-1 text-sm text-gray-900">{contract.amount.toLocaleString()}</dd>
                    </div>
                    <div>
                        <dt className="text-sm font-medium text-gray-500">Start Date</dt>
                        <dd className="mt-1 text-sm text-gray-900">{contract.startDate}</dd>
                    </div>
                    <div>
                        <dt className="text-sm font-medium text-gray-500">End Date</dt>
                        <dd className="mt-1 text-sm text-gray-900">{contract.endDate}</dd>
                    </div>
                </dl>
            </Section>
        </div>
    );
};

export default ContractDetailLeft;
