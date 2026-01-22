import React from 'react';
import { Contract } from '../types';
import Button from '@/uikit/form/Button';

interface Props {
    contract: Contract;
}

const ContractDetailTop = ({ contract }: Props) => {
    return (
        <div className="bg-white p-6 shadow-sm border-b border-gray-200 flex justify-between items-start">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold text-gray-900">{contract.title}</h1>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {contract.status}
          </span>
                </div>
                <p className="text-sm text-gray-500">Contract ID: {contract.id}</p>
            </div>
            <div className="flex gap-2">
                <Button variant="outline">Share</Button>
                <Button>Edit Contract</Button>
            </div>
        </div>
    );
};

export default ContractDetailTop;
