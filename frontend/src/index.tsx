import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import App from './App';
import { Provider } from 'react-redux'
import  { store }  from './other/store'
import { createTheme, PaletteColor, SimplePaletteColorOptions, ThemeProvider } from '@mui/material';
import customTheme from './other/customTheme';
import "./other/styles/global.css";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
      <ThemeProvider theme={customTheme}>
        <App />
      </ThemeProvider>
    </Provider>
);
reportWebVitals();
