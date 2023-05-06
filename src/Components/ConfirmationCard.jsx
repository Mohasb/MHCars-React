//Material UI imports
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { /*  Button, */ CardActionArea, CardActions } from "@mui/material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SettingsIcon from "@mui/icons-material/Settings";
//import SellIcon from "@mui/icons-material/Sell";
import CardHeader from "@mui/material/CardHeader";
//import { ReservationCar } from "../../Services/ReservationCarService";
//import { useNavigate } from "react-router-dom";
import { CheckboxToggle } from "react-rainbow-components";
import { CounterInput } from "react-rainbow-components";
import { themeRainbow } from "./Theme/ThemeRainbow";
import { Application } from "react-rainbow-components";
import Card from "@mui/material/Card";
import { useState } from "react";

export default function ConfirmationCard({ car, boocking }) {
  //const navigate = useNavigate();

  /* const handleReservation = (car, boocking) => {
    if (car && boocking) {
      const data = {
        car, boocking
      }
      sessionStorage.setItem('booking', JSON.stringify(data))

      navigate("/booking");


      //ReservationCar(car, boocking);
    }
  }; */
  const priceIsOuterJourney = 54;
  const priceIsGps = 20;

  const [extras, setExtras] = useState({
    isOuterJourney: false,
    isGps: false,
    childSeats: 0,
    drivers: 0,
  });

  const handleCheckbox = () => {
    console.log(event);
    const name = event.target.name;
    console.log(name);
    console.log(extras);

    switch (name) {
      case "checkbox-toggle-1":
        setExtras((prevState) => ({
          ...prevState,
          isOuterJourney: !prevState.isOuterJourney,
        }));
        !extras.isOuterJourney
          ? (car.price += priceIsOuterJourney)
          : (car.price = car.price - priceIsOuterJourney);

        break;
      case "checkbox-toggle-2":
        setExtras((prevState) => ({
          ...prevState,
          isGps: !prevState.isGps,
        }));
        !extras.isGps
          ? (car.price += priceIsGps)
          : (car.price = car.price - priceIsGps);
        break;
      /* case "checkbox-toggle-2":
        setExtras((prevState) => ({
          ...prevState,
          isGps: !prevState.isGps,
        }));
        !extras.isGps
          ? (car.price += priceIsGps)
          : (car.price = car.price - priceIsGps);
        break; */
      default:
        break;
    }
  };

  const handleCounters = () => {
    console.log(window.event);
  };
  console.log(extras);

  return (
    <>
      <Card sx={{ maxWidth: 400, minWidth: 350 }} car={car}>
        <CardActionArea
          onClick={() => {
            //handleReservation(car, boocking);
          }}
        >
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
        </CardActionArea>
        <CardActions>
          <Stack
            spacing={1}
            direction={{ xs: "column", sm: "column" }}
            sx={{ width: "100%" }}
          >
            <Application theme={themeRainbow}>
              <Stack
                spacing={1}
                direction={{ xs: "column", sm: "column" }}
                sx={{ justifyContent: "center" }}
              >
                <CheckboxToggle
                  id="isOutherJourney"
                  label="¿Vas a conducir por Portugal, Francia o Andorra?"
                  style={{
                    width: "100%",
                    justifyContent: "space-between",
                    flexDirection: "row-reverse",
                  }}
                  onChange={handleCheckbox}
                  value={extras.isOuterJourney}
                />
                <CheckboxToggle
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
                  value={extras.childSeats}
                  onChange={handleCounters}
                />
                {/*<CounterInput
                  id="input-component-1"
                  label="¿Cuantas personas van a conducir el coche?"
                  placeholder="Only numbers"
                  //style={containerStyles}
                  className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
                  //labelAlignment="center"
                  value={1}
                  //onChange={setCounter}
                  //variant="shaded"
                /> */}
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
                <Typography gutterBottom variant="h5" component="div">
                  Total (impuestos incluidos)
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  {car.price.toFixed(2)}
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
            </Application>
          </Stack>
        </CardActions>

        {/*         <CardActions>
          <Button
            size="large"
            color="secondary"
            variant="contained"
            className="m-auto"
            onClick={() => {
              handleReservation(car, boocking);
            }}
          >
            Reservar &nbsp;
            <SellIcon color="primary" />
          </Button>
        </CardActions> */}
      </Card>
    </>
  );
}

const styles = {
  cardAction: {
    display: "block",
    textAlign: "initial",
  },
};
