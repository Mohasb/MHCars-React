import { useState } from "react";
import { Input } from "react-rainbow-components";

export default function ReservationByClient() {
  const [value, setValue] = useState("");
  const handleOnChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <Input
      id="input-component-1"
      placeholder="Id Cliente"
      className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
      borderRadius="semi-square"
      value={value}
      onChange={handleOnChange}
    />
  );
}
