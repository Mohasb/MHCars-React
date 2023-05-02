import { useEffect, useState } from "react";
import { DatePicker } from "react-rainbow-components";

function DateRange(props) {
  const initialState = {
    range: undefined,
  };
  const containerStyles = {
    maxWidth: 500,
    margin: 0,
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    props.setBookingDates(state);
  }, [props, state]);

  return (
    <>
      <div
        className="rainbow-align-content_center rainbow-m-vertical_large rainbow-p-horizontal_small rainbow-m_auto"
        style={containerStyles}
      >
        <DatePicker
          id="datePicker"
          borderRadius="semi-square"
          size="large"
          style={{ colorScheme: "black" }}
          placeholder="Selecciona el rango de fechas"
          selectionType="range"
          formatStyle="large"
          variant="double"
          error={props.errorDates}
          value={state.range}
          minDate={new Date()}
          required={true}
          onChange={(value) => {
            setState({ range: value });
          }}
          onClick={() => {props.setErrorDates("")}}
        />
      </div>
    </>
  );
}
export default DateRange;
