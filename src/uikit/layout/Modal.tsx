import { type ReactNode, useEffect } from 'react';
import { Button } from '@/uikit/form/Button';

type ModalVariant = 'single' | 'double';

interface ModalProps {
  open: boolean;
  title?: string;
  message: ReactNode;
  variant?: ModalVariant;
  confirmText: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  onClose?: () => void;
  closeOnBackdrop?: boolean;
  uniqueClassName?: string;
}

export default function Modal({
  open,
  title,
  message,
  variant = 'single',
  confirmText,
  cancelText = '취소',
  onConfirm,
  onCancel,
  onClose,
  closeOnBackdrop = true,
  uniqueClassName,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleBackdropClick = () => {
    if (!closeOnBackdrop) return;
    onClose?.();
  };

  return (
    <div className={`fixed inset-0 z-[100] ${uniqueClassName ?? ''}`} role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/45" onClick={handleBackdropClick} />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-xl">
          <div className="px-5 py-4 border-b border-slate-100">
            <div className="text-base font-black text-slate-900">{title ?? '알림'}</div>
          </div>

          <div className="px-5 py-6">
            <div className="text-sm text-slate-700 whitespace-pre-line">{message}</div>
          </div>

          <div className="px-5 pb-5 flex items-center gap-2 justify-end">
            {variant === 'double' && (
              <Button variant="outline" tone="slate" uniqueClassName="ui-modal-cancel" onPress={onCancel ?? onClose}>
                {cancelText}
              </Button>
            )}
            <Button tone="blue" uniqueClassName="ui-modal-confirm" onPress={onConfirm}>
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}