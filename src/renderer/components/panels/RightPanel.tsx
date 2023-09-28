import { useEffect, useState } from 'react';
import './rightPanel/styles/rightPanel.scss';
import classNames from 'classnames';
import moment from 'moment';

import TextBox from './rightPanel/TextBox';
import MonacoEditor from './rightPanel/Editor';
import RenderMarkdown from './rightPanel/RenderMarkdown';
import SettingsModal from './rightPanel/SettingsModal';
import TopButtonGroup from './rightPanel/TopButtonGroup';
import RequestOptions from './rightPanel/RequestOptions';

import { useViews, useRequestOptions, useEditorTheme } from '../../hooks';
import { useHistory, IHistory } from '../contexts/history.context';
import { openAIConnect, awsApiConnect, Action } from '../../../server';

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

const generate_response_sample = {
  statusCode: 200,
  body: 'Sure! Here\'s an example of Java code for performing binary search on an array of 10 elements:\n\n```java\npublic class BinarySearchExample {\n    public static int binarySearch(int arr[], int target) {\n        int left = 0;\n        int right = arr.length - 1;\n\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n\n            // Check if target is present at mid\n            if (arr[mid] == target) {\n                return mid;\n            }\n\n            // If target greater, ignore left half\n            if (arr[mid] < target) {\n                left = mid + 1;\n            }\n\n            // If target is smaller, ignore right half\n            else {\n                right = mid - 1;\n            }\n        }\n\n        // Target is not present in the array\n        return -1;\n    }\n\n    public static void main(String args[]) {\n        int arr[] = {2, 4, 6, 8, 10, 12, 14, 16, 18, 20};\n        int target = 12;\n\n        int result = binarySearch(arr, target);\n\n        if (result == -1) {\n            System.out.println("Element not present in the array");\n        } else {\n            System.out.println("Element found at index " + result);\n        }\n    }\n}\n```\n\nIn this example, the `binarySearch` method performs a binary search on the array by dividing the search space in half at each iteration. It returns the index of the target element if found, or -1 if the element is not present in the array.\n\nThe `main` method uses the `binarySearch` method to search for the target element `12` in the array `{2, 4, 6, 8, 10, 12, 14, 16, 18, 20}`. It prints the result of the search.',
};

const sample_test_response = {
  statusCode: 200,
  body: "Certainly! Here's a unit test for the code you provided:\n\n```python\nimport unittest\n\nclass PrimeNumberTest(unittest.TestCase):\n\n    def test_prime_numbers_between_900_and_1000(self):\n        lower = 900\n        upper = 1000\n        prime_numbers = []\n\n        for num in range(lower, upper + 1):\n            if num > 1:\n                for i in range(2, num):\n                    if (num % i) == 0:\n                        break\n                else:\n                    prime_numbers.append(num)\n\n        expected_output = [907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997]\n        self.assertEqual(prime_numbers, expected_output)\n\nif __name__ == '__main__':\n    unittest.main()\n```\n\nIn this test, we define a `PrimeNumberTest` class that inherits from `unittest.TestCase`. Inside this class, we define the `test_prime_numbers_between_900_and_1000` method which checks if the prime numbers between 900 and 1000 are correctly computed.\n\nWe initialize an empty list `prime_numbers` and iterate through the range from `lower` to `upper + 1`. For each number, we check if it is greater than 1. If it is, we iterate through a range from 2 to that number. If any number divides `num` without leaving a remainder, we break the loop. Otherwise, if the loop completes without breaking, `num` is a prime number and we add it to the `prime_numbers` list.\n\nFinally, we define an `expected_output` list with the correct prime numbers between 900 and 1000. We use `self.assertEqual` to compare the computed prime numbers (`prime_numbers`) with the expected output. If they match, the test passes; otherwise, it fails.",
};

const sample_analyse_response = {
  statusCode: 200,
  body: 'The given code is written in Python and it prints all the prime numbers between the variables `lower` and `upper`.\n\nHere\'s a step-by-step breakdown of the code:\n\n1. The variables `lower` and `upper` are initialized with the values 900 and 1000 respectively.\n   ```\n   lower = 900\n   upper = 1000\n   ```\n\n2. The `print()` function is used to display a message indicating the range of numbers being checked for prime numbers.\n   ```\n   print("Prime numbers between", lower, "and", upper, "are:")\n   ```\n\n3. The code then enters a `for` loop that iterates over each number in the range from `lower` to `upper + 1`.\n   ```\n   for num in range(lower, upper + 1):\n   ```\n\n4. Inside the loop, there is an `if` statement to check if the current number (`num`) is greater than 1. This is because all prime numbers are greater than 1.\n   ```\n   if num > 1:\n   ```\n\n5. If the number is greater than 1, it enters another nested `for` loop to check if the number is divisible by any number from 2 to `num-1`. If it is divisible, the loop breaks, implying that the number is not prime.\n   ```\n   for i in range(2, num):\n       if (num % i) == 0:\n           break\n   ```\n\n6. If the nested loop completes without encountering a break statement, it means that the number is not divisible by any number other than 1 and itself, indicating that it is a prime number. In this case, the number is printed.\n   ```\n   else:\n       print(num)\n   ```\n\nTherefore, when the code is executed, it will print all the prime numbers between 900 and 1000 (inclusive).',
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

const doesHistoryExist = (title: string, historyArray: IHistory[] | null) => {
  return historyArray &&
    historyArray.filter((history) => history.title === title).length
    ? true
    : false;
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
  const { editorTheme, setEditorTheme } = useEditorTheme();

  const {
    historyArray,
    addHistory,
    setHistoryAppendedToggle,
    activeSelectedHistory,
  } = useHistory();

  useEffect(() => {
    if (activeSelectedHistory) {
      setText(activeSelectedHistory.title);

      console.log('active history', activeSelectedHistory);

      if (activeSelectedHistory.output.toLowerCase() !== 'na') {
        setOutputCode(activeSelectedHistory.output);
        activeSelectedHistory.input &&
          setInputCode(activeSelectedHistory.input);
        setCodeAnalysis('');
      }

      if (activeSelectedHistory.analysis.toLowerCase() !== 'na') {
        setCodeAnalysis(activeSelectedHistory.analysis);
        activeSelectedHistory.input &&
          setInputCode(activeSelectedHistory.input);

        setOutputCode('');
      }
    }
  }, [activeSelectedHistory]);

  const appendData = addHistory();

  const onGenerateClick = async () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 15000);

    let response = generate_response_sample;

    // let response: any = undefined;

    // try {
    //   response = await awsApiConnect(
    //     language,
    //     [{ role: 'user', content: text }],
    //     requestOptions.temperature / 100,
    //     requestOptions.max_tokens,
    //     'GenerateCode',
    //   );
    // } catch {
    //   console.log('ERROR in fetching data');
    // }

    if (response && response.statusCode === 200) {
      setCodeAnalysis('');

      const generatedCode = response.body || '';

      const seperatedCode = generatedCode
        .split('```')[1]
        .split('\n')
        .slice(1)
        .join('\n');

      setOutputCode(seperatedCode);

      // set in history
      if (!doesHistoryExist(text, historyArray)) {
        const today = moment().format('YYYY-MM-DD');
        const historyTextToSave =
          text +
          '***' +
          today +
          '***' +
          ' ' +
          '***' +
          seperatedCode +
          '***' +
          'NA' +
          '****';
        const status = await appendData(historyTextToSave);
        if (status) setHistoryAppendedToggle((appended) => !appended);
      }
    }

    console.log('response from aws', response);

    // const response = await openAIConnect([{ role: 'user', content: text }]);

    // if (response) {
    //   const code = response.choices[0].message.content.split('```');
    //   const _code = code[1].split('\n').slice(1).join('\n');
    //   setOutputCode(_code);

    //   // set in history
    //   if (!doesHistoryExist(text, historyArray)) {
    //     const today = moment().format('YYYY-MM-DD');
    //     const historyTextToSave =
    //       text +
    //       '***' +
    //       today +
    //       '***' +
    //       'NA' +
    //       '***' +
    //       _code +
    //       '***' +
    //       'NA' +
    //       '****';
    //     const status = await appendData(historyTextToSave);
    //     if (status) setHistoryAppendedToggle((appended) => !appended);
    //   }
    // }

    setLoading(false);
  };

  // const onAnalyzeClick = async () => {
  //   setCodeAnalysis(_response_sample.choices[0].message.content);
  //   //   setLoading(true);
  //   //   const response = await openAIConnect([
  //   //     { role: 'user', content: text },
  //   //     { role: 'user', content: inputCode },
  //   //   ]);

  //   //   if (response) {
  //   //     setCodeAnalysis(response.choices[0].message.content);
  //   //     console.log('analyze response', response);
  //   //   }

  //   // set in history
  //   const _analysis = 'hello analysis';

  //   if (!doesHistoryExist(text, historyArray)) {
  //     const today = moment().format('YYYY-MM-DD');
  //     const historyTextToSave =
  //       text +
  //       '***' +
  //       today +
  //       '***' +
  //       inputCode +
  //       '***' +
  //       'NA' +
  //       '***' +
  //       _analysis +
  //       '****';
  //     const status = await appendData(historyTextToSave);
  //     if (status) setHistoryAppendedToggle((appended) => !appended);
  //   }

  //   //   setLoading(false);
  // };

  const onAnalyzeClick = async () => {
    let messages = [
      {
        role: 'user',
        content: `${
          (text !== '' && text) || 'Analyse'
        } and set language as ${language}`,
      },
    ];

    if (!!inputCode) {
      messages.push({
        role: 'user',
        content: `Analyse this code ${inputCode}`,
      });
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 15000);

    let response = sample_analyse_response;

    // let response: any = undefined;

    // try {
    //   response = await awsApiConnect(
    //     language,
    //     messages,
    //     requestOptions.temperature / 100,
    //     requestOptions.max_tokens,
    //     'AnalyseCode',
    //   );
    // } catch {
    //   console.log('ERROR in fetching data');
    // }

    if (response && response.statusCode === 200) {
      const analysis = response.body || '';

      setCodeAnalysis(analysis);

      if (!doesHistoryExist(text, historyArray)) {
        const today = moment().format('YYYY-MM-DD');

        const title = (!!text && text) || `analyse - ${language}`;
        const _inputCode = (!!inputCode && inputCode) || ' ';

        const historyTextToSave =
          title +
          '***' +
          today +
          '***' +
          _inputCode +
          '***' +
          'NA' +
          '***' +
          analysis +
          '****';

        const status = await appendData(historyTextToSave);
        if (status) setHistoryAppendedToggle((appended) => !appended);
      }
    }

    setLoading(false);
  };

  const onGenerateTestClick = async () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 15000);

    let response = sample_test_response;

    // try {
    //   response = await awsApiConnect(
    //     language,
    //     [
    //       {
    //         role: 'user',
    //         content: `Generate unit test for this code ${inputCode}`,
    //       },
    //     ],
    //     requestOptions.temperature / 100,
    //     requestOptions.max_tokens,
    //     'GenerateTest',
    //   );
    // } catch {
    //   console.log('ERROR in fetching data');
    // }

    if (response && response.statusCode === 200) {
      const generatedTest = response.body || '';

      console.log('generatedTest', generatedTest);

      console.log('inside');

      const seperatedCode = generatedTest
        .split('```')[1]
        .split('\n')
        .slice(1)
        .join('\n');

      setOutputCode(seperatedCode);

      if (!doesHistoryExist(text, historyArray)) {
        const today = moment().format('YYYY-MM-DD');

        const title = (!!text && text) || `generate test - ${language}`;
        const _inputCode = (!!inputCode && inputCode) || ' ';

        const historyTextToSave =
          title +
          '***' +
          today +
          '***' +
          _inputCode +
          '***' +
          seperatedCode +
          '***' +
          'NA' +
          '****';

        const status = await appendData(historyTextToSave);
        if (status) setHistoryAppendedToggle((appended) => !appended);
      }
    }

    setLoading(false);
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
          text={text}
          inputCode={inputCode}
          loading={loading}
          onGenerateClick={onGenerateClick}
          onAnalyzeClick={onAnalyzeClick}
          onGenerateTestClick={onGenerateTestClick}
          onRefreshClick={onRefreshClick}
          language={language}
          setLanguage={setLanguage}
          views={views}
          setViews={setViews}
          editorTheme={editorTheme}
          setEditorTheme={setEditorTheme}
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
              theme={editorTheme}
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
              theme={editorTheme}
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
