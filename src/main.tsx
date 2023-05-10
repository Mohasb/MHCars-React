//import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./Components/Theme/Theme.js";
import ResponsiveAppBar from "./Components/NavBar/NavBar";
import ControlledOpenSpeedDial from "./Components/CircularMenu";
import Footer from "./Components/footer/Footer"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  //<React.StrictMode>
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <ResponsiveAppBar />
      <App />
      <ControlledOpenSpeedDial />
      <Footer/>
    </ThemeProvider>
  </BrowserRouter>
  //</React.StrictMode>,
);
