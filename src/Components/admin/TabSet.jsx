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
`;

export default function TabsAdmin() {
  const [selected, setSelected] = useState("sucursales");
  const navigate = useNavigate();
  const handleOnSelect = (event, selected) => {
    setSelected(selected);
  };

  useEffect(() => {
    const secretKeyCripto = "Muhammad";

    const isADmin = () => {
      const encrypt = localStorage.getItem("_ughVjkKj");
      const decrypt = CryptoJS.AES.decrypt(
        encrypt.toString(),
        secretKeyCripto
      ).toString(CryptoJS.enc.Utf8);

      //firefox and chrome don´t work the same with cryptojs(chrome remove \ automatic and firefox no)
      if (typeof JSON.parse(decrypt) === "string") {
        //Firefox
        return JSON.parse(JSON.parse(decrypt)).rol === "Admin";
      } else {
        //Chrome
        return JSON.parse(decrypt).rol === "Admin";
      }
    };

    if (!localStorage.getItem("_ughVjkKj") || !isADmin()) {
      navigate("/");
    }
  }, [navigate]);

  const getTabContent = () => {
    if (selected === "sucursales") {
      return (
        <StyledTabContent
          aria-labelledby="sucursales"
          id="primaryTab"
          className="tab rainbow-p-around_xx-large rainbow-font-size-text_large rainbow-align-text-center"
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
          className="tab rainbow-p-around_xx-large rainbow-font-size-text_large rainbow-align-text-center"
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
          className="tab rainbow-p-around_xx-large rainbow-font-size-text_large rainbow-align-text-center"
        ></StyledTabContent>
      );
    }
    if (selected === "reservas") {
      return (
        <StyledTabContent
          aria-labelledby="reservas"
          id="sharedTab"
          className="tab rainbow-p-around_xx-large rainbow-font-size-text_large rainbow-align-text-center"
        ></StyledTabContent>
      );
    }
    return (
      <StyledTabContent
        aria-labelledby="EXTRAS"
        id="sharedTab"
        className="tab rainbow-p-around_xx-large rainbow-font-size-text_large rainbow-align-text-center"
      >
        {/* Aquiiiiiiiiiiiiiiiii */}
      </StyledTabContent>
    );
  };
  return (
    <div className="container-admin">
      <div className=" rainbow-p-around_large rainbow-align-content_space-between">
        <StyledHeader className="header-admin rainbow-font-size-heading_medium rainbow-color_dark-1">
          PANEL ADMINISTRADOR
        </StyledHeader>
      </div>
      <div className="container-tabset rainbow-flex rainbow-flex_column rainbow_vertical-stretch">
        <Tabset
          fullWidth
          id="tabset-2"
          onSelect={handleOnSelect}
          activeTabName={selected}
          className="rainbow-p-horizontal_x-large"
        >
          <Tab
            name="sucursales"
            className="tab"
            label={
              <span>
                <FontAwesomeIcon icon={faShop} /> SUCURSALES
              </span>
            }
          />

          <Tab
            name="coches"
            className="tab"
            label={
              <span>
                <FontAwesomeIcon icon={faCar} /> COCHES
              </span>
            }
          />

          <Tab
            name="clientes"
            className="tab"
            label={
              <span>
                <FontAwesomeIcon icon={faPerson} /> CLIENTES
              </span>
            }
          />

          <Tab
            name="reservas"
            className="tab"
            label={
              <span>
                <FontAwesomeIcon icon={faCalendarCheck} /> RESERVAS
              </span>
            }
          />
          <Tab
            name="extras"
            className="tab"
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
