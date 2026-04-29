import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/uikit/form/Button';

type ContractRow = {
  id: number | string;
  title: string;
  partner?: string;
  status: string;
  date?: string;
  amount?: string;
};

export default function ContractList({ contracts }: { contracts?: ContractRow[] }) {
  const navigate = useNavigate();
  const location = useLocation();

  const rows: ContractRow[] = contracts ?? [];

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      Active: 'bg-green-100 text-green-700 ring-green-600/20',
      Draft: 'bg-slate-100 text-slate-700 ring-slate-600/20',
      Review: 'bg-orange-100 text-orange-700 ring-orange-600/20',
      Expired: 'bg-red-100 text-red-700 ring-red-600/20',
    };
    return styles[status] || styles['Draft'];
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="px-6 py-4 font-semibold text-slate-500 w-20">ID</th>
              <th className="px-6 py-4 font-semibold text-slate-500">계약명</th>
              <th className="px-6 py-4 font-semibold text-slate-500">거래처</th>
              <th className="px-6 py-4 font-semibold text-slate-500">상태</th>
              <th className="px-6 py-4 font-semibold text-slate-500">계약금액</th>
              <th className="px-6 py-4 font-semibold text-slate-500 text-right">등록일</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((item) => (
              <tr
                key={item.id}
                className="group hover:bg-slate-50/80 transition-colors cursor-pointer"
                onClick={() => navigate(`${location.pathname}/${item.id}`)}
              >
                <td className="px-6 py-4 text-slate-400 font-mono">#{item.id}</td>
                <td className="px-6 py-4 font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </td>
                <td className="px-6 py-4 text-slate-600">{item.partner ?? '-'}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${getStatusBadge(item.status)}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600 font-medium">{item.amount ?? '-'}</td>
                <td className="px-6 py-4 text-slate-400 text-right">{item.date ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center text-xs text-slate-500">
        <span>Showing {rows.length} results</span>
        <div className="flex gap-2">
          <Button variant="outline" tone="slate" size="sm" uniqueClassName="ui-standard-list-prev">
            Prev
          </Button>
          <Button variant="outline" tone="slate" size="sm" uniqueClassName="ui-standard-list-next">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}