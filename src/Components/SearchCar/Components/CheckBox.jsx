import React from "react";
import { CheckboxToggle } from "react-rainbow-components";
import Box from "@mui/material/Box";

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
        id="checkbox-two-branches"
        label="Devolver el vehículo en otra sucursal"
        value={value}
        onChange={this.handleOnChange}
        style={{margin:"1rem auto"}}
      />
    );
  }
}

export default function CheckBoxTwoBranches({ setCheckTwoBranches }) {
  return (
        <Box textAlign="center">
          <SimpleCheckboxToggle setCheckTwoBranches={setCheckTwoBranches} />
        </Box>
  );
}
