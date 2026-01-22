import React from 'react';

interface SectionProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
}

const Section = ({ title, children, className = '' }: SectionProps) => {
    return (
        <section className={`mb-8 ${className}`}>
            {title && (
                <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
            )}
            <div className="bg-white rounded-lg shadow p-4 border border-gray-100">
                {children}
            </div>
        </section>
    );
};

export default Section;
