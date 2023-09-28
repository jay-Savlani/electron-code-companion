import { Editor } from '@monaco-editor/react';
import { SetStateAction, useState } from 'react';
import copy from 'copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBroom,
  faCheck,
  faDownload,
  faFile,
} from '@fortawesome/free-solid-svg-icons';
import { EditorTheme } from '../../../hooks/useEditorTheme';
import { writeFile } from 'original-fs';

interface IMonacoEditorProps {
  language: string;
  theme: EditorTheme;
  code?: string;
  setCode?: React.Dispatch<SetStateAction<string>>;
  type: 'input' | 'output';
}

function MonacoEditor({
  language,
  theme,
  code,
  setCode,
  type,
}: IMonacoEditorProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    copy(code || '');
    setCopied(true);
  };

  const onClearCode = () => {
    setCode && setCode('');
  };

  function onChangeCode(value: string = ''): void {
    if (copied) {
      setCopied(false);
    }
    if (setCode) {
      setCode(value);
    }
  }

  const onOpenFile = async () => {
    const fileObject = await (window as any).osConnectBridge.openFile();
    const filePath = fileObject.filePaths[0];

    console.log('filepath', filePath);

    const data: { [k: string]: string } | string = await (
      window as any
    ).osConnectBridge.readFile(filePath);
    if (typeof data === 'string' && setCode) {
      setCode(data);
    }
  };

  const saveFile = async () => {
    if (code !== '') {
      const fileObject = await (window as any).osConnectBridge.openFile();
      const filePath = fileObject.filePaths[0];

      const status: boolean | string = await (
        window as any
      ).osConnectBridge.writeFile(filePath, code);

      // console.log('status', status);
    }
  };

  const isInputEditor = type === 'input' ? true : false;

  return (
    <div className='d-flex flex-column justify-content-between h-100 pt-2'>
      <div className='w-100 d-flex mb-1 align-items-center bg bg-secondary-subtle'>
        <button className='btn btn-secondary btn-sm' onClick={onCopy}>
          {!copied ? (
            'Copy'
          ) : (
            <div className='d-flex align-items-center'>
              <span className='me-2'>Copied</span>
              <FontAwesomeIcon icon={faCheck} />
            </div>
          )}
        </button>

        <button className='btn btn-secondary btn-sm ms-2' onClick={onClearCode}>
          <div className='d-flex align-items-center'>
            <FontAwesomeIcon icon={faBroom} />
            <span className='ms-2'>Clear</span>
          </div>
        </button>

        <div className='text-dark fs-5 fw-medium mx-auto'>
          {(type === 'input' ? 'Input Editor' : 'Output Editor').toUpperCase()}
        </div>
        {type === 'input' && (
          <button className='btn btn-secondary btn-sm' onClick={onOpenFile}>
            <div className='d-flex align-items-baseline'>
              <FontAwesomeIcon icon={faFile} />
              <span className='ms-2'>Open</span>
            </div>
          </button>
        )}
        {type === 'output' && (
          <button className='btn btn-secondary btn-sm' onClick={saveFile}>
            <div className='d-flex align-items-baseline'>
              <FontAwesomeIcon icon={faDownload} />
              <span className='ms-2'>Save</span>
            </div>
          </button>
        )}
      </div>
      <Editor
        className='m-0 p-0 border border-dark'
        language={language}
        theme={theme}
        onChange={isInputEditor ? onChangeCode : undefined}
        value={code}
        defaultValue=''
        options={{
          // @ts-ignore
          fontSize: '18px',
          minimap: {
            enabled: false,
          },
        }}
      />
    </div>
  );
}

export default MonacoEditor;
