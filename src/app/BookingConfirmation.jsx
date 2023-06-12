import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmationCard from "../components/confirmationCard/ConfirmationCard";
import CryptoJS from "crypto-js";

export default function ConfirmationBoocking() {
  const navigate = useNavigate();
  const secretKeyCripto = "Muhammad";

  const [data, setData] = useState(null);

  useEffect(() => {
    if (sessionStorage.getItem("_bghVjkKj")) {
      const encrypt = sessionStorage.getItem("_bghVjkKj");
      const decrypt = CryptoJS.AES.decrypt(
        encrypt.toString(),
        secretKeyCripto
      ).toString(CryptoJS.enc.Utf8);

      //firefox and chrome don´t work the same with cryptojs(chrome remove \ automatic and firefox no)
      if (typeof JSON.parse(decrypt) === "string") {
        //Firefox
        setData(JSON.parse(JSON.parse(decrypt)));
      } else {
        //Chrome
        setData(JSON.parse(decrypt));
      }
    } else {
      navigate("/");
    }
  }, []);

  return (
    <main>
      {console.log(data)}
      {data && <ConfirmationCard car={data.car} booking={data.booking} />}
    </main>
  );
}
