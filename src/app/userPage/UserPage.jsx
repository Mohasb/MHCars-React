import { useContext, useEffect, useState } from "react";
import Context from "../../Services/contextUser/ContextUser";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "react-rainbow-components";
import Box from "@mui/material/Box";

import "./style.scss";
import ReservationTable from "./ReservationTable";
import authService from "./../../services/login/auth.service";
import { PutClient } from "../../services/apiRequest/PutClient";
import EditPwd from "./../../components/modals/EditPassworModal";

export default function UserPage(props) {
  const { user, setUser } = useContext(Context);
  const navigate = useNavigate();
  const [isModified, setIsModified] = useState(false);
  const [isOpenModalPwd, setIsOpenModalPwd] = useState(false);

  const [newValues, setNewValues] = useState({ ...user });
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setUser(user);
    }
    setNewValues(JSON.parse(JSON.stringify(user)));
  }, []);

  const handleOnChange = (e) => {
    const nameInput = e.target.name;
    const value = e.target.value.trim();
    setNewValues((prevState) => ({
      ...prevState,
      [nameInput]: value,
    }));
    setIsModified(true);
  };

  const handleSubmit = () => {
    PutClient(newValues).then((response) => {
      if (response.isOk) {
        setIsModified(false);
        setUser(response.client);
        response.client.token = user.token;
        localStorage.setItem("user", JSON.stringify(response.client));
        setNewValues((prevState) => ({
          ...prevState,
          bankAccount: response.client.bankAccount,
        }));
      }
    });
  };

  return (
    user &&
    localStorage.getItem("user") && (
      <main>
        <section className="user-page">
          <h1>User Page</h1>
          <h1>{JSON.stringify(user)}</h1>
          <div className="emp-profile">
            <div className="row">
              <div className="col-md-6 col-xl-2">
                <div className="profile-img">
                  <img
                    className="rounded"
                    src="https://i.pravatar.cc/300?u=fakeee@pravatar.com"
                    alt=""
                    onClick={() => {
                      document.querySelector("input[type=file]").click();
                    }}
                  />
                  <div className="file btn btn-lg btn-primary rounded">
                    Cambiar foto
                    <input type="file" name="file" />
                  </div>
                </div>
                <Box sx={{ textAlign: "center", margin: "2rem 0 auto" }}>
                  <Button
                    label="Modificar Contraseña"
                    variant="brand"
                    borderRadius="semi-rounded"
                    onClick={() => {
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
                    {/* aqui form edición */}
                    <form>
                      <Input
                        label="Dni"
                        placeholder="45112560A"
                        type="text"
                        name="registration"
                        className="rainbow-p-around_medium"
                        borderRadius="semi-rounded"
                        value={newValues.registration}
                        onChange={handleOnChange}
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
                      />
                      <Input
                        label="Apellido/s"
                        placeholder="Doe"
                        type="text"
                        name="lastName"
                        className="rainbow-p-around_medium"
                        borderRadius="semi-rounded"
                        value={newValues.lastName}
                        onChange={handleOnChange}
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
                      />
                      <Input
                        label="Telefono"
                        placeholder="jhondoe@gmail.com"
                        type="text"
                        name="phone"
                        className="rainbow-p-around_medium"
                        borderRadius="semi-rounded"
                        value={newValues.phoneNumber}
                        onChange={handleOnChange}
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
                          setNewValues((prevState) => ({
                            ...prevState,
                            bankAccount: "",
                          }));
                        }}
                        onChange={handleOnChange}
                      />
                      <Box
                        sx={{
                          textAlign: "center",
                          margin: "1rem 2rem auto auto",
                        }}
                      >
                        <Button
                          label="Guardar Cambios"
                          variant="brand"
                          borderRadius="semi-rounded"
                          onClick={handleSubmit}
                          size="medium"
                          style={{ color: "#fff" }}
                          disabled={!isModified}
                        />
                      </Box>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-xl-5 mt-xl-4">
                <h1>RESERVAS</h1>
                <ReservationTable />
                <EditPwd isOpen={isOpenModalPwd} />
              </div>
            </div>
          </div>
        </section>
      </main>
    )
  );
}
