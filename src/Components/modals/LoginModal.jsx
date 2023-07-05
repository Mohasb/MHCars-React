import React, { useState, useContext } from "react";
import { Modal, Button, Input } from "react-rainbow-components";
import authService from "../../services/login/auth.service";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Context from "../../services/contextUser/ContextUser";
import Stack from "@mui/material/Stack";
import CryptoJS from "crypto-js";
import EditPwd from "./EditPassworModal";

export default function LoginModal(props) {
  const [isOpenModalPwd, setIsOpenModalPwd] = useState(false);

  const { user, setUser } = useContext(Context);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(props.openModal);
  const [emailUser, setEmail] = useState("");
  const [passwordUser, setPassword] = useState("");
  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
  });
  const secretKeyCripto = "Muhammad";
  const ecryptStorage = (name, data) => {
    const encrypt = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      secretKeyCripto
    ).toString();

    localStorage.setItem(name, encrypt);
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
        setUser(response.userWithToken);
        const userWithoutImage = { ...response.userWithToken };
        delete userWithoutImage.image;
        ecryptStorage("_ughVjkKj", JSON.stringify(userWithoutImage));
        props.setOpenNotification(true);
        navigate(location.pathname);
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
    <div className="visually-hidden">
      <div className="rainbow-m-bottom_xx-large rainbow-p-bottom_xx-large ">
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
              <Stack
                spacing={1}
                direction={{ xs: "column", sm: "column" }}
                sx={{ width: "100%" }}
              >
                <p className="text-center">
                  ¿No tienes cuenta?&nbsp;
                  <Link to={"/registro"} onClick={handleOnClose}>
                    Registrate
                  </Link>
                </p>
                <p className="text-center">
                  ¿Has olvidado tu contraseña?&nbsp;
                  <Link
                    to={"/"}
                    onClick={() => {
                      //handleOnClose();
                      setIsOpenModalPwd(true);
                    }}
                  >
                    Modificala
                  </Link>
                </p>
              </Stack>
              <Button
                id="login"
                label="Login"
                variant="brand"
                onClick={() => {
                  validateLogin(emailUser, passwordUser);
                }}
              />
            </div>
          }
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              document.querySelector("#login").click();
            }}
          >
            <Input
              label="Email"
              placeholder="email@gmail.com"
              type="email"
              name="email"
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
              size="large"
              value={passwordUser}
              onChange={handleChagePassword}
              error={errors.passwordError}
              onClick={handleClickInput}
            />
            <input type="submit" value="" hidden />
          </form>
        </Modal>
        <EditPwd
          isOpenModalPwd={isOpenModalPwd}
          setIsOpenModalPwd={setIsOpenModalPwd}
        />
      </div>
    </div>
  );
}
