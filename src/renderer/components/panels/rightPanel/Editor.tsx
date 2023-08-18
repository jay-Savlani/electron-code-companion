import { Editor } from '@monaco-editor/react';
import { SetStateAction, useState } from 'react';
import copy from 'copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

interface IMonacoEditorProps {
  language: string;
  theme?: string;
  code?: string;
  setCode?: React.Dispatch<SetStateAction<string>>;
  type: 'input' | 'output';
}

function MonacoEditor({
  language,
  code,
  setCode,
  type,
  theme = 'vs-dark',
}: IMonacoEditorProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    copy(code || '');
    setCopied(true);
  };

  function onChangeCode(value: string = ''): void {
    if (copied) {
      setCopied(false);
    }
    if (setCode) {
      setCode(value);
    }
  }

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
        <div className='text-dark fs-5 fw-medium mx-auto'>
          {(type === 'input' ? 'Input Editor' : 'Output Editor').toUpperCase()}
        </div>
      </div>
      <Editor
        className='m-0 p-0'
        language={language}
        theme={theme}
        onChange={isInputEditor ? onChangeCode : undefined}
        value={code}
        defaultValue={isInputEditor ? '// Enter code' : '// Generated code'}
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
