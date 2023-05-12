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


export default function CarCard({ car, booking }) {
  const navigate = useNavigate();

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

  return (
    <>
      <Card
        sx={{ maxWidth: 345, minWidth: 350, overflow: "visible" }}
        car={car}
      >
        <CardActionArea
          onClick={() => {
            handleReservation(car, booking);
          }}
        >
          <CardMedia
            component="img"
            className="car-img"
            image={`/src/assets/Cars/${car.image}.webp`}
            alt={`car ${car.brand}`}
          />

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {car.brand} {car.model}
            </Typography>
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

        <CardActions sx={{justifyContent: "center"}}>
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
    </>
  );
}

const styles = {
  cardAction: {
    display: "block",
    textAlign: "initial",
  },
};
