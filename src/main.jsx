//import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./Components/Theme/Theme.tsx";
import { Application } from "react-rainbow-components";
import { themeRainbow } from "./Components/Theme/ThemeRainbow.tsx";
import React from "react";

// Modo demo (npm run build:demo): API simulada y HashRouter para GitHub Pages
const isDemo = import.meta.env.MODE === "demo";
const Router = isDemo ? HashRouter : BrowserRouter;

const render = () =>
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <Router>
        <ThemeProvider theme={theme}>
          <Application theme={themeRainbow}>
            <App />
          </Application>
        </ThemeProvider>
      </Router>
    </React.StrictMode>
  );

if (isDemo) {
  // mockApi intercepta fetch e inicia la sesión demo antes del primer render
  import("./demo/mockApi").then(render);
} else {
  render();
}
