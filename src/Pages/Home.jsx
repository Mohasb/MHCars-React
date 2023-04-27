import CarList from "../Components/CarList/CarList";
import ResponsiveAppBar from "../Components/NavBar/NavBar";
import SearchCar from "../Components/SearchCar/SearchCar";
import { useState } from "react";

export default function Home() {
  const [cars, setCars] = useState({});
  const [boocking, setBoocking] = useState();
  return (
    <>
      <ResponsiveAppBar />
      <main>
        {console.log(boocking)}
        {(cars.length && <CarList cars={cars} boocking={boocking} />) || (
          <SearchCar setCars={setCars} setBoocking={setBoocking} />
        )}
      </main>
    </>
  );
}
