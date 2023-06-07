import { useState } from "react";
import { TimePicker } from "react-rainbow-components";

const containerStyles = {
  maxWidth: 250,
  margin: "1rem auto",
};

export default function Time(props) {
  const [state, setState] = useState({ time: "" });
  return (
    <TimePicker
      id="time-picker-1"
      value={state.time}
      valueAlignment="center"
      placeholder={`Hora ${props.name}`}
      onChange={(value) => {
        setState({ time: value });
        if (props.name === "recogida") {
          props.setPickupTime(value);
        } else {
          props.setReturnTime(value);
        }
      }}
      style={containerStyles}
      size="large"
      borderRadius="semi-square"
      hour24
      error={props.error}
      onClick={() => {
        if (props.name === "recogida") {
          props.setErrorPickUpTime("");
        } else {
          props.setErrorReturnTime("");
        }
      }}
    />
  );
}
