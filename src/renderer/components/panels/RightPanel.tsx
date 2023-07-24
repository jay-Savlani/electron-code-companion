import './rightPanel/styles/rightPanel.scss';

const RightPanel = () => {
  return (
    <div className='p-4'>
      <div className='d-flex main-button-group justify-content-between'>
        <div className='d-flex'>
          <button className='me-3'>Generate</button>
          <button>Analyze</button>
        </div>
        <button>Settings</button>
      </div>
    </div>
  );
};

export default RightPanel;
