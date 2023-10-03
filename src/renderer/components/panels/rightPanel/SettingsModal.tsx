import { SetStateAction, useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { faFolderOpen, faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRequestOptions } from '../../../hooks/useRequestOptions';

import { useHistory } from '../../contexts/history.context';

interface ISettingsModalProps {
  open: boolean;
  toggle: () => void;
  requestOptions: IRequestOptions;
  setRequestOptions: React.Dispatch<SetStateAction<IRequestOptions>>;
}

function SettingsModal({
  open,
  toggle,
  requestOptions,
  setRequestOptions,
}: ISettingsModalProps) {
  const [temperature, setTemperature] = useState(
    requestOptions.temperature.toString(),
  );
  const [maxTokens, setMaxTokens] = useState(
    requestOptions.max_tokens.toString(),
  );
  const [historyPath, setHistoryPath] = useState('');

  const { historyFile, setHistoryFile } = useHistory();

  const handleTemperatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTemperature(e.target.value);
  };

  const handleMaxTokensChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxTokens(e.target.value);
  };

  useEffect(() => {
    if (!historyPath) setHistoryPath(historyFile);
  }, [historyFile]);

  const onSave = () => {
    setRequestOptions({
      temperature: parseInt(temperature),
      max_tokens: parseInt(maxTokens),
    });

    setHistoryFile(historyPath);

    toggle();
  };

  const onBrowseClick = async () => {
    const fileObject = await (window as any).osConnectBridge.openFile();

    if (fileObject.filePaths.length) {
      const filePath = fileObject.filePaths[0];
      setHistoryPath(filePath);
    }
  };

  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader className='text-dark' toggle={toggle}>
        <div className='d-flex gap-2 align-items-center'>
          <FontAwesomeIcon icon={faGear} />
          <div>Settings</div>
        </div>
      </ModalHeader>
      <ModalBody className='text-white bg-dark'>
        <div className='container'>
          <div className='row mb-3'>
            <div className='col-4  p-0 d-flex align-items-center'>
              <div>Temperature</div>
            </div>
            <div className='col-6 p-0 d-flex align-items-center'>
              <input
                className='w-100'
                type='range'
                min='10'
                max='100'
                step='10'
                value={temperature}
                onChange={handleTemperatureChange}
              />
            </div>
            <div className='col p-0 d-flex align-items-center justify-content-center'>
              <div>{parseInt(temperature) / 100}</div>
            </div>
          </div>
          <div className='row  mb-3'>
            <div className='col-4 p-0 d-flex align-items-center'>
              <div>Max Tokens</div>
            </div>
            <div className='col-6  p-0 d-flex align-items-center'>
              <input
                className='w-100 px-2 form-control'
                type='text'
                style={{
                  outline: 'none',
                }}
                value={maxTokens}
                onChange={handleMaxTokensChange}
              />
            </div>
          </div>
          <div className='row  mb-2 mt-4'>
            <div className='col-4  p-0 d-flex align-items-center'>
              <div>History File</div>
            </div>
            <div className='col-6 p-0'>
              <div className='input-group p-0 w-100'>
                <input
                  type='text'
                  className='form-control px-2'
                  value={historyPath}
                />
                <span
                  style={{ cursor: 'pointer' }}
                  className='input-group-text'
                  id='basic-addon2'
                  onClick={onBrowseClick}
                >
                  <FontAwesomeIcon icon={faFolderOpen} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter className='p-2'>
        <button className='btn btn-dark' onClick={onSave}>
          Save
        </button>
        <button className='btn btn-outline-dark' onClick={toggle}>
          Cancel
        </button>
      </ModalFooter>
    </Modal>
  );
}

export default SettingsModal;
