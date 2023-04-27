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
import SellIcon from '@mui/icons-material/Sell';
import CardHeader from '@mui/material/CardHeader';


export default function CarCard({ car, boocking }) {
  console.log(boocking);
  return (
    <>
    <Card sx={{ maxWidth: 345, minWidth:350 }}>
      <CardActionArea>
      <CardHeader
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
        <CardMedia
          component="img"
          image={`./src/assets/Cars/${car.image}.webp`}
          alt={`car ${boocking.name}`}
        />
        
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {car.brand} {car.model}
          </Typography>
          <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} sx={{justifyContent:"center"}}>
            <Chip
              icon={<DirectionsCarIcon color="secondary" />}
              label={car.category}
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
        <Button size="large" color="secondary"  variant="contained" className="m-auto">
        Reservar &nbsp;<SellIcon color="primary" />
        </Button>
      </CardActions>
    </Card>
    </>
  );
}