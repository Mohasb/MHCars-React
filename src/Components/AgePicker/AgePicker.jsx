import React, { useState } from "react";
import { RadioButtonGroup, Application } from "react-rainbow-components";
const options = [
  { value: "1", label: "19~24" },
  { value: "2", label: "25~74" },
  { value: "3", label: "75+" },
];

export const BorderRadiusRadioButtonGroup = () => {
  const [value, setValue3] = useState("2");

  const handleOnChange3 = (event) => {
    setValue3(event.target.value);
  };

  return (
    <>
    {/* <label htmlFor="" className="text-center">Edad Del Conductor</label> */}
      <RadioButtonGroup
        label="Edad del default"
        options={options}
        value={value}
        onChange={handleOnChange3}
        borderRadius="semi-rounded"
        //variant="brand"
      />
    </>
  );
};

<BorderRadiusRadioButtonGroup />;
