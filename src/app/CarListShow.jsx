import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CarList from "../components/carList/CarList";
import CryptoJS from "crypto-js";

export default function CarListShow() {
  const secretKeyCripto = "Muhammad";

  const encrypt = sessionStorage.getItem("_dghVjkKj");
  const decrypt = CryptoJS.AES.decrypt(
    encrypt.toString(),
    secretKeyCripto
  ).toString(CryptoJS.enc.Utf8);

  const savedData = JSON.parse(JSON.parse(decrypt));
  const navigate = useNavigate();

  useEffect(() => {
    const encrypt = sessionStorage.getItem("_dghVjkKj");
    const decrypt = CryptoJS.AES.decrypt(
      encrypt.toString(),
      secretKeyCripto
    ).toString(CryptoJS.enc.Utf8);

    const savedData = JSON.parse(JSON.parse(decrypt));
    if (!savedData) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <main className="car-list">
        {savedData && (
          <CarList cars={savedData.cars} booking={savedData.booking} />
        )}
      </main>
    </>
  );
}
