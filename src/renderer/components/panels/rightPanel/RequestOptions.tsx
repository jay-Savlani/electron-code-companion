import { IRequestOptions } from '../../../hooks/useRequestOptions';

interface IRequestOptionsProps {
  toggleSettings: () => void;
  requestOptions: IRequestOptions;
}

const RequestOptions = ({
  toggleSettings,
  requestOptions,
}: IRequestOptionsProps) => {
  return (
    <div className='w-100 text-dark border border-dark rounded p-2'>
      <div className='fw-medium mb-2'>Options:</div>
      <div className='row mb-2 align-items-center justify-content-start mb-2'>
        <div className='col-auto'>
          <div className='d-flex gap-2'>
            <div className='fw-medium'>Temperature</div>
            <div>:</div>
            <div>{requestOptions.temperature / 100}</div>
          </div>
        </div>
        <div className='col-auto'>
          <div className='d-flex gap-2'>
            <div className='fw-medium'>Max Tokens</div>
            <div>:</div>
            <div>{requestOptions.max_tokens}</div>
          </div>
        </div>
      </div>
      <div>
        <button
          className='btn btn-sm btn-outline-dark'
          onClick={toggleSettings}
        >
          Settings
        </button>
      </div>
    </div>
  );
};

export default RequestOptions;
