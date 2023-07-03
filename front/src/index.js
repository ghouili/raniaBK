import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from "@material-tailwind/react";
import { ProviderContext } from './Hooks/context/GeneralContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <ProviderContext>
          <App />
        </ProviderContext>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);



