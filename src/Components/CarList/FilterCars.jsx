import React, { useState } from "react";
import { RadioButtonGroup } from "react-rainbow-components";
import { Application } from "react-rainbow-components";
import { themeRainbow } from "../Theme/ThemeRainbow";
import Box from "@mui/material/Box";


export default function FilterButtons(props) {

  const [value, setValue] = useState("todos")

  const handleOnChange = (event) => {
    setValue(event.target.value)
    if (props.name === "oilType") {
      props.setOilFilter(event.target.value);
    } else if (props.name === "gearShiftType") {
      props.setGearFilter(event.target.value);
    } else if (props.name === "carType") {
      props.setCarTypeFilter(event.target.value);
    }
  }

  return (
    <>
    <Application theme={themeRainbow}>
      <Box textAlign="center">

      <p>{`Tipo de ${props.filter}`}</p>
      <RadioButtonGroup
        id="radio-button-group-component-1"
        options={props.options}
        value={value}
        onChange={handleOnChange}
        size="medium"
        variant="brand"
        borderRadius="semi-rounded"
        style={{ margin: "10px" }}
        labelAlignment="center"
      />
      </Box>
    </Application>
    </>
  );
}
