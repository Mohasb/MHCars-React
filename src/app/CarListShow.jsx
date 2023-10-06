import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CarList from "../components/carList/CarList";
import CryptoJS from "crypto-js";

export default function CarListShow() {
  const secretKeyCripto = "Muhammad";
  const navigate = useNavigate();

  const [savedData, setSavedDAta] = useState();

  useEffect(() => {
    if (sessionStorage.getItem("_dghVjkKj")) {
      const encrypt = sessionStorage.getItem("_dghVjkKj"); 
      const decrypt = CryptoJS.AES.decrypt(
        encrypt.toString(),
        secretKeyCripto
      ).toString(CryptoJS.enc.Utf8);

      //firefox and chrome don´t work the same with cryptojs(chrome remove \ automatic and firefox no)
      if (typeof JSON.parse(decrypt) === "string") {
        //Firefox
        setSavedDAta(JSON.parse(JSON.parse(decrypt)));
      } else {
        //Chrome
        setSavedDAta(JSON.parse(decrypt));
      }

    } else {
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
