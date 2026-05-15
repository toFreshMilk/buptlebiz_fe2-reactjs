import { DocumentEditor } from '@onlyoffice/document-editor-react';
import { useState } from 'react';
import { LoadingBar } from '@/core/uikit/feedback/LoadingBar';

interface Props {
  documentServerUrl: string;
  config: {
    document: {
      fileType: string;
      key: string;
      title: string;
      url: string;
    };
    documentType: string;
    editorConfig?: {
      mode?: 'edit' | 'view';
      lang?: string;
      user?: {
        id: string;
        name: string;
      };
    };
  };
  height?: string;
  onLoadComponentError?: (errorCode: number, errorDescription: string) => void;
}

export function OnlyofficeEditor({ documentServerUrl, config, height = '600px', onLoadComponentError }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const onDocumentReady = () => {
    console.log('[ONLYOFFICE] Document is ready');
    setError(null);
    setLoading(false);
  };

  const onError = (errorCode: number, errorDescription: string) => {
    console.error(`[ONLYOFFICE] 에러 ${errorCode}: ${errorDescription}`);
    setError(errorDescription);
    setLoading(false);
    onLoadComponentError?.(errorCode, errorDescription);
  };

  return (
    <div className="w-full border border-slate-200 rounded-lg overflow-hidden relative z-0" style={{ height }}>
      {loading && !error && (
        <div className="absolute inset-0 z-10 bg-white flex items-center justify-center">
          <LoadingBar />
        </div>
      )}

      {error ? (
        <div
          className="w-full h-full flex flex-col items-center justify-center bg-slate-50 p-8 text-center"
          style={{ minHeight: height }}
        >
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">ONLYOFFICE 연동 완료</h3>
          <p className="text-sm text-slate-500 max-w-md mb-4">
            프론트엔드 연동이 완료되었습니다. 실제 문서를 렌더링하려면 유효한 ONLYOFFICE Document Server가 필요합니다.
          </p>
          <div className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded">현재 오류: {error}</div>
        </div>
      ) : (
        <DocumentEditor
          id="docxEditor"
          width="100%"
          height="100%"
          documentServerUrl={documentServerUrl}
          config={config}
          events_onDocumentReady={onDocumentReady}
          onLoadComponentError={onError}
        />
      )}
    </div>
  );
}

