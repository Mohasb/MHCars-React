import { useEffect, useState } from "react";
import { DatePicker } from "react-rainbow-components";
import { Application } from "react-rainbow-components";
import { themeRainbow } from "../../Theme/ThemeRainbow";
import "./Style.scss"

function DateRange(props) {
  const initialState = {
    range: undefined,
  };
  const containerStyles = {
    padding: 0,
    margin: 0,
    maxWidth:600,
    margin:"1rem auto"
    
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    props.setBookingDates(state);
  }, [props, state]);

  return (
    <Application theme={themeRainbow}>

      <div
        className="rainbow-align-content_center rainbow-m-vertical_large rainbow-p-horizontal_small rainbow-m_auto"
        style={containerStyles}
      >
        <DatePicker
          id="datePicker"
          borderRadius="semi-square"
          size="large"
          placeholder="Selecciona el rango de fechas"
          selectionType="range"
          formatStyle="large"
          variant="double"
          error={props.errorDates}
          value={state.range}
          //style={{ opacity: 0.7, borderColor:"rgba(196,196,196,255)" }}
          minDate={new Date()}
          required={true}
          onChange={(value) => {
            setState({ range: value });
          }}
          onClick={() => {
            props.setErrorDates("");
          }}
          onMouseOver="this.style.backgroundColor='#0F0'"
        />
      </div>
    </Application>
  );
}
export default DateRange;
