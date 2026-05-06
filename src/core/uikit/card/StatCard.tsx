export function StatCard({
  title,
  value,
  highlight,
  alert,
}: {
  title: string;
  value: string | number;
  highlight?: boolean;
  alert?: boolean;
}) {
  return (
    <div
      className={`p-6 rounded-xl border shadow-sm ${
        alert
          ? 'bg-red-50 border-red-100 text-red-700'
          : highlight
            ? 'bg-blue-50 border-blue-100 text-blue-700'
            : 'bg-white border-gray-100'
      }`}
    >
      <div className="text-sm font-medium opacity-70 mb-1">{title}</div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  );
}
