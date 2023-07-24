import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '$components/App';

// styles
import 'bootstrap/dist/css/bootstrap.min.css';
import '$styles/app.scss';

// Say something
console.log('[EVite] : renderer executed');

// Render application
createRoot(document.getElementById('app') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);