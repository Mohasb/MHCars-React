import React, { useState, useRef } from "react";
import { Modal } from "react-rainbow-components";
import TextField from "@mui/material/TextField";
import ButtonMui from "@mui/material/Button";
import { Textarea } from "react-rainbow-components";
import emailjs from "@emailjs/browser";

export default function ContactModal(props) {
  const [isOpen, setIsOpen] = useState(props.openContact);
  const form = useRef();
  const handleOnClose = () => {
    setIsOpen(false);
    props.setOpenContact(false);
  };
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleBlur = (event) => {
    const { name } = event.target;

    const validationErrors = {};

    if (name === "name" && !values.name) {
      validationErrors.name = "El nombre es requerido";
    }

    if (name === "email") {
      if (!values.email) {
        validationErrors.email = "El correo electrónico es requerido";
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        validationErrors.email = "Formato de correo electrónico inválido";
      }
    }

    if (name === "message" && !values.message) {
      validationErrors.message = "El mensaje es requerido";
    }

    setErrors(validationErrors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = {};

    if (!values.name) {
      validationErrors.name = "El nombre es requerido";
    }

    if (!values.email) {
      validationErrors.email = "El correo electrónico es requerido";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      validationErrors.email = "Formato de correo electrónico inválido";
    }

    if (!values.message) {
      validationErrors.message = "El mensaje es requerido";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      emailjs
        .sendForm(
          "service_znehkog",
          "template_9lszyja",
          form.current,
          "PS-t9bkec4GOVfXW2"
        )
        .then(
          (result) => {
            if (result.text === "OK") {
              handleOnClose();
            }
          },
          (error) => {
            alert(error.text);
          }
        );
      setValues({
        name: "",
        email: "",
        message: "",
      });
      setErrors({});
    }
  };

  return (
    <div className="rainbow-m-bottom_xx-large rainbow-p-bottom_xx-large">
      <Modal
        isOpen={isOpen}
        onRequestClose={handleOnClose}
        title="Contacto MHCars"
        footer={
          <div className="rainbow-flex rainbow-justify_space-around">
            <ButtonMui
              size="large"
              id="enviar"
              variant="contained"
              onClick={handleOnClose}
            >
              VOLVER
            </ButtonMui>
            <ButtonMui
              size="large"
              id="enviar"
              type="submit"
              variant="contained"
              onClick={handleSubmit}
            >
              ENVIAR
            </ButtonMui>
          </div>
        }
      >
        <div className="contact-container">
          <form onSubmit={handleSubmit} ref={form}>
            <TextField
              label="Nombre"
              variant="outlined"
              id="name"
              name="name"
              value={values.name}
              error={!!errors.name}
              helperText={errors.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <TextField
              label="Email"
              variant="outlined"
              id="email"
              name="email"
              value={values.email}
              error={!!errors.email}
              helperText={errors.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <Textarea
              rows={4}
              placeholder="Mensaje"
              id="message"
              name="message"
              value={values.message}
              borderRadius="semi-square"
              error={errors.message}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </form>
        </div>
      </Modal>
    </div>
  );
}
