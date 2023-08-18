import { useState } from 'react';
import './rightPanel/styles/rightPanel.scss';
import classNames from 'classnames';

import TextBox from './rightPanel/TextBox';
import MonacoEditor from './rightPanel/Editor';
import RenderMarkdown from './rightPanel/RenderMarkdown';
import SettingsModal from './rightPanel/SettingsModal';
import TopButtonGroup from './rightPanel/TopButtonGroup';
import RequestOptions from './rightPanel/RequestOptions';

import { useViews, useRequestOptions } from '../../hooks';
import { openAIConnect } from '../../../server';

const _response_sample = {
  id: 'chatcmpl-7np6WFVMrsItq76AaI7o3TnguiZPa',
  object: 'chat.completion',
  created: 1692108872,
  model: 'gpt-3.5-turbo-0613',
  choices: [
    {
      index: 0,
      message: {
        role: 'assistant',
        content:
          "This code defines two functions `cToF` and `fToC` which convert temperatures between Celsius and Fahrenheit. \n\nThe `cToF` function takes a temperature value in Celsius as input, converts it to Fahrenheit using the formula `(cTemp * 9 / 5) + 32`, and then logs the result to the console.\n\nSimilarly, the `fToC` function takes a temperature value in Fahrenheit as input, converts it to Celsius using the formula `(fTemp - 32) * 5 / 9`, and logs the result to the console.\n\nFinally, the code calls both functions, passing in the values 60 and 45 respectively, and logs the converted temperatures to the console.\n\nHere's the code commented for better understanding:\n\n```javascript\n// Function to convert Celsius to Fahrenheit\nfunction cToF(celsius) {\n  var cTemp = celsius; // Store the Celsius value in a variable\n  var cToFahr = cTemp * 9 / 5 + 32; // Convert Celsius to Fahrenheit\n  var message = cTemp + '\\xB0C is ' + cToFahr + ' \\xB0F.'; // Create a message string\n  console.log(message); // Log the message to the console\n}\n\n// Function to convert Fahrenheit to Celsius\nfunction fToC(fahrenheit) {\n  var fTemp = fahrenheit; // Store the Fahrenheit value in a variable\n  var fToCel = (fTemp - 32) * 5 / 9; // Convert Fahrenheit to Celsius\n  var message = fTemp + '\\xB0F is ' + fToCel + '\\xB0C.'; // Create a message string\n  console.log(message); // Log the message to the console\n}\n\n// Call the cToF function with a Celsius value of 60\ncToF(60);\n\n// Call the fToC function with a Fahrenheit value of 45\nfToC(45);\n```\n\nThis code can be used to convert temperatures between Celsius and Fahrenheit by calling the respective functions with the desired temperature values.",
      },
      finish_reason: 'stop',
    },
  ],
  usage: {
    prompt_tokens: 194,
    completion_tokens: 425,
    total_tokens: 619,
  },
};

const getEditorWrapperClassName = (
  otherEditorDisplay: boolean,
  codeAnalysis: string,
) => {
  return classNames('h-100', {
    'col-6': otherEditorDisplay || codeAnalysis,
    col: !otherEditorDisplay,
  });
};

const RightPanel = () => {
  const [language, setLanguage] = useState('javascript');
  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const [codeAnalysis, setCodeAnalysis] = useState('');

  const { views, setViews } = useViews();
  const { requestOptions, setRequestOptions } = useRequestOptions();

  const onGenerateClick = async () => {
    setLoading(true);

    const response = await openAIConnect([{ role: 'user', content: text }]);

    if (response) {
      const code = response.choices[0].message.content.split('```');
      const _code = code[1].split('\n').slice(1).join('\n');
      setOutputCode(_code);
    }

    setLoading(false);
  };

  const onAnalyzeClick = async () => {
    setCodeAnalysis(_response_sample.choices[0].message.content);
    //   setLoading(true);
    //   const response = await openAIConnect([
    //     { role: 'user', content: text },
    //     { role: 'user', content: inputCode },
    //   ]);

    //   if (response) {
    //     setCodeAnalysis(response.choices[0].message.content);
    //     console.log('analyze response', response);
    //   }
    //   setLoading(false);
  };

  const onRefreshClick = () => {
    setCodeAnalysis('');
  };

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
  };

  return (
    <div className='p-4 d-flex flex-column gap-4 h-100'>
      <SettingsModal
        open={settingsOpen}
        toggle={toggleSettings}
        requestOptions={requestOptions}
        setRequestOptions={setRequestOptions}
      />
      <div className='d-flex justify-content-between '>
        <TopButtonGroup
          loading={loading}
          onGenerateClick={onGenerateClick}
          onAnalyzeClick={onAnalyzeClick}
          onRefreshClick={onRefreshClick}
          language={language}
          setLanguage={setLanguage}
          views={views}
          setViews={setViews}
          toggleSettings={toggleSettings}
        />
      </div>
      <div className='w-100 fs-5'>
        <TextBox text={text} setText={setText} />
      </div>
      <div>
        {views.options && (
          <RequestOptions
            toggleSettings={toggleSettings}
            requestOptions={requestOptions}
          />
        )}
      </div>
      <div className='row w-100 m-0 align-items-start h-75'>
        {views['input editor'] && (
          <div
            className={getEditorWrapperClassName(
              views['output editor'],
              codeAnalysis,
            )}
          >
            <MonacoEditor
              language={language}
              code={inputCode}
              setCode={setInputCode}
              type='input'
            />
          </div>
        )}
        {views['output editor'] && !codeAnalysis ? (
          <div
            className={getEditorWrapperClassName(
              views['input editor'],
              codeAnalysis,
            )}
          >
            <MonacoEditor
              language={language}
              type='output'
              code={outputCode}
              setCode={setOutputCode}
            />
          </div>
        ) : codeAnalysis ? (
          <div
            className='col p-0 ms-2 border border-dark rounded bg bg-light h-100 w-50'
            style={{ overflow: 'auto', fontSize: '20px' }}
          >
            <div className='p-3'>
              <RenderMarkdown analysis={codeAnalysis} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default RightPanel;
