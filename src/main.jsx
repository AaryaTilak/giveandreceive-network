
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { DonationsProvider } from './hooks/useDonations.js';
import { RequestsProvider } from './hooks/useRequests.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DonationsProvider>
      <RequestsProvider>
        <App />
      </RequestsProvider>
    </DonationsProvider>
  </React.StrictMode>,
);
