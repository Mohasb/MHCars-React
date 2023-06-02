import { useState } from "react";
import { Input } from "react-rainbow-components";

export default function SetAdmin() {
  const [value, setValue] = useState("");
  const handleOnChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <Input
      id="input-component-1"
      placeholder="Email del usuario"
      className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
      borderRadius="semi-square"
      value={value}
      onChange={handleOnChange}
    />
  );
}
