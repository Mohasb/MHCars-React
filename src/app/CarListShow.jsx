//import { useState, useEffect } from "react";
import CarList from "../components/carList/CarList";
import { useNavigate } from "react-router-dom";

export default function CarListShow() {
  const navigate = useNavigate();

  let cars = {};
  let booking = {};
  if (sessionStorage.getItem("data")) {
    const data = JSON.parse(sessionStorage.getItem("data"));
    cars = data.cars;
    booking = data.consulta;
    return (
      <>
        <main>
          <CarList cars={cars} booking={booking} />
        </main>
      </>
    );
  } else {
    console.log("NO");
    navigate("/");
  }
}
