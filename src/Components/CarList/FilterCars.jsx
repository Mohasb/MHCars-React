import React from "react";
import { RadioButtonGroup } from "react-rainbow-components";

class SimpleRadioButtonGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: this.props.options,
      value: "todos",
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(event) {
    this.setState({ value: event.target.value });
    if (this.props.name === "oilType") {
      this.props.setOilFilter(event.target.value);
    } else if (this.props.name === "gearShiftType") {
      this.props.setGearFilter(event.target.value);
    }
  }

  render() {
    const { options, value } = this.state;
    return (
      <RadioButtonGroup
        id="radio-button-group-component-1"
        options={options}
        value={value}
        onChange={this.handleOnChange}
        size="medium"
        variant="brand"
        borderRadius="semi-rounded"
      />
    );
  }
}
export default function FilterButtons({
  options,
  name,
  setOilFilter,
  setGearFilter,
}) {
  return (
    <div className="rainbow-p-around_x-large rainbow-align-content_center">
      <SimpleRadioButtonGroup
        options={options}
        name={name}
        setOilFilter={setOilFilter}
        setGearFilter={setGearFilter}
      />
    </div>
  );
}
