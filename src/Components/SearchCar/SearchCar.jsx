import { useState } from "react";
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
  const [bookingDates, setBookingDates] = useState();
  const [age, setAge] = useState(2);
  const [checkTwoBranches, setCheckTwoBranches] = useState(false);
  const [errors, setErrors] = useState({
    errrorBranch1: "",
    errrorBranch2: "",
    errrorDates: "",
  });

  function validateValues(branch, bookingDates, age) {
    //console.log(bookingDates);
    //console.log(age);

    if (!branch) {
      console.log(branch);
      /* setErrors({
        errors: {
          errrorBranch1: "Errorrrrrr",
        },
      }); */
      /* this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          errrorBranch1: "Introduce una direccion de correo electrónico",
        },
      })); */
    }

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
          setBranch={setBranch}
          name={"recogida"}
          errrorBranch1={errors.errrorBranch1}
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
            <ComboBoxBranches setBranch={setBranch} name={"devolución"} />
          </>
        )}
        <label
          style={{ width: "100%", textAlign: "center", marginTop: "1.4rem" }}
        >
          <span style={{ color: "red" }}>*</span> Fechas de reserva
        </label>
        <DateRange setBookingDates={setBookingDates} />
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
              validateValues(branch, bookingDates, age);
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
