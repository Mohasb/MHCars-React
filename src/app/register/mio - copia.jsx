import { Input, Button } from "react-rainbow-components";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import "./style.scss";
import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function RegisterMio() {
  const [formData, setFormData] = useState({
    dni: "",
    nombre: "",
    email: "",
    password: "",
    confirmationPassword: "",
    bankAccount: "",
  });
  const [errors, setErrors] = useState({
    errorDni: "",
    errorNombre: "",
    errorEmail: "",
    errorPassword: "",
    errorConfirmationPassword: "",
    errorBankAccount: "",
  });

  const handleSubmit = (e) => {
    validateValues();
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    validateValues(name);
    if (!errors.name) {
    }
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const removeError = (e) => {
    const name =
      "error" + e.target.name.charAt(0).toUpperCase() + e.target.name.slice(1);
    setErrors((prevState) => ({ ...prevState, [name]: "" }));
  };

  const validateValues = (name) => {
    const dni = formData.dni.trim();
    const password = formData.password.trim();
    const confirmationPassword = formData.confirmationPassword.trim();

    switch (name) {
      case "nombre":
        handleErrorsNombre();
        break;
      case "dni":
        handleErrorsDni();
        break;
      case "bankAccount":
        handleErrosBankAccount();
        break;
      case "email":
        handleErrorsEmail();
        break;
      case "password":
        handleErrorsPassword();
        break;
      default:
        handleErrorsNombre();
        handleErrorsDni();
        handleErrorsEmail();
        handleErrosBankAccount();
        handleErrorsPassword();
        break;
    }
  };

  const handleErrorsNombre = () => {
    const inputNombre = document.querySelector("input[name='nombre']");
    console.log(inputNombre);
    const nombre = formData.nombre.trim();
    if (!nombre) {
      setErrors((prevState) => ({ ...prevState, errorNombre: "Vacio" }));
    } else if (nombre.length < 2) {
      setErrors((prevState) => ({ ...prevState, errorNombre: "Corto" }));
    } else {
      setErrors((prevState) => ({ ...prevState, errorNombre: "" }));
      inputNombre.classList.add("valid");
    }
  };
  const handleErrorsDni = () => {
    const REGEX_DNI = /^[0-9]{8,8}[A-Za-z]$/g;
    const dni = formData.dni.trim();
    if (!dni) {
      setErrors((prevState) => ({ ...prevState, errorDni: "Vacio" }));
    } else if (!REGEX_DNI.test(dni)) {
      setErrors((prevState) => ({ ...prevState, errorDni: "Formato" }));
    } else {
      setErrors((prevState) => ({ ...prevState, errorDni: "" }));
    }
  };
  const handleErrosBankAccount = () => {
    const bankAccount = formData.bankAccount.trim();
    const REGEX_BANK_ACCOUNT =
      /([a-zA-Z]{2})\s*\t*(\d{2})\s*\t*(\d{4})\s*\t*(\d{4})\s*\t*(\d{2})\s*\t*(\d{10})/g;

    if (!formData.bankAccount.trim()) {
      setErrors((prevState) => ({ ...prevState, errorBankAccount: "Vacio" }));
    } else if (!REGEX_BANK_ACCOUNT.test(formData.bankAccount)) {
      setErrors((prevState) => ({ ...prevState, errorBankAccount: "Formato" }));
    } else {
      setErrors((prevState) => ({ ...prevState, errorBankAccount: "" }));
    }
  };
  const handleErrorsEmail = () => {
    const REGEX_EMAIL =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    const email = formData.email.trim();

    if (!email) {
      setErrors((prevState) => ({ ...prevState, errorEmail: "Vacio" }));
    } else if (!REGEX_EMAIL.test(email)) {
      setErrors((prevState) => ({ ...prevState, errorEmail: "Formato" }));
    } else {
      setErrors((prevState) => ({ ...prevState, errorEmail: "" }));
    }
  };
  const handleErrorsPassword = () => {
    const password = formData.password.trim();

    const regexPassword =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if (!password) {
      setErrors((prevState) => ({
        ...prevState,
        errorPassword: "No puede quedar vacio",
      }));
    } else if (password.length < 8) {
      setErrors((prevState) => ({
        ...prevState,
        errorPassword: "Debe tener 8 caracteres como mínimo",
      }));
    } else if (!/[A-Z]/.test(password)) {
      setErrors((prevState) => ({
        ...prevState,
        errorPassword: "Debe tener al menos 1 letra mayuscula",
      }));
    } else if (!/[a-z]/.test(password)) {
      setErrors((prevState) => ({
        ...prevState,
        errorPassword: "Debe tener al menos 1 letra minuscula",
      }));
    } else if (!/\d/.test(password)) {
      setErrors((prevState) => ({
        ...prevState,
        errorPassword: "Debe tener al menos 1 numero",
      }));
    } else if (!regexPassword.test(password)) {
      setErrors((prevState) => ({
        ...prevState,
        errorPassword: "El password no es válido",
      }));
    }
    /*- at least 8 characters
      - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
      - Can contain special characters*/
  };

  return (
    <main>
      <div className="card">
        <h1 className="title">Registro</h1>
        <Box className="box">
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <Input
                label="Nombre"
                placeholder="Nombre"
                type="text"
                size="large"
                borderRadius="semi-rounded"
                name="nombre"
                value={formData.name}
                onBlur={handleChange}
                onClick={removeError}
                error={errors.errorNombre}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                label="Email"
                placeholder="inputEmail@gmail.com"
                type="email"
                size="large"
                name="email"
                borderRadius="semi-rounded"
                value={formData.name}
                onChange={handleChange}
                onClick={removeError}
                error={errors.errorEmail}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                label="DNI"
                placeholder="12345678A"
                type="text"
                size="large"
                borderRadius="semi-rounded"
                name="dni"
                value={formData.name}
                onChange={handleChange}
                onClick={removeError}
                error={errors.errorDni}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                label="Password"
                placeholder="**********"
                type="password"
                name="password"
                borderRadius="semi-rounded"
                size="large"
                value={formData.name}
                onChange={handleChange}
                error={errors.errorPassword}
                onClick={removeError}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                label="Tarjeta De Credito"
                placeholder="111-111-1111"
                type="text"
                size="large"
                name="bankAccount"
                borderRadius="semi-rounded"
                value={formData.name}
                onChange={handleChange}
                onClick={removeError}
                error={errors.errorBankAccount}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                label="Confirmación Password"
                placeholder="**********"
                type="password"
                name="confirmationPassword"
                borderRadius="semi-rounded"
                size="large"
                value={formData.name}
                onChange={handleChange}
                error={errors.errorConfirmationPassword}
                onClick={removeError}
                required
              />
            </Grid>
          </Grid>
          <Box sx={{ textAlign: "center", margin: "2rem 0 auto" }}>
            <Button
              label="Registrarse"
              variant="brand"
              borderRadius="semi-rounded"
              onClick={handleSubmit}
              size="large"
              style={{ color: "#fff" }}
            />
          </Box>
        </Box>
      </div>
    </main>
  );
}
