import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//Components
import DateRange from "./componentsSearch/DateRange";
import AgeRadioButtons from "./componentsSearch/AgePicker";
import ComboBoxBranches from "./componentsSearch/ComboBox";
import CheckBoxTwoBranches from "./componentsSearch/CheckBox";
import Time from "./componentsSearch/TimePicker";
//React-Rainbow
import { Button } from "react-rainbow-components";
//Material-UI
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
//Fetch
import { fetchCars } from "../../services/apiRequest/SearchCarServices";
import ConfirmationModal from "../modals/ConfirmationModal";

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
  const [errorPickupTime, setErrorPickUpTime] = useState();
  const [errorReturnTime, setErrorReturnTime] = useState();
  //to navigate to other routes
  const navigate = useNavigate();
  //to sessionStorage
  const [cars, setCars] = useState([]);
  const [booking, setBooking] = useState([]);

  const [pickupTime, setPickupTime] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (cars.length && booking) {
      sessionStorage.setItem("data", JSON.stringify({ cars, booking }));
      navigate("/reserva/coche");
    }
  }, [cars, booking, navigate]);

  ////////////////////////////////////////////////////////////////////////////////
  function validateValues(branch, returnBranch, bookingDates, age) {
    errorHandler();
    fetchData(branch, returnBranch, bookingDates, age);
  }

  return (
    <>
      <div className="container-search-car">
        <Box textAlign="center">
          <ComboBoxBranches
            name={"recogida"}
            setBranch={setBranch}
            errorBranch1={errorBranch1}
            setErrorBranch1={setErrorBranch1}
          />
          {areCheckTwoBranches && (
            <>
              <ComboBoxBranches
                name={"devolución"}
                setReturnBranch={setReturnBranch}
                errorBranch2={errorBranch2}
                setErrorBranch2={setErrorBranch2}
              />
            </>
          )}
          <CheckBoxTwoBranches setCheckTwoBranches={setCheckTwoBranches} />
          <DateRange
            setBookingDates={setBookingDates}
            errorDates={errorDates}
            setErrorDates={setErrorDates}
          />
          <Stack
            spacing={1}
            direction={{ xs: "row", sm: "row" }}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: "1rem",
              width: "100%",
            }}
          >
            <Time
              name="recogida"
              setPickupTime={setPickupTime}
              error={errorPickupTime}
              setErrorPickUpTime={setErrorPickUpTime}
            />
            <Time
              name="devolución"
              setReturnTime={setReturnTime}
              error={errorReturnTime}
              setErrorReturnTime={setErrorReturnTime}
            />
          </Stack>
          <AgeRadioButtons setAge={setAge} />
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
      </div>
      {showModal && (
        <ConfirmationModal
          openModal={showModal}
          text={
            "No hay coches disponibles para esta sucursal en las fechas indicadas"
          }
        />
      )}
    </>
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
    console.log(!!pickupTime);
    if (!pickupTime) {
      setErrorPickUpTime("Selecciona hora de recogida");
    }
    if (!returnTime) {
      setErrorReturnTime("Selecciona hora de devolución");
    }
  }
  function fetchData(branch, returnBranch, bookingDates, age) {
    if (
      typeof branch !== "undefined" &&
      typeof bookingDates.range !== "undefined" &&
      bookingDates.range.length == 2 &&
      pickupTime &&
      returnTime
    ) {
      //format data
      const start = new Date(bookingDates.range[0]);
      start.setDate(start.getDate() + 1);

      bookingDates = {
        startDate: start.toISOString().split("T")[0],
        endDate: bookingDates.range[1].toISOString().split("T")[0],
        pickupTime: pickupTime,
        returnTime: returnTime,
      };
      typeof returnBranch === "undefined"
        ? (returnBranch = branch)
        : (returnBranch = returnBranch);

      const reserva = { branch, returnBranch, bookingDates, age };
      fetchCars(reserva, setCars, setBooking).then((response) => {
        if (!response.length) {
          setShowModal(true);
        }
      });
    }
  }
};
