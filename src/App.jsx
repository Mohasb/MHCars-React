import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
//Components
import Home from "./app/home/Home";
import ConfirmationBoocking from "./app/BookingConfirmation";
import CarListShow from "./app/CarListShow";
import AuthService from "./services/login/auth.service";
import Register from "./app/register/Register";
import NotFound from "./app/notFound/NotFound";
import ContextUser from "./services/contextUser/ContextUser";
import ResponsiveAppBar from "./components/navBar/NavBar";
import ControlledOpenSpeedDial from "./components/CircularMenu";
import UserPage from "./app/userPage/UserPage";
import Footer from "./Components/footer/Footer";
import Cookie from "./components/cookies/cookie";
import Admin from "./app/admin/Admin";
import { Outlet } from "react-router-dom";
import CryptoJS from "crypto-js";

function App() {
  const [user, setUser] = useState();

  const secretKeyCripto = "Muhammad";

  useEffect(() => {
    if (localStorage.getItem("_ughVjkKj")) {
      const encrypt = localStorage.getItem("_ughVjkKj");
      const decrypt = CryptoJS.AES.decrypt(
        encrypt.toString(),
        secretKeyCripto
      ).toString(CryptoJS.enc.Utf8);
      const id = JSON.parse(decrypt).id;
      AuthService.getCurrentUser(id).then((response) => {
        setUser(response);
      });
    }
  }, []);

  const PageLayout = () => (
    <>
      <Outlet />
      <Footer />
      <ControlledOpenSpeedDial />
      <Cookie />
    </>
  );

  return (
    <>
      <ContextUser.Provider value={{ user, setUser }}>
        <ResponsiveAppBar />
        <Routes>
          <Route element={<PageLayout />}>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/reserva/coche" element={<CarListShow />} />
            <Route path="/booking" element={<ConfirmationBoocking />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/user/:name" element={<UserPage />} />
          </Route>
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </ContextUser.Provider>
    </>
  );
}

export default App;
