import APP_LOGO from '$assets/magic-lamp-2-svgrepo-com.svg';
import './styles/app.title.css';

const AppTitle = () => {
  return (
    <>
      <div className='d-flex align-items-center '>
        <img src={APP_LOGO} className='title-logo me-4' />
        <div className='title-text'>Code Companion</div>
      </div>
      <div className='border-bottom border-white w-100 mt-2'></div>
    </>
  );
};

export default AppTitle;
