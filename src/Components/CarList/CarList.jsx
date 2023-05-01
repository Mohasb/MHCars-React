import { useEffect, useState } from "react";
//Components
import CarCard from "./CarCard";
import FilterButtons from "./FilterCars";
//MUI
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
//Rainbow
import { Application } from "react-rainbow-components";
import { themeRainbow } from "../ThemeRainbow";

export default function CarList({ cars, boocking }) {
  const [oilFilter, setOilFilter] = useState("todos");
  const [gearFilter, setGearFilter] = useState("todos");
  const [filteredCars, setfilteredCars] = useState(cars);

  useEffect(() => {
    console.log("filtro combustible: " + oilFilter);
    console.log("Filtro cambio: " + gearFilter);
    setfilteredCars(
      cars.filter((car) => {
        return (
          (oilFilter === "todos" || car.fuelType.toLowerCase() === oilFilter) &&
          (gearFilter === "todos" ||
            car.gearShiftType.toLowerCase() === gearFilter)
        );
      })
    );
  }, [oilFilter, gearFilter, cars]);

  return (
    <section className="carsList">
      <Box sx={{ flexGrow: 1, textAlign: "center", marginTop: "1rem" }}>
        <Typography gutterBottom variant="h4" component="div">
          Lugar y Fechas
          <Typography gutterBottom variant="h6" component="div">
            {`${boocking.Branch.name} (${boocking.Branch.population})`}
            <Typography gutterBottom variant="subtitle1" component="div">
              {`${new Date(boocking.bookingDates.startDate).toLocaleDateString(
                "es-ES"
              )} (${boocking.Branch.population}) - ${new Date(
                boocking.bookingDates.endDate
              ).toLocaleDateString("es-ES")} (${boocking.Branch.population})`}
            </Typography>
          </Typography>
        </Typography>
      </Box>

      {/* //////////////////////////////////////// */}

      <Application theme={themeRainbow}>
        <Box style={{ textAlign: "center" }}>
          <Stack
            spacing={1}
            direction={{ xs: "column", sm: "row" }}
            sx={{ justifyContent: "center" }}
          >
            <FilterButtons
              options={[
                { value: "todos", label: "Todos" },
                { value: "gasolina", label: "Gasolina" },
                { value: "diesel", label: "Diesel" },
              ]}
              name="oilType"
              setOilFilter={setOilFilter}
            />
            <FilterButtons
              options={[
                { value: "todos", label: "Todos" },
                { value: "manual", label: "Manual" },
                { value: "automatico", label: "Automatico" },
              ]}
              name="gearShiftType"
              setGearFilter={setGearFilter}
            />
          </Stack>
        </Box>
      </Application>

      {/* ////////////////////////// */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 5, md: 5 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          className="justify-content-center mt-4"
        >
          {filteredCars.map((car) => (
            <Grid
              gridTemplateColumns="repeat( auto-fit, minmax(250px, 1fr)"
              key={car.id}
              sx={{ margin: "auto" }}
              className="justify-content-center"
            >
              <CarCard car={car} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </section>
  );
}
