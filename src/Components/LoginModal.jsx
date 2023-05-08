import React, { useState } from "react";
import { Modal, Button, Input, Application } from "react-rainbow-components";

export default function LoginModal(props) {
  const [isOpen, setIsOpen] = useState(props.openModal);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
  });
  const themeRainbow = {
    rainbow: {
      palette: {
        brand: "#F4B408",
      },
    },
  };
  const inputStyles = {
    width: 400,
  };

  const handleClickInput = (e) => {
    const name = e.target.name;
    name === "email"
      ? setErrors((prevState) => ({ ...prevState, emailError: "" }))
      : setErrors((prevState) => ({ ...prevState, passwordError: "" }));
  };

  const handleOnClose = () => {
    elevateToParent(false);
    return setIsOpen(false);
  };

  const elevateToParent = (state) => {
    props.setOpenModal(state);
  };

  const handleChangeEmail = (event) => {
    return setEmail(event.target.value);
  };
  const handleChagePassword = (event) => {
    return setPassword(event.target.value);
  };

  const validateLogin = (email, password) => {
    const regexEmail =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    const regexPassword =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

    if (!email) {
      setErrors((prevState) => ({
        ...prevState,
        emailError: "Introduce una direccion de correo",
      }));
    } else if (!regexEmail.test(email)) {
      setErrors((prevState) => ({
        ...prevState,
        emailError: "El email no es válido",
      }));
    }
    //////////////////////////////////////////////////////
    if (!password) {
      setErrors((prevState) => ({
        ...prevState,
        passwordError: "Introduce una contraseña",
      }));
    } else if (!regexPassword.test(password)) {
      setErrors((prevState) => ({
        ...prevState,
        passwordError: "El password no es válido",
      }));
    }
    /*- at least 8 characters
      - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
      - Can contain special characters*/
    try {
      const response = fetch(`http://localhost:5134/api/custom/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
        });
    } catch (error) {}
  };

  return (
    <Application theme={themeRainbow}>
      <div className="rainbow-m-bottom_xx-large rainbow-p-bottom_xx-large visually-hidden">
        <Modal
          isOpen={isOpen}
          onRequestClose={handleOnClose}
          title="LOGIN"
          variant="brand"
          footer={
            <div className="rainbow-flex rainbow-justify_spread">
              <Button
                label="Volver"
                variant="neutral"
                onClick={handleOnClose}
              />
              <Button
                label="Login"
                variant="brand"
                onClick={() => {
                  validateLogin(email, password);
                  //this.handleOnClose();
                }}
              />
            </div>
          }
        >
          <form>
            <Input
              label="Email"
              placeholder="email@gmail.com"
              type="email"
              name="email"
              style={inputStyles}
              className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
              borderRadius="semi-rounded"
              size="large"
              value={email}
              onChange={() => handleChangeEmail(window.event)}
              error={errors.emailError}
              onClick={handleClickInput}
            />
            <Input
              label="Password"
              placeholder="**********"
              type="password"
              name="password"
              className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
              borderRadius="semi-rounded"
              style={inputStyles}
              size="large"
              value={password}
              onChange={() => handleChagePassword(window.event)}
              error={errors.passwordError}
              onClick={handleClickInput}
            />
          </form>
        </Modal>
      </div>
    </Application>
  );
}
