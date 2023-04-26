import { useState } from "react";
import { DatePicker } from "react-rainbow-components";

function DateRange() {
  const initialState = {
    range: undefined,
  };
  const containerStyles = {
    maxWidth: 400,
  };
  const [state, setState] = useState(initialState);

  return (
    <>
        <div
          className="rainbow-align-content_center rainbow-m-vertical_large rainbow-p-horizontal_small rainbow-m_auto"
          style={containerStyles}
        >
          <DatePicker
            id="datePicker"
            borderRadius="semi-rounded"
            //error="Select a date range"
            required
            size="large"
            style={{ colorScheme: "black" }}
            label="Fechas de Reserva"
            placeholder="Selecciona el rango de fechas"
            selectionType="range"
            formatStyle="large"
            variant="single"
            value={state.range}
            onChange={(value) => {
              console.log(state);
              setState({ range: value });
              console.log(state.range);
            }}
          />
        </div>
    </>
  );
}
export default DateRange;
