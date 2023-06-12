import React from "react";
import { RadioButtonGroup } from "react-rainbow-components";
import Stack from "@mui/material/Stack";

import "./Style.scss";

const options = [
  { value: "1", label: "19~24" },
  { value: "2", label: "25~74" },
  { value: "3", label: "75+" },
];

class SimpleRadioButtonGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "2",
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(event) {
    this.setState({ value: event.target.value });
    this.props.setAge(+event.target.value);
  }

  render() {
    const { value } = this.state;
    return (
      <RadioButtonGroup
        id="radio-age"
        options={options}
        value={value}
        onChange={this.handleOnChange}
        size="medium"
        variant="brand"
        borderRadius="semi-square"
        style={{ color: "white" }}
      />
    );
  }
}
export default function AgeRadioButtons({ setAge }) {
  return (
    <Stack
      spacing={1}
      direction={{ xs: "column", sm: "column" }}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <p className="label-age">Edad del conductor</p>
      <SimpleRadioButtonGroup setAge={setAge} />
    </Stack>
  );
}
