
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { DonationsProvider } from './hooks/useDonations';
import { RequestsProvider } from './hooks/useRequests';
import { Toaster } from "./components/ui/toaster";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DonationsProvider>
      <RequestsProvider>
        <App />
        <Toaster />
      </RequestsProvider>
    </DonationsProvider>
  </React.StrictMode>
);
