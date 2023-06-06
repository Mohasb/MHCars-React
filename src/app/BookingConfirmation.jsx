import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmationCard from "../components/confirmationCard/ConfirmationCard";

export default function ConfirmationBoocking() {
  const navigate = useNavigate();

  const [data, setData] = useState(null);

  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem("booking"))) {
      setData(JSON.parse(sessionStorage.getItem("booking")));
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
