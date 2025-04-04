
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { DonationsProvider } from './hooks/useDonations.tsx';
import { RequestsProvider } from './hooks/useRequests.tsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DonationsProvider>
      <RequestsProvider>
        <App />
      </RequestsProvider>
    </DonationsProvider>
  </React.StrictMode>,
);
