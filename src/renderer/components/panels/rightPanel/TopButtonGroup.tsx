import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGear,
  faGears,
  faCode,
  faRefresh,
} from '@fortawesome/free-solid-svg-icons';

import ViewDropDown from './ViewDropdown';
import SelectLanguage from './SelectLanguage';
import { SetStateAction } from 'react';
import { IViews } from '../../../hooks/useViews';

interface ITopButtonGroupProps {
  loading: boolean;
  onGenerateClick: () => void;
  onAnalyzeClick: () => void;
  onRefreshClick: () => void;
  language: string;
  setLanguage: React.Dispatch<SetStateAction<string>>;
  views: IViews;
  setViews: React.Dispatch<SetStateAction<IViews>>;
  toggleSettings: () => void;
}

const TopButtonGroup = ({
  loading,
  onGenerateClick,
  onAnalyzeClick,
  onRefreshClick,
  language,
  setLanguage,
  views,
  setViews,
  toggleSettings,
}: ITopButtonGroupProps) => {
  return (
    <>
      <div className='d-flex gap-3'>
        <button
          className='btn btn-primary d-flex gap-2'
          disabled={loading}
          onClick={onGenerateClick}
        >
          <div className='d-flex gap-2 align-items-center'>
            <FontAwesomeIcon icon={faCode} />
            <div>Generate</div>
          </div>
        </button>

        <div className='btn-group'>
          <button
            className='btn btn-secondary'
            disabled={loading}
            onClick={onAnalyzeClick}
          >
            <div className='d-flex gap-2 align-items-center'>
              <FontAwesomeIcon icon={faGears} />
              <div>Analyze</div>
            </div>
          </button>
          <button
            className='btn btn-dark'
            disabled={loading}
            onClick={onRefreshClick}
          >
            <div className='d-flex'>
              <FontAwesomeIcon icon={faRefresh} />{' '}
            </div>
          </button>
        </div>
        {loading && <div className='spinner-grow text-dark '></div>}
      </div>
      <div className='mx-auto'>
        <SelectLanguage language={language} setlanguage={setLanguage} />
      </div>
      <div className='d-flex gap-2'>
        <ViewDropDown views={views} setViews={setViews} />
        <button
          className='btn btn-secondary'
          disabled={loading}
          onClick={toggleSettings}
        >
          <div className='d-flex gap-2 align-items-center'>
            <FontAwesomeIcon icon={faGear} />
            <div>Settings</div>
          </div>
        </button>
      </div>
    </>
  );
};

export default TopButtonGroup;