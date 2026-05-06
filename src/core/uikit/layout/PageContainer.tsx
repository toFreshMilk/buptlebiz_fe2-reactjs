import React from 'react';

interface PageContainerProps {
    children: React.ReactNode;
    className?: string;
}

const PageContainer = ({ children, className = '' }: PageContainerProps) => {
    return (
        <div className={`p-6 max-w-7xl mx-auto w-full ${className}`}>
            {children}
        </div>
    );
};

export default PageContainer;
