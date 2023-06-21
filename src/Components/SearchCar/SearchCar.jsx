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
import ConfirmationModal from "../modals/ConfirmationModal";
import CryptoJS from "crypto-js";
import CustomService from "../../Services/apiRequest/CustomService";

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

  const secretKeyCripto = "Muhammad";
  const ecryptStorage = (name, data) => {
    const encrypt = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      secretKeyCripto
    ).toString();

    sessionStorage.setItem(name, encrypt);
  };

  useEffect(() => {
    if (cars.length && booking) {
      /* sessionStorage.setItem("data", JSON.stringify({ cars, booking })); */
      ecryptStorage("_dghVjkKj", JSON.stringify({ cars, booking }));
      navigate("/reserva/coche");
    }
  }, [cars, booking, navigate]);

  ////////////////////////////////////////////////////////////////////////////////
  function validateValues(branch, returnBranch, bookingDates, age) {
    errorHandler();
    getCarsAvailables(branch, returnBranch, bookingDates, age);
  }

  return (
    <>
      <div data-aos="fade-left" className="container-search-car">
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
            direction={{ xs: "column", sm: "row" }}
            sx={{
              justifyContent: "center",
              alignItems: "start",
              marginY: "2rem",
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
    ///error pickup Branch
    if (!branch) {
      setErrorBranch1("Seleciona una sucursal de recogida");
    }
    ///errors range dates
    if (typeof bookingDates.range === "undefined") {
      setErrorDates("Selecciona las fechas de la reserva");
    } else if (bookingDates.range.length == 1) {
      setErrorDates("Falta seleccionar la fecha de entrega");
    }
    //error return Branch
    if (areCheckTwoBranches && !returnBranch) {
      setErrorBranch2("Selecciona una sucursal de devolución");
    }
    ///errors timers

    const horaInicio = new Date().setHours(8, 0, 0);
    const horaFin = new Date().setHours(20, 0, 0);
    //
    let horaSeleccionadaInicio = new Date();
    const partesHoraInicio = pickupTime.split(":");
    horaSeleccionadaInicio.setHours(
      parseInt(partesHoraInicio[0]),
      parseInt(partesHoraInicio[1]),
      0
    );
    //
    let horaSeleccionadaFin = new Date();
    const partesHoraFin = returnTime.split(":");
    horaSeleccionadaFin.setHours(
      parseInt(partesHoraFin[0]),
      parseInt(partesHoraFin[1]),
      0
    );

    if (!pickupTime) {
      setErrorPickUpTime("Selecciona hora de recogida");
    } else if (
      horaSeleccionadaInicio < horaInicio ||
      horaSeleccionadaInicio > horaFin
    ) {
      setErrorPickUpTime("El horario es de 08:00 a 20:00");
    }
    if (!returnTime) {
      setErrorReturnTime("Selecciona hora de devolución");
    } else if (
      horaSeleccionadaFin < horaInicio ||
      horaSeleccionadaFin > horaFin
    ) {
      setErrorReturnTime("El horario es de 08:00 a 20:00");
    }
  }
  function isValidTime(time) {
    const horaInicio = new Date().setHours(8, 0, 0);
    const horaFin = new Date().setHours(20, 0, 0);
    let horaSeleccionada = new Date();
    const partesHoraInicio = time.split(":");
    horaSeleccionada.setHours(
      parseInt(partesHoraInicio[0]),
      parseInt(partesHoraInicio[1]),
      0
    );
    if (!horaSeleccionada) {
      return false;
    }

    if (horaSeleccionada < horaInicio || horaSeleccionada > horaFin) {
      return false;
    } else {
      return true;
    }
  }
  function getCarsAvailables(branch, returnBranch, bookingDates, age) {
    if (
      typeof branch !== "undefined" &&
      typeof bookingDates.range !== "undefined" &&
      bookingDates.range.length == 2 &&
      pickupTime &&
      returnTime &&
      isValidTime(pickupTime) &&
      isValidTime(returnTime)
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
        : returnBranch;

      const reserva = { branch, returnBranch, bookingDates, age };
      CustomService.fetchCars(reserva, setCars, setBooking).then(() => {
        if (!cars.length) {
          setShowModal(true);
        }
      });
    }
  }
};
