import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SettingsIcon from "@mui/icons-material/Settings";
import SellIcon from "@mui/icons-material/Sell";
import CardHeader from "@mui/material/CardHeader";
//import { ReservationCar } from "../../Services/ReservationCarService";
import { useNavigate } from "react-router-dom";
import { CheckboxToggle } from "react-rainbow-components";
import { CounterInput } from "react-rainbow-components";
import { themeRainbow } from "../../../Components/ThemeRainbow";
import { Application } from "react-rainbow-components";

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

  return (
    <>
      <Card sx={{ maxWidth: 400, minWidth: 350 }} car={car}>
        <CardActionArea
          onClick={() => {
            handleReservation(car, boocking);
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
            {/* <Typography gutterBottom variant="h5" component="div">
              {car.brand} {car.model}
            </Typography> */}
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
                  label="¿Vas a conducir por Portugal, Francia o Andorra?"
                  labelAlignment="left"
                  style={{ width: "100%", justifyContent: "space-between" }}
                />
                <CheckboxToggle
                  label="No te pierdas y ahorra tiempo con un GPS"
                  labelAlignment="left"
                  style={{ width: "100%", justifyContent: "space-between" }}
                />
                <CounterInput
                  id="input-component-1"
                  label="¿Necesitas algún asiento adecuado para niños?"
                  placeholder="Only numbers"
                  //style={containerStyles}
                  className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
                  labelAlignment="center"
                  value={1}
                  //onChange={setCounter}
                  //variant="shaded"
                />
                <CounterInput
                  id="input-component-1"
                  label="¿Cuantas personas van a conducir el coche?"
                  placeholder="Only numbers"
                  //style={containerStyles}
                  className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
                  labelAlignment="center"
                  value={1}
                  //onChange={setCounter}
                  //variant="shaded"
                />
              </Stack>
              <Stack
            spacing={1}
            direction={{ xs: "row", sm: "row" }}
            sx={{ width: "100%", margin: "1rem 0", justifyContent:"space-between" }}
          >
              <Typography gutterBottom variant="h6" component="div">
              Total (impuestos incluidos)
            </Typography>
              <Typography gutterBottom variant="h6" component="div">
              {car.price}
            </Typography>

          </Stack>
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
