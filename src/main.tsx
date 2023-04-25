import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from '@emotion/react';
import { theme } from "./Components/Theme.tsx";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
