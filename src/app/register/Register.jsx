import { useState } from "react";
import { Input, Button } from "react-rainbow-components";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Tooltip from "./Tooltip";
import "./style.scss";

export default function Register() {
  const [values, setValues] = useState({
    nombre: "",
    email: "",
    dni: "",
    password: "",
    bankAccount: "",
    confirmationPassword: "",
  });

  const [errors, setErrors] = useState({
    errorNombre: "",
    errorEmail: "",
    errorDni: "",
    errorPassword: "",
    errorBankAccount: "",
    errorConfirmationPassword: "",
  });

  const handleSubmit = (values) => {
    for (let [key, value] of Object.entries(values)) {
      const nameError = "error" + key.charAt(0).toUpperCase() + key.slice(1);
      if (value === "") {
        setErrors((prevState) => ({
          ...prevState,
          [nameError]: `No puede quedar vacío`,
        }));
      }
      console.log(errors.errorNombre);
    }
  };

  const handleChange = (e) => {
    const nameInput = e.target.name;
    const value = e.target.value.trim();
    validate(nameInput, value);
  };

  const validate = (nameInput, value) => {
    switch (nameInput) {
      case "nombre":
        validateNombre(nameInput, value);
        break;
      case "email":
        validateEmail(nameInput, value);
        break;
      case "dni":
        validateDni(nameInput, value);
        break;
      case "password":
        validatePassword(nameInput, value);
        break;
      case "bankAccount":
        validateBankAccount(nameInput, value);
        break;
      case "confirmationPassword":
        validateConfirmationPassword(nameInput, value);
        break;
      default:
        break;
    }
  };

  const validateNombre = (nameInput, value) => {
    const nameError =
      "error" + nameInput.charAt(0).toUpperCase() + nameInput.slice(1);

    if (value.length < 2) {
      setErrors((prevState) => ({
        ...prevState,
        [nameError]: "El nombre debe ser mayor a dos carácteres",
      }));
    } else {
      setValues((prevState) => ({ ...prevState, [nameInput]: value }));
      setErrors((prevState) => ({ ...prevState, [nameError]: "" }));
    }
  };

  const validateEmail = (nameInput, value) => {
    const REGEX_EMAIL =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    const nameError =
      "error" + nameInput.charAt(0).toUpperCase() + nameInput.slice(1);
    if (!REGEX_EMAIL.test(value)) {
      setErrors((prevState) => ({
        ...prevState,
        [nameError]: "Formato email mal",
      }));
    } else {
      setValues((prevState) => ({ ...prevState, [nameInput]: value }));
      setErrors((prevState) => ({ ...prevState, [nameError]: "" }));
    }
  };
  const validateDni = (nameInput, value) => {
    const REGEX_DNI = /^[0-9]{8,8}[A-Za-z]$/g;
    const nameError =
      "error" + nameInput.charAt(0).toUpperCase() + nameInput.slice(1);
    if (!REGEX_DNI.test(value)) {
      setErrors((prevState) => ({
        ...prevState,
        [nameError]: "Formato dni mal",
      }));
    } else {
      setValues((prevState) => ({ ...prevState, [nameInput]: value }));
      setErrors((prevState) => ({ ...prevState, errorDni: "" }));
    }
  };
  const validatePassword = (nameInput, value) => {
    const regexPassword =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    const nameError =
      "error" + nameInput.charAt(0).toUpperCase() + nameInput.slice(1);

    if (value.length < 8) {
      console.log(nameError);
      setErrors((prevState) => ({
        ...prevState,
        [nameError]: "Debe tener 8 caracteres como mínimo",
      }));
    } else if (!/[A-Z]/.test(value)) {
      setErrors((prevState) => ({
        ...prevState,
        [nameError]: "Debe tener al menos 1 letra mayuscula",
      }));
    } else if (!/[a-z]/.test(value)) {
      setErrors((prevState) => ({
        ...prevState,
        [nameError]: "Debe tener al menos 1 letra minuscula",
      }));
    } else if (!/\d/.test(value)) {
      setErrors((prevState) => ({
        ...prevState,
        [nameError]: "Debe tener al menos 1 numero",
      }));
    } else if (!regexPassword.test(value)) {
      setErrors((prevState) => ({
        ...prevState,
        [nameError]: "El password no es válido",
      }));
    } else {
      setValues((prevState) => ({ ...prevState, [nameInput]: value }));
      setErrors((prevState) => ({
        ...prevState,
        [nameError]: "",
      }));
    }
  };
  const validateBankAccount = (nameInput, value) => {
    const nameError =
      "error" + nameInput.charAt(0).toUpperCase() + nameInput.slice(1);
    if (isNaN(value)) {
      setErrors((prevState) => ({
        ...prevState,
        [nameError]: "Caracteres inválidos,solo numeros",
      }));
    } else if (value.length < 16) {
      setErrors((prevState) => ({
        ...prevState,
        [nameError]: "Como minimo 16 numeros",
      }));
    } else if (value.length < 18) {
      setErrors((prevState) => ({
        ...prevState,
        [nameError]: "Como maximo 18 numeros",
      }));
    } else {
      setValues((prevState) => ({ ...prevState, [nameInput]: value }));
      setErrors((prevState) => ({ ...prevState, nameError: "" }));
    }
  };
  const validateConfirmationPassword = (nameInput, value) => {
    const nameError =
      "error" + nameInput.charAt(0).toUpperCase() + nameInput.slice(1);
    if (value !== values.password) {
      setErrors((prevState) => ({
        ...prevState,
        [nameError]: "No son iguales",
      }));
    } else {
      setValues((prevState) => ({ ...prevState, [nameInput]: value }));
      setErrors((prevState) => ({
        ...prevState,
        [nameError]: "",
      }));
    }
  };

  return (
    <main>
      <div className="card">
        <h1 className="title">Registro</h1>
        <form onSubmit={handleSubmit}>
          <Box className="box">
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <Input
                  required
                  label="Nombre"
                  placeholder="Nombre"
                  type="text"
                  size="large"
                  borderRadius="semi-rounded"
                  name="nombre"
                  onChange={handleChange}
                  error={errors.errorNombre}
                />
              </Grid>
              <Grid item xs={6}>
                <Input
                  required
                  label="Email"
                  placeholder="inputEmail@gmail.com"
                  type="email"
                  size="large"
                  name="email"
                  borderRadius="semi-rounded"
                  onChange={handleChange}
                  error={errors.errorEmail}
                />
              </Grid>
              <Grid item xs={6}>
                <Input
                  required
                  label="DNI"
                  placeholder="12345678A"
                  type="text"
                  size="large"
                  name="dni"
                  borderRadius="semi-rounded"
                  onChange={handleChange}
                  error={errors.errorDni}
                />
              </Grid>
              <Grid item xs={6}>
                <Tooltip
                  text={
                    "- at least 8 characters \n" +
                    "- must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n" +
                    "- Can contain special characters"
                  }
                >
                  <Input
                    required
                    label="Password"
                    placeholder="**********"
                    type="password"
                    name="password"
                    borderRadius="semi-rounded"
                    size="large"
                    onChange={handleChange}
                    error={errors.errorPassword}
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={6}>
                <Input
                  required
                  label="Tarjeta De Credito"
                  placeholder="111-111-1111"
                  type="text"
                  size="large"
                  name="bankAccount"
                  borderRadius="semi-rounded"
                  onChange={handleChange}
                  error={errors.errorBankAccount}
                />
              </Grid>
              <Grid item xs={6}>
                <Input
                  required
                  label="Confirmación Password"
                  placeholder="**********"
                  type="password"
                  name="confirmationPassword"
                  borderRadius="semi-rounded"
                  size="large"
                  onChange={handleChange}
                  error={errors.errorConfirmationPassword}
                />
              </Grid>
            </Grid>
            <Box sx={{ textAlign: "center", margin: "2rem 0 auto" }}>
              <Button
                label="Registrarse"
                variant="brand"
                borderRadius="semi-rounded"
                onClick={() => handleSubmit(values)}
                size="large"
                style={{ color: "#fff" }}
              />
            </Box>
          </Box>
        </form>
      </div>
    </main>
  );
}
