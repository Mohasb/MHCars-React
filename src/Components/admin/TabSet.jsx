import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faCar,
  faShop,
  faPerson,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
import BranchCrud from "./components/CrudTables/BranchCrud";
import CarsCrud from "./components/CrudTables/CarsCrud";
import ClientsCrud from "./components/CrudTables/ClientsCrud";
import ReservationsCrud from "./components/CrudTables/ReservationCrud";
import Extras from "./components/CrudTables/Extras";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabsAdmin() {
  const [value, setValue] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const secretKeyCripto = "Muhammad";

    const isAdmin = () => {
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

    if (!localStorage.getItem("_ughVjkKj") || !isAdmin()) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="container-admin">
      <Box sx={{ width: "95%", margin: "auto" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          //centered
          aria-label="tabs"
          textColor="primary"
          indicatorColor="primary"
          className="tabs-container"
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
        >
          <Tab
            icon={<FontAwesomeIcon icon={faShop} />}
            label="SUCURSALES"
            {...a11yProps(0)}
          />
          <Tab
            icon={<FontAwesomeIcon icon={faCar} />}
            label="COCHES"
            {...a11yProps(1)}
          />
          <Tab
            icon={<FontAwesomeIcon icon={faPerson} />}
            label="CLIENTES"
            {...a11yProps(2)}
          />
          <Tab
            icon={<FontAwesomeIcon icon={faCalendarCheck} />}
            label="RESERVAS"
            {...a11yProps(3)}
          />
          <Tab
            icon={<FontAwesomeIcon icon={faCog} />}
            label="EXTRAS"
            {...a11yProps(4)}
          />
        </Tabs>
        <TabPanel value={value} index={0}>
          <BranchCrud />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CarsCrud />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ClientsCrud />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ReservationsCrud />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Extras />
        </TabPanel>
      </Box>
    </div>
  );
}
