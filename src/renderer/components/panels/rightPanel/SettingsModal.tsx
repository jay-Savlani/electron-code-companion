import { SetStateAction, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRequestOptions } from '../../../hooks/useRequestOptions';

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

  const handleTemperatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTemperature(e.target.value);
  };

  const handleMaxTokensChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxTokens(e.target.value);
  };

  const onSave = () => {
    setRequestOptions({
      temperature: parseInt(temperature),
      max_tokens: parseInt(maxTokens),
    });
    toggle();
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
          <div className='row  mb-2'>
            <div className='col-4  p-0'>
              <div>Temperature</div>
            </div>
            <div className='col-4  p-0'>
              <input
                type='range'
                min='10'
                max='100'
                step='10'
                value={temperature}
                onChange={handleTemperatureChange}
              />
            </div>
            <div className='col p-0'>
              <div>{parseInt(temperature) / 100}</div>
            </div>
          </div>
          <div className='row  mb-2'>
            <div className='col-4  p-0'>
              <div>Max Tokens</div>
            </div>
            <div className='col-4  p-0'>
              <input
                className='w-100 px-2'
                type='text'
                style={{
                  outline: 'none',
                }}
                value={maxTokens}
                onChange={handleMaxTokensChange}
              />
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
