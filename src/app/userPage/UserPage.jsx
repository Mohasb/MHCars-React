import { useContext, useEffect, useState } from "react";
//External components
import { Input, Button } from "react-rainbow-components";
import Box from "@mui/material/Box";
//Services
import Context from "../../services/contextUser/ContextUser";
import { PutClient } from "../../services/apiRequest/PutClient";
//Components
import ReservationTable from "./ReservationTable";
import EditPwd from "./../../components/modals/EditPassworModal";
//styles
import "./style.scss";
import { FileSelector } from "react-rainbow-components";
import { useNavigate } from "react-router-dom";
import Notification from "../../components/notifications/Notification";
import CryptoJS from "crypto-js";

export default function UserPage() {
  //para mostrar notificacion de update correcto o incorrecto
  const [showNotification, setShowNotification] = useState(false);
  //establece severity de la notificacion que puede ser error o success
  const [severity, setSeverity] = useState("");
  //Usuario del contexto (padre de todos los componentes)
  const { user, setUser } = useContext(Context);
  //Si se ha modificado algún campo del form será true
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  //Para abrir el modal de cambio de password
  const [isOpenModalPwd, setIsOpenModalPwd] = useState(false);
  //Nuevos valores del user. Inicialmente son igual a los del user
  const [newValues, setNewValues] = useState({ ...user });
  //errores de los campos
  const [errors, setErrors] = useState({
    errorRegistration: "",
    errorName: "",
    errorLastName: "",
    errorEmail: "",
    errorPhoneNumber: "",
    errorBankAccount: "",
    errorImage: "",
  });
  const navigate = useNavigate();
  //key cryptojs
  const secretKeyCripto = "Muhammad";

  const ecryptStorage = (name, data) => {
    const encrypt = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      secretKeyCripto
    ).toString();

    localStorage.setItem(name, encrypt);
  };

  //Se ejecuta en la primera carga(array del final no tiene dependencias)
  useEffect(() => {
    //Se obtiene el usuario actual y se establece para el context y los valores del form de edit
    if (!localStorage.getItem("_ughVjkKj")) {
      navigate("/");
    }
  }, []);

  //Cuando se produce el evento change en los inputs...
  const handleOnChange = (e) => {
    //Obtener el nombre del input
    const nameInput = e.target.name;
    //Obtener el valor del input recortando los espacios del principio y el final
    const value = e.target.value.trim();

    //Modifica el estado de los nuevos valores del usuario con el nuevo contenido
    setNewValues((prevState) => ({
      //si extraen todos los valores anteriores...
      ...prevState,
      //Se establece el campo y su valor dinámicamente
      [nameInput]: value,
    }));

    //valida los valores
    validateValues(nameInput, value);
    //Establece la propiedad del button en false
    setButtonDisabled(false);
  };
  //Recibe el "name" del input y el valor y ejecuta la vliadación en consecuencia
  const validateValues = (nameInput, value) => {
    switch (nameInput) {
      case "registration":
        validateRegistration(nameInput, value);
        break;
      case "name":
        validateNombre(nameInput, value);
        break;
      case "lastName":
        validateLastName(nameInput, value);
        break;
      case "email":
        validateEmail(nameInput, value);
        break;
      case "phoneNumber":
        validatePhone(nameInput, value);
        break;
      case "bankAccount":
        validateBankAccount(nameInput, value);
        break;
      default:
        break;
    }
  };

  const validateRegistration = (nameInput, value) => {
    const REGEX_DNI = /^[0-9]{8,8}[A-Za-z]$/g;
    const nameError =
      "error" + nameInput.charAt(0).toUpperCase() + nameInput.slice(1);
    const input = document.querySelector('input[name="registration"]');

    if (!REGEX_DNI.test(value)) {
      setErrors((prevState) => ({
        ...prevState,
        [nameError]: "Formato dni mal",
      }));
    } else {
      setNewValues((prevState) => ({
        //si extraen todos los valores anteriores...
        ...prevState,
        //Se establece el campo y su valor dinámicamente
        [nameInput]: value,
      }));
      input.classList.add("valid");
      setErrors((prevState) => ({ ...prevState, [nameError]: "" }));
    }
  };

  const validateNombre = (nameInput, value) => {
    const nameError =
      "error" + nameInput.charAt(0).toUpperCase() + nameInput.slice(1);
    const input = document.querySelector('input[name="name"]');
    if (value.length < 2) {
      setErrors((prevState) => ({
        ...prevState,
        [nameError]: "El nombre debe ser mayor a dos carácteres",
      }));
    } else {
      setNewValues((prevState) => ({
        //si extraen todos los valores anteriores...
        ...prevState,
        //Se establece el campo y su valor dinámicamente
        [nameInput]: value,
      }));
      input.classList.add("valid");
      setErrors((prevState) => ({ ...prevState, [nameError]: "" }));
    }
  };
  const validateLastName = (nameInput, value) => {
    const nameError =
      "error" + nameInput.charAt(0).toUpperCase() + nameInput.slice(1);
    const input = document.querySelector('input[name="lastName"]');
    if (value.length < 2) {
      setErrors((prevState) => ({
        ...prevState,
        [nameError]: "El apellido/s debe ser mayor a dos carácteres",
      }));
    } else {
      setNewValues((prevState) => ({
        //si extraen todos los valores anteriores...
        ...prevState,
        //Se establece el campo y su valor dinámicamente
        [nameInput]: value,
      }));
      input.classList.add("valid");
      setErrors((prevState) => ({ ...prevState, [nameError]: "" }));
    }
  };
  const validateEmail = (nameInput, value) => {
    const REGEX_EMAIL =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    const nameError =
      "error" + nameInput.charAt(0).toUpperCase() + nameInput.slice(1);
    const input = document.querySelector('input[name="email"]');
    if (!REGEX_EMAIL.test(value)) {
      setErrors((prevState) => ({
        ...prevState,
        [nameError]: "Formato email mal",
      }));
    } else {
      setNewValues((prevState) => ({
        //si extraen todos los valores anteriores...
        ...prevState,
        //Se establece el campo y su valor dinámicamente
        [nameInput]: value,
      }));
      input.classList.add("valid");
      setErrors((prevState) => ({ ...prevState, [nameError]: "" }));
    }
  };
  const validatePhone = (nameInput, value) => {
    const REGEX_PHONE = /^\+?(6\d{2}|7[1-9]\d{1})\d{6}$/g;
    const nameError =
      "error" + nameInput.charAt(0).toUpperCase() + nameInput.slice(1);
    const input = document.querySelector('input[name="phoneNumber"]');
    if (!REGEX_PHONE.test(value)) {
      setErrors((prevState) => ({
        ...prevState,
        [nameError]: "Formato télefono mal",
      }));
    } else {
      setNewValues((prevState) => ({
        //si extraen todos los valores anteriores...
        ...prevState,
        //Se establece el campo y su valor dinámicamente
        [nameInput]: value,
      }));
      input.classList.add("valid");
      setErrors((prevState) => ({ ...prevState, [nameError]: "" }));
    }
  };
  const validateBankAccount = (nameInput, value) => {
    const nameError =
      "error" + nameInput.charAt(0).toUpperCase() + nameInput.slice(1);
    const input = document.querySelector('input[name="bankAccount"]');
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
    } else if (value.length > 18) {
      setErrors((prevState) => ({
        ...prevState,
        [nameError]: "Como maximo 18 numeros",
      }));
    } else {
      setNewValues((prevState) => ({
        //si extraen todos los valores anteriores...
        ...prevState,
        //Se establece el campo y su valor dinámicamente
        [nameInput]: value,
      }));
      input.classList.add("valid");
      setErrors((prevState) => ({ ...prevState, [nameError]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isAllOk = Object.values(errors).every((err) => err === "");
    //Si no hay errores
    if (isAllOk) {
      //Se elimina el token por que el dto no tiene nada de token (el token se establece al hacer login)
      //delete newValues.token;
      //valor para evitar el required del backend que luego se modifica por el correcto y siga funcionando el login
      newValues.password = "editedByBackend";
      newValues.image = document.querySelector("#user-image").src;
      //PETICIÓN PUT con los valores nuevos
      PutClient(newValues).then((response) => {
        //si el back retorna true en la propiedad isOk....
        if (response.isOk) {
          //establece el contexto con el usuario modificado
          setUser(response.client);
          //Añade el token del usuario
          response.client.token = user.token;
          //modifica el localstorage con el user nuevo(sin imagen para no cargar el localstorage)
          const userWithoutImage = { ...response.client };
          delete userWithoutImage.image;
          ecryptStorage("_ughVjkKj", userWithoutImage);
          //Para que al hacer submit muestre los *** en la cuenta bancaria (del back retorna con **)
          setNewValues((prevState) => ({
            ...prevState,
            bankAccount: response.client.bankAccount,
          }));
          //Establece el botón en disabled
          setButtonDisabled(true);
          //Muestra la notificación
          setShowNotification(true);
          //la version de en verde de succes
          setSeverity("success");
        } else {
          //Muestra la notificación
          setShowNotification(true);
          //la version de en rojo de error
          setSeverity("error");
        }
      });
    }
  };

  const handleImage = (fileList) => {
    if (fileList.length && typeof fileList !== "undefined") {
      if (fileList && fileList[0]["type"].split("/")[0] === "image") {
        const image = fileList[0];
        //
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.addEventListener("load", () => {
          document.querySelector("#user-image").src = reader.result;
          setButtonDisabled(false);
        });
      } else {
        setErrors((prevState) => ({
          ...prevState,
          errorImage: `Tipo no soportado: ${file[0].type}`,
        }));
      }
    } else {
      //cuando se pulsa en la X de cerrar
      setButtonDisabled(true);
      document.querySelector("#user-image").src =
        user.image ||
        `https://www.gravatar.com/avatar/EMAIL_MD5?d=https%3A%2F%2Fui-avatars.com%2Fapi%2F/${
          user.name
        }${
          user.lastName && user.lastName
        }/512/F4B408/fff/2/0.5/false/true/true`;
    }
  };

  const style = getComputedStyle(document.body);
  const primaryColor = style.getPropertyValue("--primary-color");

  return (
    //Si existe el usuario del contexto y en el localstorage renderiza el resto
    user &&
    localStorage.getItem("_ughVjkKj") && (
      <main className="main-user-page">
        <section className="user-page">
          <div className="emp-profile">
            <div className="row">
              <div className="wrapper-name">
                <div className="bg">
                  {user.name}{" "}
                  {user.lastName === "undefined" ? "" : user.lastName}
                </div>
                <div className="fg">
                  {user.name}{" "}
                  {user.lastName === "undefined" ? "" : user.lastName}
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-4 pt-md-4">
                <div className="profile-img">
                  {user.image && user.image ? (
                    <img
                      id="user-image"
                      className="rounded"
                      src={user.image ? `${user.image}` : ""}
                      alt={`foto ${user.name}`}
                      onClick={() => {
                        //click imagen abre el input:file
                        document.querySelector("input[type=file]").click();
                      }}
                    />
                  ) : (
                    <img
                      id="user-image"
                      onClick={() => {
                        //click imagen abre el input:file
                        document.querySelector("input[type=file]").click();
                      }}
                      src={`https://www.gravatar.com/avatar/EMAIL_MD5?d=https%3A%2F%2Fui-avatars.com%2Fapi%2F/${
                        user.name
                      }${
                        user.lastName ? "+" + user.lastName : ""
                      }/512/${primaryColor}/fff/2/0.5/false/true/true`}
                    />
                  )}
                  <div className="file ">
                    <FileSelector
                      placeholder="Cambiar imagen"
                      name="file"
                      onChange={handleImage}
                      error={errors.errorImage}
                      borderRadius="semi-rounded"
                    />
                  </div>
                </div>
                <Box sx={{ textAlign: "center", margin: "2rem 0 auto" }}>
                  <Button
                    label="Guardar Cambios"
                    variant="brand"
                    borderRadius="semi-rounded"
                    onClick={handleSubmit}
                    size="large"
                    style={{ color: "#fff" }}
                    disabled={isButtonDisabled}
                  />
                  <br />
                  <br />
                  <Button
                    label="Modificar Contraseña"
                    variant="brand"
                    borderRadius="semi-rounded"
                    onClick={() => {
                      //Abre modal de cambio de contraseña
                      setIsOpenModalPwd(!isOpenModalPwd);
                    }}
                    size="medium"
                    style={{ color: "#fff" }}
                  />
                </Box>
              </div>
              <div className="col-md-6 col-xl-5 h-100 datos">
                <div className="profile-head">
                  <div className="col-md-12 edit-form">
                    <form onSubmit={handleSubmit}>
                      <Input
                        label="Dni"
                        placeholder="45112560A"
                        type="text"
                        name="registration"
                        className="rainbow-p-around_medium"
                        borderRadius="semi-rounded"
                        value={newValues.registration}
                        onChange={handleOnChange}
                        onBlur={handleOnChange}
                        error={errors.errorRegistration}
                      />
                      <Input
                        label="Nombre"
                        placeholder="Jhon"
                        type="text"
                        name="name"
                        className="rainbow-p-around_medium"
                        borderRadius="semi-rounded"
                        value={newValues.name}
                        onChange={handleOnChange}
                        onBlur={handleOnChange}
                        error={errors.errorName}
                      />
                      <Input
                        label="Apellido/s"
                        placeholder="Doe"
                        type="text"
                        name="lastName"
                        className="rainbow-p-around_medium"
                        borderRadius="semi-rounded"
                        value={
                          newValues.lastName !== "undefined"
                            ? newValues.lastName
                            : ""
                        }
                        onChange={handleOnChange}
                        onBlur={handleOnChange}
                        error={errors.errorLastName}
                      />
                      <Input
                        label="Email"
                        placeholder="jhondoe@gmail.com"
                        type="text"
                        name="email"
                        className="rainbow-p-around_medium"
                        borderRadius="semi-rounded"
                        value={newValues.email}
                        onChange={handleOnChange}
                        onBlur={handleOnChange}
                        error={errors.errorEmail}
                      />
                      <Input
                        label="Telefono"
                        placeholder="686632589"
                        type="text"
                        name="phoneNumber"
                        className="rainbow-p-around_medium"
                        borderRadius="semi-rounded"
                        value={
                          newValues.phoneNumber !== 0
                            ? newValues.phoneNumber
                            : ""
                        }
                        onChange={handleOnChange}
                        onBlur={handleOnChange}
                        error={errors.errorPhoneNumber}
                      />
                      <Input
                        label="Cuenta Bancaria"
                        placeholder="16-18 numeros"
                        type="text"
                        name="bankAccount"
                        className="rainbow-p-around_medium"
                        borderRadius="semi-rounded"
                        value={newValues.bankAccount}
                        onClick={() => {
                          //elimina el valor con ********
                          setNewValues((prevState) => ({
                            ...prevState,
                            bankAccount: "",
                          }));
                        }}
                        onChange={handleOnChange}
                        onBlur={handleOnChange}
                        error={errors.errorBankAccount}
                      />
                      <input type="submit" value="" hidden />
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-md-12 mt-xl-12">
                <h1>RESERVAS</h1>
                {/* Tabla de RESERVAS */}
                <ReservationTable user={user} />
                {/* Modal de cambio password */}
                <EditPwd
                  isOpenModalPwd={isOpenModalPwd}
                  setIsOpenModalPwd={setIsOpenModalPwd}
                />
              </div>
            </div>
          </div>
        </section>
        <Notification
          open={showNotification}
          setShowNotification={setShowNotification}
          severity={"success"}
          caller={"userPage"}
        />
      </main>
    )
  );
}
