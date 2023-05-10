import React from "react";
import { RadioButtonGroup } from "react-rainbow-components";
import "./Style.scss"

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
        id="radio-button-group-component-1"
        options={options}
        value={value}
        onChange={this.handleOnChange}
        size="large"
        variant="brand"
        borderRadius="semi-square"
        labelPosition="right"
        style={{color:"white"}}
      />
    );
  }
}
export default function AgeRadioButtons({ setAge }) {
  return (
    <div className="rainbow-p-around_x-large rainbow-align-content_center " >
      <SimpleRadioButtonGroup setAge={setAge} />
    </div>
  );
}
