import React, { useState } from "react";
import { Tabset, Tab } from "react-rainbow-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faCar,
  faShop,
  faPerson,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Accordion, AccordionSection } from "react-rainbow-components";
import "./style.scss";
import SetAdmin from "./components/extras/SetAdmin";
import Login from "./components/extras/Login";
import CarsByBranch from "./components/extras/CarsByBranch";
import CarsAvailables from "./components/extras/CarsAvailables";
import ReservationByClient from "./components/extras/ReservationClient";
import { CrudTable } from "./components/sucursales/BranchCrud";

const StyledHeader = styled.div.attrs((props) => {
  return props.theme.rainbow.palette;
})`
  color: ${(props) => props.text.main};
`;

const StyledTabContent = styled.div.attrs((props) => {
  return props.theme.rainbow.palette;
})`
  background: ${(props) => props.background.main};
  color: ${(props) => props.text.label};
  height: 200px;
  border-radius: 0 0 0.875rem 0.875rem;
`;

export default function TabsAdmin() {
  const [selected, setSelected] = useState("sucursales");

  const handleOnSelect = (event, selected) => {
    setSelected(selected);
  };

  const getTabContent = () => {
    if (selected === "sucursales") {
      return (
        <StyledTabContent
          aria-labelledby="sucursales"
          id="primaryTab"
          className="rainbow-p-around_xx-large rainbow-font-size-text_large rainbow-align-text-center"
        >
          <CrudTable
            endPoint={"Branches"}
            headers={["id", "cif", "nombre", "dirección", "país", "población"]}
            fields={["id", "cif", "name", "address", "country", "population"]}
          />
        </StyledTabContent>
      );
    }
    if (selected === "coches") {
      return (
        <StyledTabContent
          aria-labelledby="coches"
          id="recentsTab"
          className="rainbow-p-around_xx-large rainbow-font-size-text_large rainbow-align-text-center"
        >
          <CrudTable
            endPoint={"cars"}
            headers={[
              "id",
              "id sucursal",
              "matricula",
              "categoría",
              "marca",
              "modelo",
              "cambio",
              "combustible",
              "imagen",
            ]}
            fields={[
              "id",
              "branchId",
              "registration",
              "category",
              "brand",
              "model",
              "gearShiftType",
              "fuelType",
              "image",
            ]}
          />
        </StyledTabContent>
      );
    }
    if (selected === "clientes") {
      return (
        <StyledTabContent
          aria-labelledby="clientes"
          id="sharedTab"
          className="rainbow-p-around_xx-large rainbow-font-size-text_large rainbow-align-text-center"
        >
          <CrudTable
            endPoint={"clients"}
            headers={[
              "id",
              "registration",
              "Nombre",
              "apellidos",
              "email",
              "telefono",
              "Cuenta",
              "permisos",
              "imagen",
            ]}
            fields={[
              "id",
              "registration",
              "name",
              "lastName",
              "email",
              "phoneNumber",
              "bankAccount",
              "rol",
              //"image",
            ]}
          />
        </StyledTabContent>
      );
    }
    if (selected === "reservas") {
      return (
        <StyledTabContent
          aria-labelledby="reservas"
          id="sharedTab"
          className="rainbow-p-around_xx-large rainbow-font-size-text_large rainbow-align-text-center"
        >
          <CrudTable
            endPoint={"reservations"}
            headers={[
              "id",
              "id sucursal",
              "id sucursal retorno",
              "fecha inicio",
              "fecha fin",
              "id coche",
              "categoria",
              "Cliente",
            ]}
            fields={[
              "id",
              "branchId",
              "returnBranchId",
              "startDate",
              "endDate",
              "carId",
              "carCategory",
              "clientId",
            ]}
          />
        </StyledTabContent>
      );
    }
    return (
      <StyledTabContent
        aria-labelledby="EXTRAS"
        id="sharedTab"
        className="rainbow-p-around_xx-large rainbow-font-size-text_large rainbow-align-text-center"
      >
        <Accordion>
          <AccordionSection label="SET ADMIN/{EMAIL}">
            <SetAdmin />
          </AccordionSection>
          <AccordionSection label="LOGIN/{EMAIL}">
            <Login />
          </AccordionSection>
          <AccordionSection label="COCHES POR SUCURSAL/{ID}">
            <CarsByBranch />
          </AccordionSection>
          <AccordionSection label="COCHES DISPONIBLES/{ID}/{START}/{END}">
            <CarsAvailables />
          </AccordionSection>
          <AccordionSection label="RESERVAS POR CLIENTE/{ID}">
            <ReservationByClient />
          </AccordionSection>
        </Accordion>
      </StyledTabContent>
    );
  };
  return (
    <div>
      <div className="rainbow-p-around_large rainbow-align-content_space-between">
        <StyledHeader className="rainbow-font-size-heading_medium rainbow-color_dark-1">
          PANEL ADMINISTRADOR
        </StyledHeader>
      </div>
      <div className="rainbow-flex rainbow-flex_column rainbow_vertical-stretch">
        <Tabset
          fullWidth
          id="tabset-2"
          onSelect={handleOnSelect}
          activeTabName={selected}
          className="rainbow-p-horizontal_x-large"
        >
          <Tab
            name="sucursales"
            label={
              <span>
                <FontAwesomeIcon icon={faShop} /> SUCURSALES
              </span>
            }
          />

          <Tab
            name="coches"
            label={
              <span>
                <FontAwesomeIcon icon={faCar} /> COCHES
              </span>
            }
          />

          <Tab
            name="clientes"
            label={
              <span>
                <FontAwesomeIcon icon={faPerson} /> CLIENTES
              </span>
            }
          />

          <Tab
            name="reservas"
            label={
              <span>
                <FontAwesomeIcon icon={faCalendarCheck} /> RESERVAS
              </span>
            }
          />
          <Tab
            name="extras"
            label={
              <span>
                <FontAwesomeIcon icon={faCog} /> EXTRAS
              </span>
            }
          />
        </Tabset>
        {getTabContent()}
      </div>
    </div>
  );
}
