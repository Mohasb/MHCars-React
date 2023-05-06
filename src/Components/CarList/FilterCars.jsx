import React from "react";
import { RadioButtonGroup } from "react-rainbow-components";

class SimpleRadioButtonGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: this.props.options,
      value: "todos",
      filter: this.props.filter,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(event) {
    this.setState({ value: event.target.value });
    if (this.props.name === "oilType") {
      this.props.setOilFilter(event.target.value);
    } else if (this.props.name === "gearShiftType") {
      this.props.setGearFilter(event.target.value);
    } else if (this.props.name === "carType") {
      this.props.setCarTypeFilter(event.target.value);
    }
  }

  render() {
    const { options, value, filter } = this.state;
    return (
      <>
        <RadioButtonGroup
          id="radio-button-group-component-1"
          options={options}
          value={value}
          onChange={this.handleOnChange}
          size="medium"
          variant="brand"
          borderRadius="semi-rounded"
          style={{ margin: "10px" }}
          label={`Tipo de ${filter}`}
          labelAlignment="center"
        />
      </>
    );
  }
}
export default function FilterButtons({
  options,
  name,
  setOilFilter,
  setGearFilter,
  setCarTypeFilter,
  filter,
}) {
  return (
    <div className="rainbow-p-around_x-large rainbow-align-content_center p-0">
      <SimpleRadioButtonGroup
        options={options}
        name={name}
        setOilFilter={setOilFilter}
        setGearFilter={setGearFilter}
        setCarTypeFilter={setCarTypeFilter}
        filter={filter}
      />
    </div>
  );
}
