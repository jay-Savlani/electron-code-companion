import LeftPanel from './panels/LeftPanel';
import RightPanel from './panels/RightPanel';

import * as monaco from 'monaco-editor';
import { loader } from '@monaco-editor/react';

loader.config({
  paths: {
    vs: '../../../assets/vs',
  },
  ...monaco,
});

const App = () => {
  return (
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
    // <div className='d-flex'>
    //   <div>
    //     <LeftPanel />
    //   </div>

    //   <div className='w-100'>
    //     <RightPanel />
    //   </div>
    // </div>
  );
};

export default App;
