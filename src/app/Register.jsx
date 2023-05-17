import React, { useState } from "react";
import {Button } from "react-rainbow-components";
import { Input } from "react-rainbow-components";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import "./style.module.css";

export default function Register() {
  const [formData, setFormData] = useState({
    dni: "",
    nombre: "",
    email: "",
    password: "",
    confirmationPassword: "",
    BankAccount: "",
  });

  const handleSubmit = (e) => {
    console.log(formData);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  return (
    <main>

      <div className="card">
        <h1 className="title">Designed For Work</h1>
        <Box sx={{ width: "100%" }} className="box">
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
                label="Tarjeta De Credito"
                placeholder="111-111-1111"
                type="text"
                size="medium"
                name="BankAccount"
                borderRadius="semi-rounded"
                value={formData.name}
                onChange={handleChange}
                error="Error"
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                label="Confirmación Password"
                placeholder="**********"
                type="password"
                size="medium"
                name="confirmationPassword"
                borderRadius="semi-rounded"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Box sx={{ textAlign:"center", margin: "2rem 0 auto"}}>
          <Button
            label="Registrarse"
            variant="brand"
            borderRadius="semi-rounded"
            onClick={handleSubmit}
            size="large"
          />
          </Box>
        </Box>
      </div>
    </main>
  );
}
