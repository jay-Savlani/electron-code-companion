import React from 'react';
import './leftPanel/styles/leftPanel.scss';

import APP_LOGO from '$assets/magic-lamp-2-svgrepo-com.svg';

import { faClock, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LeftPanel = () => {
  return (
    <div className='sidebar p-2 '>
      <div className='d-flex align-items-center fs-6'>
        <img src={APP_LOGO} className='logo_image me-2' />
        <div className='app_title'>Code Companion</div>
      </div>
      <hr className='border-bottom border-white' />

      <div className='history d-flex align-items-center fs-6'>
        <FontAwesomeIcon icon={faClock} className='me-2' />
        <div className='history_text'>History</div>
      </div>

      <div className='position-relative mt-2'>
        <FontAwesomeIcon icon={faSearch} className='search_icon' />
        <input type='text' placeholder='Search' className='search_input' />
      </div>
    </div>
  );
};

export default LeftPanel;
