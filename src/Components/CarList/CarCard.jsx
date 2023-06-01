import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//Material UI
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
import AOS from "aos";
import "aos/dist/aos.css";
import "./style.scss";

export default function CarCard({ car, booking }) {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
    AOS.refresh();
  }, []);

  const handleReservation = (car, booking) => {
    if (car && booking) {
      const data = {
        car,
        booking,
      };
      sessionStorage.setItem("booking", JSON.stringify(data));

      navigate("/booking");
    }
  };
  console.log(car);
  return (
    <div className="wraper-card" data-aos="zoom-in">
      <Card
        sx={{
          overflow: "visible",
          maxWidth: 360,
          minWidth: 360,
        }}
        car={car}
      >
        <CardActionArea
          onClick={() => {
            handleReservation(car, booking);
          }}
          className="card-action-area"
        >
          <CardMedia
            component="img"
            className="car-img"
            image={`/src/assets/Cars/${car.image}.webp`}
            alt={`car ${car.brand}`}
            data-aos="flip-left"
          />

          <CardContent>
            <Typography variant="h4" component="p">
              {car.brand} {car.model}
            </Typography>
            <Typography gutterBottom variant="h6" component="p">
              {car.price}€/dia
            </Typography>
            <Stack
              spacing={1}
              direction={{ xs: "column", sm: "row" }}
              sx={{ justifyContent: "center" }}
              className="chips"
            >
              <Chip
                icon={<DirectionsCarIcon color="secondary" />}
                label={`Clase: ${car.category}`}
                variant="filled"
                color="primary"
              />
              <Chip
                icon={<SettingsIcon color="secondary" />}
                label={car.gearShiftType}
                variant="filled"
                color="primary"
              />
              <Chip
                icon={<LocalGasStationIcon color="secondary" />}
                label={car.fuelType}
                variant="filled"
                color="primary"
              />
            </Stack>
          </CardContent>
        </CardActionArea>

        <CardActions sx={{ justifyContent: "center" }}>
          <Button
            size="large"
            color="secondary"
            variant="contained"
            onClick={() => {
              handleReservation(car, booking);
            }}
          >
            Reservar &nbsp;
            <SellIcon color="primary" />
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

const styles = {
  cardAction: {
    display: "block",
    textAlign: "initial",
  },
};
