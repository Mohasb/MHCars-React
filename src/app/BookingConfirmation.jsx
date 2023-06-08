import { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import ConfirmationCard from "../components/confirmationCard/ConfirmationCard";
import CryptoJS from "crypto-js";

export default function ConfirmationBoocking() {
  const navigate = useNavigate();
  const secretKeyCripto = "Muhammad";

  const [data, setData] = useState(null);

  useEffect(() => {
    const encrypt = sessionStorage.getItem("_bghVjkKj");
    const decrypt = CryptoJS.AES.decrypt(
      encrypt.toString(),
      secretKeyCripto
    ).toString(CryptoJS.enc.Utf8);

    
    if (JSON.parse(JSON.parse(decrypt))) {
      setData(JSON.parse(JSON.parse(decrypt)));
    } else {
      navigate("/");
    }
  }, []);

  return (
    <main>
      {data && <ConfirmationCard car={data.car} booking={data.booking} />}
    </main>
  );
}
