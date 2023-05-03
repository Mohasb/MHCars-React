import React from "react";
import { useState } from "react";
//Components
import CarList from "../Components/CarList/CarList";
import ResponsiveAppBar from "../Components/NavBar/NavBar";
import { SearchCar } from "../Components/SearchCar/SearchCar";
//import CustomizedSteppers from "../Components/Stepper";

export default function Home() {
  const [cars, setCars] = useState({});
  const [boocking, setBooking] = useState({});

  return (
    <>
      <ResponsiveAppBar />
      <main>
        {/* <CustomizedSteppers/> */}
        {(cars.length && <CarList cars={cars} boocking={boocking} />) || (
          <SearchCar setCars={setCars} setBooking={setBooking} />
        )}
      </main>
    </>
  );
}
