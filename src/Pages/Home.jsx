import React from "react";
import { useState } from "react";
//Components
import CarList from "../Components/CarList/CarList";
import { SearchCar } from "../Components/SearchCar/SearchCar";
import ControlledOpenSpeedDial from "../Components/CircularMenu";
//import CustomizedSteppers from "../Components/Stepper";

export default function Home() {
  const [cars, setCars] = useState({});
  const [boocking, setBooking] = useState({});

  return (
    <>
      <main>
        {/* <CustomizedSteppers/> */}
        {/* {(cars.length && <CarList cars={cars} boocking={boocking} />) || (
          <SearchCar setCars={setCars} setBooking={setBooking} />
        )} */}
        <SearchCar setCars={setCars} setBooking={setBooking} />
      </main>
    </>
  );
}
