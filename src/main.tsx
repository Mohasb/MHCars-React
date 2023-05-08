//import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./Components/Theme/Theme.js";
import ResponsiveAppBar from "./Components/NavBar/NavBar";
import ControlledOpenSpeedDial from "./Components/CircularMenu";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  //<React.StrictMode>
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <ResponsiveAppBar />
      <App />
      <ControlledOpenSpeedDial />
    </ThemeProvider>
  </BrowserRouter>
  //</React.StrictMode>,
);
