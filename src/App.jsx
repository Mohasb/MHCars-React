import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
//Components
import Home from "./app/home/Home";
import ConfirmationBoocking from "./app/BookingConfirmation";
import CarListShow from "./app/CarListShow";
import AuthService from "./Services/login/auth.service";
import Register from "./app/Register";
import NotFound from "./app/notFound/NotFound";
import ContextUser from "./Services/contextUser/ContextUser";
import ResponsiveAppBar from "./Components/NavBar/NavBar";
import ControlledOpenSpeedDial from "./Components/CircularMenu";
import UserPage from "./app/UserPage";
import Footer from "./Components/footer/Footer";

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setUser(user);
    }
  }, []);

  return (
    <>
      <ContextUser.Provider value={{ user, setUser }}>
        <ResponsiveAppBar />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/reserva/coche" element={<CarListShow />} />
          <Route path="/booking" element={<ConfirmationBoocking />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/:name" element={<UserPage />} />
        </Routes>
        <ControlledOpenSpeedDial />
        <Footer />
      </ContextUser.Provider>
    </>
  );
}

export default App;
