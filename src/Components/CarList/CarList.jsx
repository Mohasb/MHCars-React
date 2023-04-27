import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import CarCard from "./CarCard";

export default function CarList({cars, boocking}) {
  return (
    <section className="carsList">
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 5, md: 5 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          className="justify-content-center mt-4"
        >
          {cars.map((car) => (
            <Grid
              gridTemplateColumns="repeat( auto-fit, minmax(250px, 1fr)"
              key={car.id}
              sx={{ margin: "auto" }}
              className="justify-content-center"
            >
              <CarCard car={car} boocking={boocking}/>
            </Grid>
          ))}
        </Grid>
      </Box>
    </section>
  );
}
