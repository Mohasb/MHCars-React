//Material UI imports
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SettingsIcon from "@mui/icons-material/Settings";
import SellIcon from "@mui/icons-material/Sell";
import CardHeader from "@mui/material/CardHeader";
import { ReservationCar } from "../services/apiRequest/ReservationCarService";
import { CheckboxToggle } from "react-rainbow-components";
import { CounterInput } from "react-rainbow-components";
import Card from "@mui/material/Card";

import { useEffect, useState, useContext } from "react";

import Context from "../services/contextUser/ContextUser";
import ConfirmationModal from "./modals/ConfirmationModal";


export default function ConfirmationCard({ car, booking }) {
  const { user, setUser } = useContext(Context);
  const [showModal, setShowModal] = useState(false)


  const handleReservation = (car, booking) => {
      
      if (user !== null && typeof user !== 'undefined' && car && booking) {
        ReservationCar(car, booking, user).then((response) => {
          if (response.status === 200) {
            setShowModal(true)
          }
        })
      } else {
        document.querySelector("#Iniciar").click()
      } 
  };
  const priceIsOuterJourney = 54;
  const priceIsGps = 20;
  const priceChildSeats = 30;
  const priceExtraDrivers = 50;
  const [priceExtras, setPriceExtras] = useState(0);

  const [childSeats, setChildSeats] = useState(0);
  const [drivers, setDrivers] = useState(1);
  const [extras, setExtras] = useState({
    isOuterJourney: false,
    isGps: false,
    childSeats: 0,
    drivers: 0,
  });
  const days = () => {
    const start = new Date(booking.bookingDates.startDate);
    const end = new Date(booking.bookingDates.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };


  useEffect(() => {
    setExtras((prevState) => ({
      ...prevState,
      childSeats: childSeats,
    }));
  }, [childSeats]);
  useEffect(() => {
    setExtras((prevState) => ({
      ...prevState,
      drivers: drivers,
    }));
  }, [drivers]);

  const handleCheckbox = () => {
    const name = window.event.target.name;
    switch (name) {
      case "isOutherJourney":
        setExtras((prevState) => ({
          ...prevState,
          isOuterJourney: !prevState.isOuterJourney,
        }));
        !extras.isOuterJourney
          ? setPriceExtras(priceExtras + priceIsOuterJourney)
          : setPriceExtras(priceExtras - priceIsOuterJourney);
        break;

      case "isGps":
        setExtras((prevState) => ({
          ...prevState,
          isGps: !prevState.isGps,
        }));
        !extras.isGps
          ? setPriceExtras(priceExtras + priceIsGps)
          : setPriceExtras(priceExtras - priceIsGps);
        break;
      default:
        break;
    }
  };
  const handleChildSeats = (value) => {
    if (value > 4) setChildSeats(4);
    else setChildSeats(value);
    const newValue = value;
    const seatDiff = newValue - childSeats;
    setPriceExtras(priceExtras + seatDiff * priceChildSeats);
  };
  const handleDrivers = (value) => {
    if (/\d/.test(value))
      if (value == 1) setDrivers(1);
      else if (value > 4) setDrivers(4);
      else setDrivers(value);
    const newValue = value;
    const driversDiff = newValue - drivers;
    setPriceExtras(priceExtras + driversDiff * priceExtraDrivers);
  };

  const handleKeyDownNumbers = () => {
    if (!/\d|ArrowLeft|ArrowRight/.test(window.event.key)) {
      // Cancelar la acción predeterminada si es un carácter no válido
      window.event.preventDefault();
    }
  };

  return (
    <>
      <main>
        <Card sx={{ maxWidth: 400, minWidth: 350}} car={car}>
          <CardHeader
            sx={{ textAlign: "center" }}
            title={`${car.brand} ${car.model}`}
            subheader=""
          />
          <CardMedia
            component="img"
            image={`./src/assets/Cars/${car.image}.webp`}
            alt={`car ${car.brand}`}
          />

          <CardContent>
            <Stack
              spacing={1}
              direction={{ xs: "column", sm: "row" }}
              sx={{ justifyContent: "center" }}
            >
              <Chip
                icon={<DirectionsCarIcon color="secondary" />}
                label={`Clase: ${car.category}`}
                variant="outlined"
              />
              <Chip
                icon={<SettingsIcon color="primary" />}
                label={car.gearShiftType}
                variant="outlined"
              />
              <Chip
                icon={<LocalGasStationIcon color="secondary" />}
                label={car.fuelType}
                variant="outlined"
              />
            </Stack>
          </CardContent>
          <CardActions>
            <Stack
              spacing={1}
              direction={{ xs: "column", sm: "column" }}
              sx={{ width: "100%" }}
            >
                <Stack
                  spacing={1}
                  direction={{ xs: "column", sm: "column" }}
                  sx={{ justifyContent: "center" }}
                >
                  <CheckboxToggle
                    id="isOutherJourney"
                    name="isOutherJourney"
                    label="¿Vas a conducir por Portugal, Francia o Andorra?"
                    style={{
                      width: "100%",
                      justifyContent: "space-between",
                      flexDirection: "row-reverse",
                      color: "#000",
                    }}
                    onChange={handleCheckbox}
                    value={extras.isOuterJourney}
                  />
                  <CheckboxToggle
                    id="isGps"
                    name="isGps"
                    label="No te pierdas y ahorra tiempo con un GPS"
                    style={{
                      width: "100%",
                      justifyContent: "space-between",
                      flexDirection: "row-reverse",
                    }}
                    onChange={handleCheckbox}
                    value={extras.isGps}
                  />
                  <CounterInput
                    id="input-component-1"
                    label="¿Necesitas algún asiento adecuado para niños?"
                    size="medium"
                    borderRadius="rounded"
                    className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
                    value={childSeats}
                    onChange={handleChildSeats}
                    onKeyDown={handleKeyDownNumbers}
                    min={0}
                    max={4}
                  />
                  <CounterInput
                    id="input-component-1"
                    label="¿Cuantas personas van a conducir el coche?"
                    size="medium"
                    borderRadius="rounded"
                    className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
                    value={drivers}
                    onChange={handleDrivers}
                    onKeyDown={handleKeyDownNumbers}
                    min={1}
                    max={4}
                  />
                </Stack>
                <Stack
                  spacing={1}
                  direction={{ xs: "row", sm: "row" }}
                  sx={{
                    width: "100%",
                    margin: "3rem 0 0 0",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography gutterBottom variant="h3" component="div">
                    Total
                  </Typography>
                  <Typography gutterBottom variant="h3" component="div">
                    {(car.price * days() + priceExtras).toFixed(2)}
                  </Typography>
                </Stack>
                <Stack
                  spacing={1}
                  direction={{ xs: "row", sm: "row" }}
                  sx={{
                    width: "100%",
                    margin: "0",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography gutterBottom variant="p" component="div">
                    ({car.price.toFixed(2)} * {days()} dias)
                  </Typography>
                  <Typography gutterBottom variant="p" component="div">
                    {(car.price.toFixed(2) * days()).toFixed(2)}
                  </Typography>
                </Stack>
                {extras.isOuterJourney && (
                  <Stack
                    spacing={1}
                    direction={{ xs: "row", sm: "row" }}
                    sx={{
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography gutterBottom variant="p" component="div">
                      Cobertura exterior
                    </Typography>
                    <Typography gutterBottom variant="p" component="div">
                      + {priceIsOuterJourney.toFixed(2)}€
                    </Typography>
                  </Stack>
                )}
                {extras.isGps && (
                  <Stack
                    spacing={1}
                    direction={{ xs: "row", sm: "row" }}
                    sx={{
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography gutterBottom variant="p" component="div">
                      Navegador GPS
                    </Typography>
                    <Typography gutterBottom variant="p" component="div">
                      + {priceIsGps.toFixed(2)}€
                    </Typography>
                  </Stack>
                )}
                {!!extras.childSeats && (
                  <Stack
                    spacing={1}
                    direction={{ xs: "row", sm: "row" }}
                    sx={{
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography gutterBottom variant="p" component="div">
                      Asiento niño
                    </Typography>
                    <Typography gutterBottom variant="p" component="div">
                      + {(extras.childSeats * priceChildSeats).toFixed(2)}€
                    </Typography>
                  </Stack>
                )}
                {extras.drivers > 1 && (
                  <Stack
                    spacing={1}
                    direction={{ xs: "row", sm: "row" }}
                    sx={{
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography gutterBottom variant="p" component="div">
                      Conductor extra
                    </Typography>
                    <Typography gutterBottom variant="p" component="div">
                      + {((extras.drivers - 1) * priceExtraDrivers).toFixed(2)}€
                    </Typography>
                  </Stack>
                )}
            </Stack>
          </CardActions>

          <CardActions>
            <Button
              size="large"
              color="secondary"
              variant="contained"
              className="m-auto"
              onClick={() => {
                handleReservation(car, booking);
              }}
              sx={{ margin: "auto" }}
            >
              CONFIRMAR RESERVA &nbsp;
              <SellIcon color="primary" />
            </Button>
          </CardActions>
        </Card>
        {showModal && <ConfirmationModal openModal={showModal} text={"Reserva realizada correctamente"}/>}
      </main>
    </>
  );
}
