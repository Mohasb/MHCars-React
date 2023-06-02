import { useState } from "react";
import { Input } from "react-rainbow-components";
import { DatePicker } from "react-rainbow-components";

export default function CarsAvailables() {
  const [dataRange, setDataRange] = useState(null);
  return (
    <>
      <Input
        id="input-component-1"
        placeholder="Id sucursal"
        className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
        borderRadius="semi-square"
      />
      <DatePicker
        id="datePicker-15"
        label="DatePicker Label"
        placeholder="Select range of dates"
        selectionType="range"
        formatStyle="large"
        variant="single"
        borderRadius="semi-square"
        value={dataRange}
        onChange={(value) => setDataRange(value)}
      />
    </>
  );
}
