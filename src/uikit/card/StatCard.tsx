// src/uikit/card/StatCard.tsx

interface StatCardProps {
    title: string;
    value: string | number;
    icon?: React.ReactNode;
    trend?: string;
    trendUp?: boolean;
}

const StatCard = ({ title, value, icon, trend, trendUp }: StatCardProps) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500">{title}</h3>
                {icon && <div className="text-gray-400">{icon}</div>}
            </div>
            <div className="mt-2 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">{value}</p>
                {trend && (
                    <span className={`ml-2 text-sm font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
            {trend}
          </span>
                )}
            </div>
        </div>
    );
};

export default StatCard;
