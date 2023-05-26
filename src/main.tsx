//import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./components/theme/Theme.js";
import { Application } from "react-rainbow-components";
import { themeRainbow } from "./components/theme/ThemeRainbow";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  //<React.StrictMode>
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Application theme={themeRainbow}>
        <App />
      </Application>
    </ThemeProvider>
  </BrowserRouter>
  //</React.StrictMode>,
);
