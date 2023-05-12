import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./app/home/Home";
import ConfirmationBoocking from "./app/BookingConfirmation";
import CarListShow from "./app/CarListShow";
import AuthService from "./Services/login/auth.service";
import Register from "./Components/Register";
import NotFound from "./app/notFound/NotFound";
import ContextUser from "./Services/contextUser/ContextUser";
import { useState, useEffect, useContext } from "react";
import ResponsiveAppBar from "./Components/NavBar/NavBar"
import ControlledOpenSpeedDial from "./Components/CircularMenu"
import Context from "./Services/contextUser/ContextUser";

function App() {
   const [user, setUser] = useState();
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setUser(user);
    }
  }, []); 

  //const {user, setUser} = useContext(Context)

  useEffect(() => {
    console.log(user);
  })

  return (
    <>
      <ContextUser.Provider value={{user, setUser}}>
        <ResponsiveAppBar />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/reserva/coche" element={<CarListShow />} />
          <Route path="/booking" element={<ConfirmationBoocking />} />
          <Route path="/registro" element={<Register />} />
        </Routes>
        <ControlledOpenSpeedDial />
      </ContextUser.Provider>
    </>
  );
}

export default App;
