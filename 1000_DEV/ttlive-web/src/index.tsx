import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './i18n';
import { createInstance, MatomoProvider } from '@jonkoops/matomo-tracker-react';
import { Config } from './modules/common/utils/Config';


const instance = createInstance({
  urlBase: "https://tt-live.net:8443",
  siteId: 1,
  trackerUrl: 'https://tt-live.net:8443/abc56.php', // optional, default value: `${urlBase}matomo.php`
  srcUrl: 'https://tt-live.net:8443/abc46.js', // optional, default value: `${urlBase}matomo.js`  
  disabled: !Config.MATOMO_ENABLED,
  configurations: { // optional, default value: {}
    requireConsent: true,
    setRequestMethod: 'POST'
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MatomoProvider value={instance}>
      <App />
    </MatomoProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
