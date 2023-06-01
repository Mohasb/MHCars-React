import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmationCard from "../components/confirmationCard/ConfirmationCard";

export default function ConfirmationBoocking() {
  const navigate = useNavigate();

  const [data, setData] = useState(
    JSON.parse(sessionStorage.getItem("booking"))
  );

  useEffect(() => {
    if (!data) {
      navigate("/");
    }
  }, []);
  return (
    <main>
      <ConfirmationCard car={data.car} booking={data.booking} />
    </main>
  );
}
