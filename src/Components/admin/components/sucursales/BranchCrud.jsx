import { useState } from "react";
import Button from "react-rainbow-components/components/Button/index";

function GetBranches() {
  const [value, setValue] = useState("hola");
  return (
    <Button
      label="Button Brand"
      onClick={() => alert("clicked!")}
      variant="brand"
      className="rainbow-m-around_medium"
    />
  );
}

export { GetBranches };
