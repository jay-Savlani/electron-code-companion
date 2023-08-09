import { Editor } from '@monaco-editor/react';
import { SetStateAction } from 'react';
import SelectLanguage from './SelectLanguage';

interface IMonacoEditorProps {
  language: string;
  theme?: string;
  setLanguage?: React.Dispatch<SetStateAction<string>>;
  inputCode?: string;
  setInputCode?: React.Dispatch<SetStateAction<string>>;
  type: 'input' | 'output';
}

function MonacoEditor({
  language,
  setLanguage,
  inputCode,
  setInputCode,
  type,
  theme = 'vs-dark',
}: IMonacoEditorProps) {
  function onChangeCode(value: string = ''): void {
    if (setInputCode) {
      setInputCode(value);
    }
  }

  const isInputEditor = type === 'input' ? true : false;

  console.log('language', language);

  return (
    <div className='d-flex flex-column justify-content-between h-100'>
      {isInputEditor ? (
        <SelectLanguage language={language} setlanguage={setLanguage} />
      ) : null}
      <Editor
        height={isInputEditor ? '95%' : '100%'}
        className='m-0 p-0 '
        language={language}
        theme={theme}
        onChange={isInputEditor ? onChangeCode : undefined}
        value={inputCode}
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

//  e: monaco.editor.IModelContentChangedEvent,
