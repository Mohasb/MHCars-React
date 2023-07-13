import { useEffect, useState } from "react";
import { Modal, Button, Input } from "react-rainbow-components";
import { useNavigate } from "react-router-dom";
import ClientsService from "../../Services/apiRequest/Crud/ClientsService";
import CustomService from "../../Services/apiRequest/CustomService";

export default function EditPwd({ isOpenModalPwd, setIsOpenModalPwd }) {
  const navigate = useNavigate();
  const [emailUser, setEmail] = useState("");
  const [passwordUser, setPassword] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
    pwd2Error: "",
  });
  const [clients, setClients] = useState(null);

  useEffect(() => {
    ClientsService.getJustClients().then((clients) => {
      setClients(clients);
    });
  }, []);

  const handleOnClose = () => {
    setIsOpenModalPwd(false);
  };

  const handleChangeEmail = (event) => {
    validateEmail(event.target.value);
    return setEmail(event.target.value);
  };
  const handleChagePassword = (event) => {
    validatePassword(event.target.value);
    return setPassword(event.target.value);
  };
  const handleChagePwd2 = (event) => {
    validatePwd2(passwordUser, event.target.value);
    return setPwd2(event.target.value);
  };

  const handleClickInput = (e) => {
    const name = e.target.name;

    switch (name) {
      case "email":
        setErrors((prevState) => ({ ...prevState, emailError: "" }));
        break;
      case "password":
        setErrors((prevState) => ({ ...prevState, passwordError: "" }));
        break;
      case "pwd2":
        setErrors((prevState) => ({ ...prevState, pwd2Error: "" }));
        break;

      default:
        break;
    }
  };

  const handleChangePwd = () => {
    validateEmail(emailUser);
    validatePassword(passwordUser);
    validatePwd2(passwordUser, pwd2);
    ///
    if (
      !errors.emailError &&
      !errors.passwordError &&
      !errors.pwd2Error &&
      emailUser &&
      passwordUser &&
      pwd2
    ) {
      const client = clients.find((client) => client.email === emailUser);
      client.password = passwordUser;
      CustomService.updatePwd(client, client.id).
      navigate("/");
    }
  };

  const validateEmail = (email) => {
    if (!email) {
      setErrors((prevState) => ({
        ...prevState,
        emailError: "El email es requerido",
      }));
    } else if (!clients.find((client) => client.email === email)) {
      setErrors((prevState) => ({
        ...prevState,
        emailError: "El email no existe",
      }));
    }
  };
  const validatePassword = (passwordUser) => {
    const regexPassword =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

    if (!passwordUser) {
      setErrors((prevState) => ({
        ...prevState,
        passwordError: "El password es requerido",
      }));
    } else if (!regexPassword.test(passwordUser)) {
      setErrors((prevState) => ({
        ...prevState,
        passwordError:
          "El password no es válido(8 caracteres, 1mayuscula, 1minuscula y al menos 1 numero)",
      }));
    }
  };
  const validatePwd2 = (passwordUser, pwd2) => {
    if (!pwd2) {
      setErrors((prevState) => ({
        ...prevState,
        pwd2Error: "La confirmación de password es requerido",
      }));
    } else if (passwordUser != pwd2) {
      setErrors((prevState) => ({
        ...prevState,
        pwd2Error: "Los passwords no coinciden",
      }));
    }
  };

  return (
    <Modal
      isOpen={isOpenModalPwd}
      onRequestClose={handleOnClose}
      title="MODIFICAR CONTRASEÑA"
      variant="brand"
      footer={
        <div className="rainbow-flex rainbow-justify_spread">
          <Button label="Volver" variant="neutral" onClick={handleOnClose} />
          <Button
            id="actualizar"
            label="Actualizar"
            variant="brand"
            onClick={() => {
              handleChangePwd();
            }}
          />
        </div>
      }
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          document.querySelector("#actualizar").click();
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
        <Input
          label="Confirmación Password"
          placeholder="**********"
          type="password"
          name="pwd2"
          className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
          borderRadius="semi-rounded"
          size="large"
          value={pwd2}
          onChange={handleChagePwd2}
          error={errors.pwd2Error}
          onClick={handleClickInput}
        />
        <input type="submit" value="" hidden />
      </form>
    </Modal>
  );
}
