import React, { useState } from "react";
import { Tabset, Tab, ButtonGroup, ButtonIcon } from "react-rainbow-components";
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
import { GetBranches } from "./components/sucursales/BranchCrud";

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
          <Accordion>
            <AccordionSection label="GET SUSCURSALES">
              <GetBranches />
            </AccordionSection>
            <AccordionSection label="GET SUSCURSAL/{ID}">
              A rainbow is a meteorological phenomenon that is caused by
              reflection, refraction and dispersion of light in water droplets
              resulting in a spectrum of light appearing in the sky.
            </AccordionSection>
            <AccordionSection label="POST SUCURSAL">
              A rainbow is a meteorological phenomenon that is caused by
              reflection, refraction and dispersion of light in water droplets
              resulting in a spectrum of light appearing in the sky.
            </AccordionSection>
            <AccordionSection label="PUT SUCURSAL/{ID}">
              A rainbow is a meteorological phenomenon that is caused by
              reflection, refraction and dispersion of light in water droplets
              resulting in a spectrum of light appearing in the sky.
            </AccordionSection>
            <AccordionSection label="DELETE SUCURSAL/{ID}">
              A rainbow is a meteorological phenomenon that is caused by
              reflection, refraction and dispersion of light in water droplets
              resulting in a spectrum of light appearing in the sky.
            </AccordionSection>
          </Accordion>
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
          <Accordion>
            <AccordionSection label="GET COCHES">
              A rainbow is a meteorological phenomenon that is caused by
              reflection, refraction and dispersion of light in water droplets
              resulting in a spectrum of light appearing in the sky.
            </AccordionSection>
            <AccordionSection label="GET COCHE/{ID}">
              A rainbow is a meteorological phenomenon that is caused by
              reflection, refraction and dispersion of light in water droplets
              resulting in a spectrum of light appearing in the sky.
            </AccordionSection>
            <AccordionSection label="POST COCHE">
              A rainbow is a meteorological phenomenon that is caused by
              reflection, refraction and dispersion of light in water droplets
              resulting in a spectrum of light appearing in the sky.
            </AccordionSection>
            <AccordionSection label="PUT COCHE/{ID}">
              A rainbow is a meteorological phenomenon that is caused by
              reflection, refraction and dispersion of light in water droplets
              resulting in a spectrum of light appearing in the sky.
            </AccordionSection>
            <AccordionSection label="DELETE COCHE/{ID}">
              A rainbow is a meteorological phenomenon that is caused by
              reflection, refraction and dispersion of light in water droplets
              resulting in a spectrum of light appearing in the sky.
            </AccordionSection>
          </Accordion>
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
          <Accordion>
            <AccordionSection label="GET CLIENTES">
              A rainbow is a meteorological phenomenon that is caused by
              reflection, refraction and dispersion of light in water droplets
              resulting in a spectrum of light appearing in the sky.
            </AccordionSection>
            <AccordionSection label="GET CLIENTE/{ID}">
              A rainbow is a meteorological phenomenon that is caused by
              reflection, refraction and dispersion of light in water droplets
              resulting in a spectrum of light appearing in the sky.
            </AccordionSection>
            <AccordionSection label="POST CLIENTE">
              A rainbow is a meteorological phenomenon that is caused by
              reflection, refraction and dispersion of light in water droplets
              resulting in a spectrum of light appearing in the sky.
            </AccordionSection>
            <AccordionSection label="PUT CLIENTE/{ID}">
              A rainbow is a meteorological phenomenon that is caused by
              reflection, refraction and dispersion of light in water droplets
              resulting in a spectrum of light appearing in the sky.
            </AccordionSection>
            <AccordionSection label="DELETE CLIENTE/{ID}">
              A rainbow is a meteorological phenomenon that is caused by
              reflection, refraction and dispersion of light in water droplets
              resulting in a spectrum of light appearing in the sky.
            </AccordionSection>
          </Accordion>
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
          <Accordion>
            <AccordionSection label="GET RESERVAS">
              A rainbow is a meteorological phenomenon that is caused by
              reflection, refraction and dispersion of light in water droplets
              resulting in a spectrum of light appearing in the sky.
            </AccordionSection>
            <AccordionSection label="GET RESERVA/{ID}">
              A rainbow is a meteorological phenomenon that is caused by
              reflection, refraction and dispersion of light in water droplets
              resulting in a spectrum of light appearing in the sky.
            </AccordionSection>
            <AccordionSection label="POST RESERVAS">
              A rainbow is a meteorological phenomenon that is caused by
              reflection, refraction and dispersion of light in water droplets
              resulting in a spectrum of light appearing in the sky.
            </AccordionSection>
            <AccordionSection label="PUT RESERVA/{ID}">
              A rainbow is a meteorological phenomenon that is caused by
              reflection, refraction and dispersion of light in water droplets
              resulting in a spectrum of light appearing in the sky.
            </AccordionSection>
            <AccordionSection label="DELETE RESERVA/{ID}">
              A rainbow is a meteorological phenomenon that is caused by
              reflection, refraction and dispersion of light in water droplets
              resulting in a spectrum of light appearing in the sky.
            </AccordionSection>
          </Accordion>
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
