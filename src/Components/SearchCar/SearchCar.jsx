import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//Components
import DateRange from "./Components/DateRange";
import AgeRadioButtons from "./Components/AgePicker";
import ComboBoxBranches from "./Components/ComboBox";
import CheckBoxTwoBranches from "./Components/CheckBox";
//React-Rainbow
import { Button, Application } from "react-rainbow-components";
import { themeRainbow } from "../Theme/ThemeRainbow";
//Material-UI
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
//Fetch
import { fetchCars } from "../../Services/SearchCarServices";
import Time from "./Components/TimePicker";

export const SearchCar = () => {
  //State of branch select
  const [branch, setBranch] = useState();
  //State from retunBranch select
  const [returnBranch, setReturnBranch] = useState();
  //State of dates from DataPicker
  const [bookingDates, setBookingDates] = useState();
  //State of age radio buttons
  const [age, setAge] = useState(2);
  //State of checkbox
  const [areCheckTwoBranches, setCheckTwoBranches] = useState(false);
  //State of errors inputs
  const [errorBranch1, setErrorBranch1] = useState();
  const [errorBranch2, setErrorBranch2] = useState();
  const [errorDates, setErrorDates] = useState();
  //to navigate to other routes
  const navigate = useNavigate();
  //to sessionStorage
  const [cars, setCars] = useState([]);
  const [booking, setBooking] = useState([]);

  const [pickupTime, setPickupTime] = useState("12:00");
  const [returnTime, setReturnTime] = useState("12:00");




  useEffect(() => {
    if (cars.length && booking) {
      sessionStorage.setItem("data", JSON.stringify({ cars, booking }));
      navigate("/reserva/coche");
    }
  }, [cars, booking, navigate]);

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function validateValues(branch, returnBranch, bookingDates, age) {
    errorHandler();
    fetchData(
      areCheckTwoBranches,
      branch,
      returnBranch,
      bookingDates,
      age
    );
  }

  return (
    <div
      className="rainbow-align-content_center rainbow-m-vertical_large rainbow-p-horizontal_small rainbow-m_auto"
      style={containerStyles}
    >
      <Application theme={themeRainbow}>
        <Stack
          spacing={0}
          direction={{ xs: "column", sm: "row" }}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <ComboBoxBranches
            name={"recogida"}
            setBranch={setBranch}
            errorBranch1={errorBranch1}
            setErrorBranch1={setErrorBranch1}
          />
          {areCheckTwoBranches && <Time name="Recogida" setPickupTime={setPickupTime}/>}
        </Stack>
        {!areCheckTwoBranches && (
          <Stack
            spacing={0}
            direction={{ xs: "row", sm: "row" }}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: "1rem",
            }}
          >
            <Time name="recogida" setPickupTime={setPickupTime}/>
            <Time name="devolución" setReturnTime={setReturnTime}/>
          </Stack>
        )}
        <CheckBoxTwoBranches setCheckTwoBranches={setCheckTwoBranches} />
        {areCheckTwoBranches && (
          <Stack
            spacing={0}
            direction={{ xs: "column", sm: "row" }}
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <ComboBoxBranches
              name={"devolución"}
              setReturnBranch={setReturnBranch}
              errorBranch2={errorBranch2}
              setErrorBranch2={setErrorBranch2}
            />
            <Time name="Devolución" setReturnTime={setReturnTime}/>
          </Stack>
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
  /////////////////////////////////////////////HELPERS/////////////////////////////////////////////////////////
  function errorHandler() {
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
    if (areCheckTwoBranches && !returnBranch) {
      setErrorBranch2("Selecciona una sucursal de devolución");
    }
  }
  function fetchData(
    areCheckTwoBranches,
    branch,
    returnBranch,
    bookingDates,
    age
  ) {
    if (!areCheckTwoBranches) {
      if (
        typeof branch !== "undefined" &&
        typeof bookingDates.range !== "undefined" &&
        bookingDates.range.length == 2
      ) {
        //format data
        const start = new Date(bookingDates.range[0]);
        start.setDate(start.getDate() + 1);

        bookingDates = {
          startDate: start.toISOString().split("T")[0],
          endDate: bookingDates.range[1].toISOString().split("T")[0],
          pickupTime: pickupTime,
          returnTime: returnTime
        };

        const booking = { branch, bookingDates, age };
        fetchCars(booking, setCars, setBooking);
      }
    } else {
      if (
        typeof branch !== "undefined" &&
        typeof returnBranch !== "undefined" &&
        typeof bookingDates.range !== "undefined" &&
        bookingDates.range.length == 2
        ) {
        console.log("error");
        //format data
        bookingDates = {
          startDate: bookingDates.range[0].toISOString().split("T")[0],
          endDate: bookingDates.range[1].toISOString().split("T")[0],
          pickupTime: pickupTime,
          returnTime: returnTime
        };

        const booking = { branch, returnBranch, bookingDates, age };

        fetchCars(booking, setCars, setBooking);

        navigate("/reserva/coche");
      }
    }
  }
};

const containerStyles = {
  maxWidth: 400,
};
