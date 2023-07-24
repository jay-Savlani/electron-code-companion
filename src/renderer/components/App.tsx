import image from '$assets/electrovite.png';
import { useState } from 'react';
import LeftPanel from './panels/LeftPanel';
import RightPanel from './panels/RightPanel';

const App = () => {
  return (
    <div className='d-flex'>
      <div>
        <LeftPanel />
      </div>

      <div className='w-100'>
        <RightPanel />
      </div>
    </div>
  );
};

export default App;
