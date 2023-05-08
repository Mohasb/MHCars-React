import { useState } from "react";
import { TimePicker } from "react-rainbow-components";

const containerStyles = {
  maxWidth: 250,
};

export default function Time(props) {
    const [state, setState] = useState({time:""})
    return(
        <TimePicker
          id="time-picker-1"
          value={state.time}
          placeholder={`Hora ${props.name}`}
          onChange={(value) => {
            setState({ time: value })
            if (props.name === "recogida") {
              props.setPickupTime(value)
            }else {
              props.setReturnTime(value)
            }
          }}
          style={containerStyles}
          className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto m-0 "
          size="large"
          borderRadius="semi-square"
          hour24
        />
    )
}
