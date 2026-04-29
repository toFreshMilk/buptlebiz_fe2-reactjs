import { Loader2 } from 'lucide-react';

export function LoadingBar() {
  return (
    <div className="flex w-full items-center justify-center p-12">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
    </div>
  );
}
