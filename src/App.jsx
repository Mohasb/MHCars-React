import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/oficinas" element={<Home />} />
        <Route path="/coches" element={<Home />} />
        <Route path="/servicios" element={<Home />} />
        <Route path="/acceso" element={<Home />} />
        <Route path="/admin" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
