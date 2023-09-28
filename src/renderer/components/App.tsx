import LeftPanel from './panels/LeftPanel';
import RightPanel from './panels/RightPanel';

import * as monaco from 'monaco-editor';
import { loader } from '@monaco-editor/react';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import HistoryProvider from './contexts/history.context';

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker();
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker();
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker();
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

loader.config({ monaco });

const App = () => {
  return (
    <HistoryProvider>
      <div className='container-fluid m-0 p-0  h-100'>
        <div className='row h-100 m-0'>
          <div className='col p-0'>
            <div className='d-flex h-100 '>
              <div>
                <LeftPanel />
              </div>

              <div className='flex-grow-1'>
                <RightPanel />
              </div>
            </div>
          </div>
        </div>
      </div>
    </HistoryProvider>
  );
};

export default App;
