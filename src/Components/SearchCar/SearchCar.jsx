import { useState, useRef } from "react";
//Components
import DateRange from "./Components/DateRange";
import AgeRadioButtons from "./Components/AgePicker";
import ComboBoxBranches from "./Components/ComboBox";
import CheckBoxTwoBranches from "./Components/CheckBox";
//React-Rainbow
import { Button, Application } from "react-rainbow-components";
import { themeRainbow } from "../ThemeRainbow";
//Material-UI
import Box from "@mui/material/Box";

export const SearchCar = ({ setCars, setBooking }) => {
  const [branch, setBranch] = useState();
  const [returnBranch, setReturnBranch] = useState();
  const [bookingDates, setBookingDates] = useState();
  const [age, setAge] = useState(2);
  const [checkTwoBranches, setCheckTwoBranches] = useState(false);
  const [errorBranch1, setErrorBranch1] = useState();
  const [errorBranch2, setErrorBranch2] = useState();
  const [errorDates, setErrorDates] = useState();

  function validateValues(branch, returnBranch, bookingDates, age) {
    //error pickup Branch
    if (!branch) {
      setErrorBranch1("Seleciona una sucursal de recogida");
    }
    //errors range dates
    if (typeof bookingDates.range === "undefined") {
      setErrorDates("Selecciona las fechas de la reserva");
    } else if (bookingDates.range.length == 1) {
      setErrorDates("Falta seleccionar la fecha de entrega");
    }
    //error return Branch
    if (checkTwoBranches && !returnBranch) {
      setErrorBranch2("Selecciona una sucursal de devolución");
    }

    if (!checkTwoBranches) {
      if (
        typeof branch !== "undefined" &&
        typeof bookingDates.range !== "undefined" &&
        bookingDates.range.length == 2
      ) {
        //format data
        bookingDates = {
          startDate: bookingDates.range[0].toISOString().split("T")[0],
          endDate: bookingDates.range[1].toISOString().split("T")[0],
        };

        const consulta = { branch, bookingDates, age };

        fetch(
          `http://localhost:5134/api/Custom/getCarsAvailables/${consulta.branch.id}/${consulta.bookingDates.startDate}/${consulta.bookingDates.endDate}/${consulta.age}`
        )
          .then((response) => {
            return response.json();
          })
          .then((cars) => {
            setCars([...cars]);
            setBooking(consulta);
          });
      }
    } else {
      if (
        typeof branch !== "undefined" &&
        typeof returnBranch !== "undefined" &&
        typeof bookingDates.range !== "undefined" &&
        bookingDates.range.length == 2
      ) {
        //format data
        bookingDates = {
          startDate: bookingDates.range[0].toISOString().split("T")[0],
          endDate: bookingDates.range[1].toISOString().split("T")[0],
        };

        const consulta = { branch, returnBranch, bookingDates, age };

        fetch(
          `http://localhost:5134/api/Custom/getCarsAvailables/${consulta.branch.id}/${consulta.bookingDates.startDate}/${consulta.bookingDates.endDate}/${consulta.age}`
        )
          .then((response) => {
            return response.json();
          })
          .then((cars) => {
            setCars([...cars]);
            setBooking(consulta);
          });
      }
    }
  }

  return (
    <div
      className="rainbow-align-content_center rainbow-m-vertical_large rainbow-p-horizontal_small rainbow-m_auto"
      style={containerStyles}
    >
      <Application theme={themeRainbow}>
        <h1 style={{ textAlign: "center" }}>Alquiler de coches</h1>
        <label
          style={{ width: "100%", textAlign: "center", marginTop: "1.4rem" }}
        >
          <span style={{ color: "red" }}>*</span> Sucursal de recogida
        </label>
        <ComboBoxBranches
          name={"recogida"}
          setBranch={setBranch}
          errorBranch1={errorBranch1}
          setErrorBranch1={setErrorBranch1}
        />

        <CheckBoxTwoBranches setCheckTwoBranches={setCheckTwoBranches} />
        {checkTwoBranches && (
          <>
            <label
              style={{
                width: "100%",
                textAlign: "center",
              }}
            >
              <span style={{ color: "red" }}>*</span> Sucursal de devolucion
            </label>
            <ComboBoxBranches
              name={"devolución"}
              setReturnBranch={setReturnBranch}
              errorBranch2={errorBranch2}
              setErrorBranch2={setErrorBranch2}
            />
          </>
        )}
        <label
          style={{ width: "100%", textAlign: "center", marginTop: "1.4rem" }}
        >
          <span style={{ color: "red" }}>*</span> Fechas de reserva
        </label>
        <DateRange
          setBookingDates={setBookingDates}
          errorDates={errorDates}
          setErrorDates={setErrorDates}
        />
        <br />
        <label style={{ width: "100%", textAlign: "center" }}>
          <span style={{ color: "red" }}>*</span> Edad del conductor
        </label>
        <AgeRadioButtons setAge={setAge} />
        <Box textAlign="center">
          <Button
            variant="brand"
            className="rainbow-m-around_medium "
            size="large"
            borderRadius="semi-rounded"
            onClick={() => {
              validateValues(branch, returnBranch, bookingDates, age);
            }}
          >
            Buscar
          </Button>
        </Box>
      </Application>
    </div>
  );
};
const containerStyles = {
  maxWidth: 400,
};
