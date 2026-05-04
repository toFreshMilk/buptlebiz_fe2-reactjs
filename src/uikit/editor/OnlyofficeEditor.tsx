import { DocumentEditor } from '@onlyoffice/document-editor-react';

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
  const onDocumentReady = () => {
    console.log('[ONLYOFFICE] Document is ready');
  };

  const onError = (errorCode: number, errorDescription: string) => {
    console.error(`[ONLYOFFICE] Error ${errorCode}: ${errorDescription}`);
    onLoadComponentError?.(errorCode, errorDescription);
  };

  return (
    <div 
      className="w-full border border-slate-200 rounded-lg overflow-hidden relative z-0"
      style={{ height }}
    >
      <DocumentEditor
        id="docxEditor"
        width="100%"
        height="100%"
        documentServerUrl={documentServerUrl}
        config={config}
        events_onDocumentReady={onDocumentReady}
        onLoadComponentError={onError}
      />
    </div>
  );
}
