// src/uikit/chart/BarChart.tsx
interface BarChartProps {
    data: { label: string; value: number }[];
    height?: number;
    color?: string;
}

const BarChart = ({ data, height = 300, color = '#3b82f6' }: BarChartProps) => {
    const maxValue = Math.max(...data.map(d => d.value), 1);

    return (
        <div className="w-full flex items-end justify-between gap-2" style={{ height }}>
            {data.map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center group">
                    <div
                        className="w-full rounded-t transition-all duration-300 relative group-hover:opacity-80"
                        style={{
                            height: `${(item.value / maxValue) * 100}%`,
                            backgroundColor: color
                        }}
                    >
                        {/* Tooltip */}
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            {item.value}
                        </div>
                    </div>
                    <span className="text-xs text-gray-500 mt-2 truncate w-full text-center">
            {item.label}
          </span>
                </div>
            ))}
        </div>
    );
};

export default BarChart;
