import React, { useEffect, useState } from "react";
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
import "./style.scss";
import BranchCrud from "./components/CrudTables/BranchCrud";
import CarsCrud from "./components/CrudTables/CarsCrud";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";


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
  const navigate = useNavigate();
  const handleOnSelect = (event, selected) => {
    setSelected(selected);
  };

  useEffect(() => {
    const secretKeyCripto = "Muhammad";
    const encrypt = localStorage.getItem("_ughVjkKj");
    const decrypt = CryptoJS.AES.decrypt(
      encrypt.toString(),
      secretKeyCripto
    ).toString(CryptoJS.enc.Utf8);

    if (
      !localStorage.getItem("_ughVjkKj") ||
      JSON.parse(JSON.parse(decrypt)).rol !== "Admin"
    ) {
      navigate("/");
    }
  }, []);

  const getTabContent = () => {
    if (selected === "sucursales") {
      return (
        <StyledTabContent
          aria-labelledby="sucursales"
          id="primaryTab"
          className="rainbow-p-around_xx-large rainbow-font-size-text_large rainbow-align-text-center"
        >
          <BranchCrud />
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
          <CarsCrud />
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
          {/* Aquiiiiiiiiiiiiiiiii */}
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
          {/* Aquiiiiiiiiiiiiiiiii */}
        </StyledTabContent>
      );
    }
    return (
      <StyledTabContent
        aria-labelledby="EXTRAS"
        id="sharedTab"
        className="rainbow-p-around_xx-large rainbow-font-size-text_large rainbow-align-text-center"
      >
        {/* Aquiiiiiiiiiiiiiiiii */}
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
