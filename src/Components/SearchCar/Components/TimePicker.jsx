import { useState } from "react";
import { TimePicker } from "react-rainbow-components";
import { Application } from "react-rainbow-components";
import { themeRainbow } from "../../Theme/ThemeRainbow";

const containerStyles = {
  maxWidth: 350,
  margin:"1rem auto"
};

export default function Time(props) {
    const [state, setState] = useState({time:""})
    return(
      <Application theme={themeRainbow}>

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
          className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto m-0 p-0"
          size="large"
          borderRadius="semi-square"
          hour24
        />
      </Application>
    )
}
