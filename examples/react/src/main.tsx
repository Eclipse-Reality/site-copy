//package imports
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';

import { App } from './App';

import { SitecopyProvider } from './siteCopyProvider';

//const SiteCopyClient = new SiteCopyProvider('/data.json');


ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
  <SitecopyProvider url='/data.json' siteID='sap-sapphire-2023'>
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<App/>}/>
      </Routes>
    </BrowserRouter>
  </SitecopyProvider>
)