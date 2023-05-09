import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Application } from "react-rainbow-components";
import authService from "../Services/login/auth.service";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function LoginModal(props) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(props.openModal);
  const [emailUser, setEmail] = useState("");
  const [passwordUser, setPassword] = useState("");
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

  useEffect(() => {
    if (localStorage.getItem("user")) {
      props.setIsLogged(true);
    }
  }, []);

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
  /* const handleChangeInput = (e) => {
    const name = e.target.name;
    name === "email"
      ? setErrors((prevState) => ({ ...prevState, emailError: "" }))
      : setErrors((prevState) => ({ ...prevState, passwordError: "" }));
  } */

  const handleChangeEmail = (event) => {
    return setEmail(event.target.value);
  };
  const handleChagePassword = (event) => {
    return setPassword(event.target.value);
  };

  const validateLogin = (email, password) => {
    const regexEmail =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

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
    } else {
      setEmail(email);
    }
    //////////////////////////////////////////////////////
    if (!password) {
      setErrors((prevState) => ({
        ...prevState,
        passwordError: "Introduce una contraseña",
      }));
    } else {
      setPassword(password);
    }

    if (!!emailUser && !!passwordUser) {
      login(emailUser, passwordUser);
    }
  };

  const login = (email, password) => {
    authService.login(email, password).then((response) => {
      if (response.isOk) {
        handleOnClose();
        props.setIsLogged(true);
        navigate("/");
      } else {
        if (response.responseText.includes("Usuario")) {
          setErrors((prevState) => ({
            ...prevState,
            emailError: "Usuario no encontrado",
          }));
        } else {
          setErrors((prevState) => ({
            ...prevState,
            passwordError: "El password no es correcto",
          }));
        }
      }
    });
  };

  return (
    <Application theme={themeRainbow}>
      <div className="rainbow-m-bottom_xx-large rainbow-p-bottom_xx-large visually-hidden">
        <Modal
          isOpen={isOpen}
          onRequestClose={handleOnClose}
          title="Iniciar Sessión"
          variant="brand"
          footer={
            <div className="rainbow-flex rainbow-justify_spread">
              <Button
                label="Volver"
                variant="neutral"
                onClick={handleOnClose}
              />
              <p className="text-center">¿No tienes cuenta?&nbsp;<Link to={"Registro"} onClick={handleOnClose}>Registrate</Link></p>
              <Button
                label="Login"
                variant="brand"
                onClick={() => {
                  validateLogin(emailUser, passwordUser);
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
              value={emailUser}
              onChange={handleChangeEmail}
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
              value={passwordUser}
              onChange={handleChagePassword}
              error={errors.passwordError}
              onClick={handleClickInput}
            />
          </form>
        </Modal>
      </div>
    </Application>
  );
}
