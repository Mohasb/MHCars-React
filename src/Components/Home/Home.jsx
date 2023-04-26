//import { Link } from "react-router-dom";
import ResponsiveAppBar from "../NavBar/NavBar";
import "./Home.scss";
import ComboBox from "../ComboBox/ComboBox";
import { useState } from "react";
import DatePicker from "../DatePicker/DataPicker";
import { BorderRadiusRadioButtonGroup } from "../AgePicker/AgePicker";
import { Button, Application } from "react-rainbow-components";
export const Home = () => {
  const [branchId, setBranchId] = useState();

  const themeRainbow = {
    rainbow: {
      palette: {
        brand: "#F4B408",
      },
    },
  };
  const containerStyles = {
    maxWidth: 400,
  };


  return (
    <>
      {/* <nav>
            <ul>
                <li>
                    <Link to={"/"}>Home</Link>
                </li>
                <li>
                    <Link to={"/oficinas"}>Oficinas</Link>
                </li>
                <li>
                    <Link to={"/flota"}>Coches</Link>
                </li>
                <li>
                    <Link to={"/servicios"}>Servicios</Link>
                </li>
                <li>
                    <Link to={"/acceso"}>Acceso</Link>
                </li>
                <li>
                    <Link to={"/admin"}>Admin</Link>
                </li>
            </ul>
        </nav> */}
      {console.log(branchId)}
      {/* /////////////////////////////////////////////////////MATERIAL UI////////////////////////////////////////////////// */}
      <ResponsiveAppBar />
      {/* /////////////////////////////////////////////////////RAINBOW////////////////////////////////////////////////// */}
      <div
          className="rainbow-align-content_center rainbow-m-vertical_large rainbow-p-horizontal_small rainbow-m_auto"
          style={containerStyles}
        >
      <Application theme={themeRainbow}>
        <h1>Alquiler de coches</h1>
        <ComboBox setBranchId={setBranchId} />
        <DatePicker/>
        <div className="d-flex flex-column justify-content-center">
        <BorderRadiusRadioButtonGroup />
        <br />
        <Button
          variant="brand"
          className="rainbow-m-around_medium "
          size="large"
          borderRadius="semi-rounded"
          onClick={() => {alert("Datos")}}
        >
          Buscar
        </Button>

        </div>
      </Application>

        </div>
    </>
  );
};
