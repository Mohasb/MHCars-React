import React from "react";
import { CheckboxToggle } from "react-rainbow-components";

class SimpleCheckboxToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: false,
      setCheckTwoBranches: this.props.setCheckTwoBranches,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange() {
    const { value, setCheckTwoBranches } = this.state;
    this.setState({ value: !value });
    setCheckTwoBranches(!value);
  }

  render() {
    const { value } = this.state;
    return (
      <CheckboxToggle
        id="checkbox-toggle-component-1"
        label="Devolver el vehículo en otra sucursal"
        value={value}
        onChange={this.handleOnChange}
      />
    );
  }
}

export default function CheckBoxTwoBranches({ setCheckTwoBranches }) {
  return (
    <div className="rainbow-p-vertical_large rainbow-p-left_x-large">
      <SimpleCheckboxToggle setCheckTwoBranches={setCheckTwoBranches} />
    </div>
  );
}
