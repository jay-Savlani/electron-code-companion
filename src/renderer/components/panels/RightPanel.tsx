import './rightPanel/styles/rightPanel.scss';

import TextBox from './rightPanel/TextBox';
import MonacoEditor from './rightPanel/Editor';

import { useState } from 'react';

const RightPanel = () => {
  const [language, setLanguage] = useState('javascript');
  const [inputCode, setInputCode] = useState('');

  return (
    <div className='p-4 d-flex flex-column gap-4 h-100'>
      <div className='d-flex  justify-content-between '>
        <div className='d-flex gap-3'>
          <button className='btn btn-primary'>Generate</button>
          <button className='btn btn-secondary'>Analyze</button>
        </div>
        <button className='btn btn-secondary'>Settings</button>
      </div>
      <div className='w-100 '>
        <TextBox />
      </div>
      <div className='d-flex gap-2 h-75 '>
        <div className='w-50'>
          <MonacoEditor
            language={language}
            setLanguage={setLanguage}
            inputCode={inputCode}
            setInputCode={setInputCode}
            type='input'
          />
        </div>
        <div className='w-50'>
          <MonacoEditor language={language} type='output' />
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
