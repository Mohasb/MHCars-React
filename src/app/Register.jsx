import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-rainbow-components";
import { Input } from "react-rainbow-components";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export default function RegisterModal(props) {
  const [isOpen, setIsOpen] = useState(props.openRegister);
  const [formData, setFormData] = useState({
    dni: "",
    nombre: "",
    apellido1: "",
    apellido2: "",
    email: "",
    passwor: "",
    confirmationPassword: "",
    telefono: "",
    BankAccount: "",
  });


  const handleOnClose = () => {
    elevateToParent(false)
    setIsOpen(false);
  };
  const elevateToParent = (state) => {
    props.setOpenRegister(state);
  };

  const handleSubmit = (e) => {
    console.log(formData);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <div className="rainbow-m-bottom_xx-large rainbow-p-bottom_xx-large visually-hidden">
      <Modal
        id="modal-2"
        isOpen={isOpen}
        onRequestClose={handleOnClose}
        title="Registro"
        footer={
          <div className="rainbow-flex rainbow-justify_end">
            <Button
              className="rainbow-m-right_large"
              label="Cancel"
              variant="neutral"
              onClick={handleOnClose}
            />
            <Button label="Save" variant="brand" onClick={handleSubmit} />
          </div>
        }
      >
        <Box sx={{ width: "100%" }}>
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
                size="medium"
                borderRadius="semi-rounded"
                name="nombre"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                label="Email"
                placeholder="inputEmail@gmail.com"
                type="email"
                size="medium"
                name="email"
                borderRadius="semi-rounded"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                label="Primer Apellido"
                placeholder="Primer Apellido"
                type="text"
                size="medium"
                name="apellidos"
                borderRadius="semi-rounded"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                label="Telefono"
                placeholder="111-111-1111"
                type="tel"
                size="medium"
                name="telefono"
                borderRadius="semi-rounded"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                label="Segundo Apellido"
                placeholder="Segundo Apellido"
                type="text"
                size="medium"
                name="apellido2"
                borderRadius="semi-rounded"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                label="Password"
                placeholder="**********"
                type="password"
                size="medium"
                name="password"
                borderRadius="semi-rounded"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                label="DNI"
                placeholder="DNI"
                type="text"
                size="medium"
                borderRadius="semi-rounded"
                name="dni"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                label="Confirmación Password"
                placeholder="**********"
                type="password"
                size="medium"
                name="password"
                borderRadius="semi-rounded"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                label="Tarjeta De Credito"
                placeholder="111-111-1111"
                type="text"
                size="medium"
                name="credito"
                borderRadius="semi-rounded"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
