import React from 'react';
import {
    Modal,
    Button,
    Input,
    TimePicker,
    DatePicker,
    Lookup,
    Textarea,
    MultiSelect,
    Picklist,
    Option,
} from 'react-rainbow-components';
import { Field, reduxForm } from 'redux-form';

const styles = {
    input: {
        marginTop: 24,
    },
    inputColumn: {
        width: '48%',
        marginTop: 24,
    },
};

const data = [
    { label: 'Paris' },
    { label: 'New York' },
    { label: 'San Fransisco' },
    { label: 'Madrid' },
    { label: 'Miami' },
    { label: 'London' },
    { label: 'Tokyo' },
    { label: 'Barcelona' },
    { label: 'La Habana' },
    { label: 'Buenos Aires' },
    { label: 'Sao Paulo' },
    { label: 'Toronto' },
];

function filter(query, options) {
    if (query) {
        return options.filter(item => {
            const regex = new RegExp(query, 'i');
            return regex.test(item.label);
        });
    }
    return [];
}

function SimpleForm(props) {
    const { handleSubmit, reset, onSubmit, onSearch, options, isLoading } = props;

    const submit = values => {
        onSubmit(values);
        reset();
    };

    return (
        <form id="redux-form-id" noValidate onSubmit={handleSubmit(submit)}>
            <Field
                component={Input}
                name="subject"
                required
                label="Company"
                placeholder="Enter company name"
            />

            <div className="rainbow-flex rainbow-justify_spread">
                <Field
                    id="modal-datepicker-11"
                    style={styles.inputColumn}
                    component={DatePicker}
                    name="date"
                    required
                    label="Select a Date"
                    placeholder="Select a date"
                />

                <Field
                    id="modal-timepicker-11"
                    style={styles.inputColumn}
                    component={TimePicker}
                    name="time"
                    required
                    label="Select a Time"
                />
            </div>

            <div className="rainbow-flex rainbow-justify_spread">
                <Field
                    id="multiselect-component-13"
                    style={styles.inputColumn}
                    component={MultiSelect}
                    name="extras"
                    label="Extras"
                    placeholder="Select your extras"
                    showCheckbox
                >
                    <Option name="option-1" label="Air conditioner" />
                    <Option name="option-2" label="Drinks" />
                    <Option name="option-3" label="WiFi" />
                </Field>

                <Field
                    id="picklist-13"
                    style={styles.inputColumn}
                    component={Picklist}
                    name="building"
                    label="Select Building"
                >
                    <Option name="option 1" label="Experimental Building" />
                    <Option name="option 2" label="Empire State" />
                    <Option name="option 3" label="Central Park" />
                </Field>
            </div>

            <Field
                id="modal-lookup-11"
                debounce
                isLoading={isLoading}
                onSearch={onSearch}
                style={styles.input}
                component={Lookup}
                name="location"
                label="Location"
                placeholder="Enter location"
                options={options}
            />

            <Field
                className="rainbow-m-bottom_medium"
                style={styles.input}
                component={Textarea}
                name="description"
                label="Description"
                placeholder="Enter description"
            />
        </form>
    );
}

function validate(values) {
    const { subject, date, time } = values;
    const errors = {};
    if (!subject) {
        errors.subject = 'Title is a required field';
    }
    if (!date) {
        errors.date = 'Date is a required field';
    }
    if (!time) {
        errors.time = 'Time is a required field';
    }
    return errors;
}

const Form = reduxForm({
    form: 'create-issue-form',
    validate,
    touchOnBlur: false,
})(SimpleForm);

class FormModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            options: data,
            initialValues: {
                subject: 'React Rainbow',
                description:
                    'React Rainbow is a collection of components that will reliably help you build your application in a snap.',
                date: new Date(),
                time: '00:00',
            },
        };
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleOnClose = this.handleOnClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.search = this.search.bind(this);
    }

    handleOnClick() {
        return this.setState({
            isOpen: true,
        });
    }

    handleOnClose() {
        return this.setState({
            isOpen: false,
            options: null,
        });
    }

    handleSubmit(values) {
        console.log(values);
        this.setState({
            options: null,
        });
    }

    search(value) {
        const { options, value: valueState } = this.state;
        if (options && valueState && value.length > valueState.length) {
            this.setState({
                options: filter(value, options),
                value,
            });
        } else if (value) {
            this.setState({
                isLoading: true,
                value,
            });
            setTimeout(
                () =>
                    this.setState({
                        options: filter(value, data),
                        isLoading: false,
                    }),
                500,
            );
        } else {
            this.setState({
                isLoading: false,
                value: '',
                options: data,
            });
        }
    }

    render() {
        const { isOpen, initialValues, isLoading, options } = this.state;
        return (
            <div>
                <Button
                    id="button-11"
                    variant="neutral"
                    label="Open Modal"
                    onClick={this.handleOnClick}
                />
                <Modal
                    id="modal-11"
                    title="Modal Header"
                    isOpen={isOpen}
                    onRequestClose={this.handleOnClose}
                    footer={
                        <div className="rainbow-flex rainbow-justify_end">
                            <Button
                                form="redux-form-id"
                                className="rainbow-m-right_large"
                                label="Cancel"
                                variant="neutral"
                                onClick={this.handleOnClose}
                            />
                            <Button
                                form="redux-form-id"
                                label="Save"
                                variant="brand"
                                type="submit"
                            />
                        </div>
                    }
                >
                    <Form
                        onSubmit={this.handleSubmit}
                        onSearch={this.search}
                        isLoading={isLoading}
                        options={options}
                        initialValues={initialValues}
                    />
                </Modal>
            </div>
        );
    }
}

export default function RegisterModal() {
  return(
    <div className="rainbow-m-bottom_xx-large rainbow-p-bottom_xx-large">
            <div className="rainbow-m-right_medium">
                <FormModal />
            </div>
    </div>
  )
}
