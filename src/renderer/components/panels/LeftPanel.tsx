import React, { useEffect, useState } from 'react';
import './leftPanel/styles/leftPanel.scss';

import { useHistory, IHistory } from '../contexts/history.context';

import APP_LOGO from '$assets/magic-lamp-2-svgrepo-com.svg';

import { faClock, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LeftPanel = () => {
  const {
    historyArray,
    setActiveSelectedHistory,
    clearHistory,
    setHistoryCleared,
    loading,
  } = useHistory();
  const [filteredArray, setFilteredArray] = useState<IHistory[]>([]);

  useEffect(() => {
    if (historyArray) {
      setFilteredArray(historyArray);
    }
  }, [historyArray]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const _filteredArray =
      (historyArray &&
        historyArray.filter(
          (history) =>
            history.title.toLowerCase().includes(value) ||
            history.date.includes(value),
        )) ||
      [];

    setFilteredArray(_filteredArray);
  };

  const onClearHandler = async () => {
    await clearHistory();
    setHistoryCleared((historyCleared) => !historyCleared);
  };

  const setActiveHistory = (history: IHistory) => {
    setActiveSelectedHistory(history);
  };

  return (
    <div className='sidebar p-2 bg bg-dark bg-opacity-75'>
      <div className='d-flex align-items-center fs-4'>
        <img src={APP_LOGO} className='logo_image me-3' />
        <div className='app_title'>Code Companion</div>
      </div>
      <hr className='border-bottom border-white' />

      <div className='history d-flex align-items-center fs-5'>
        <FontAwesomeIcon icon={faClock} className='me-2' />
        <div className='history_text'>History</div>
        <div className='ms-auto clear_button p-2' onClick={onClearHandler}>
          clear
        </div>
      </div>

      <div className='position-relative mt-2 fs-5'>
        <FontAwesomeIcon icon={faSearch} className='search_icon' />
        <input
          type='text'
          placeholder='Search'
          className='search_input'
          onChange={onChangeSearch}
        />
      </div>

      {loading ? (
        <div className='w-100 spinner-container d-flex'>
          <div
            style={{ width: '4rem', height: '4rem' }}
            className='spinner-border text-light mx-auto my-auto'
          />
        </div>
      ) : (
        <ul className='mt-3 fs-5'>
          {historyArray?.length &&
            filteredArray.map((history) => (
              <li
                className='my-2 history_list_item ps-2'
                onClick={() => setActiveHistory(history)}
              >{`> ${history.date} -- ${history.title}`}</li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default LeftPanel;
