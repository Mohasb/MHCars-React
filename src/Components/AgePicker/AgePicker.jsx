import React from 'react';
import { RadioButtonGroup } from 'react-rainbow-components';

const options = [
    { value: 'off', label: 'Off' },
    { value: 'parking', label: 'Parking' },
    { value: 'auto', label: 'Auto' },
    { value: 'on', label: 'On' },
];

class SimpleRadioButtonGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'auto',
        };
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(event) {
        return this.setState({ value: event.target.value });
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
                borderRadius="semi-rounded"
            />
        );
    }
}
export default function AgeRadioButtons() {
  return(

    <div className="rainbow-p-around_x-large rainbow-align-content_center">
        <SimpleRadioButtonGroup />
    </div>

  )
}