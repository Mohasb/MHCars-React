import CarList from "../Components/CarList/CarList";
import ResponsiveAppBar from "../Components/NavBar/NavBar";
import SearchCar from "../Components/SearchCar/SearchCar";
import { useState } from "react";
import ModalWFooterDirectional from "./LoginModal";

export default function Home() {
  const [cars, setCars] = useState({});
  const [boocking, setBooking] = useState({})

  return (
    <>
      <ResponsiveAppBar />
      <main>
        {(cars.length && <CarList cars={cars} boocking={boocking}/>) || (
          <SearchCar setCars={setCars} setBooking={setBooking}/>
        )}
      </main>
    </>
  );
}
