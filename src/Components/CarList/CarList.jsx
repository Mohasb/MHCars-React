import { useEffect, useState } from "react";
//Components
import CarCard from "./CarCard";
import FilterButtons from "./FilterCars";
//MUI
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import "./style.scss";

export default function CarList({ cars, booking }) {
  const [oilFilter, setOilFilter] = useState("todos");
  const [gearFilter, setGearFilter] = useState("todos");
  const [carTypeFilter, setCarTypeFilter] = useState("todos");

  const [filteredCars, setfilteredCars] = useState(cars);

  useEffect(() => {
    setfilteredCars(
      cars.filter((car) => {
        return (
          (oilFilter === "todos" || car.fuelType.toLowerCase() === oilFilter) &&
          (gearFilter === "todos" ||
            car.gearShiftType.toLowerCase() === gearFilter) &&
          (carTypeFilter === "todos" || car.category === carTypeFilter)
        );
      })
    );
  }, [oilFilter, gearFilter, cars, carTypeFilter]);

  return (
    <section className="carsList">
      <Stack
        spacing={0}
        direction={{ xs: "column", sm: "row" }}
        className="container-top-carlist"
      >
        <Box sx={{ flexGrow: 1 }} className="text-top-carlist">
          <Typography gutterBottom variant="h4" component="div">
            {booking.returnBranch ? "Recogida" : ""}
            <Typography gutterBottom variant="h6" component="div">
              {`${booking.branch.name} (${booking.branch.population})`}
              <Typography gutterBottom variant="subtitle1" component="div">
                {`${new Date(booking.bookingDates.startDate).toLocaleDateString(
                  "es-ES"
                )} ${booking.bookingDates.pickupTime} (${
                  booking.branch.population
                })`}{" "}
                {!booking.returnBranch
                  ? `- ${new Date(
                      booking.bookingDates.endDate
                    ).toLocaleDateString("es-ES")} ${
                      booking.bookingDates.returnTime
                    } (${booking.branch.population})`
                  : ""}
              </Typography>
            </Typography>
          </Typography>
        </Box>
        {/* Si hay dos branches */}
        {booking.returnBranch ? (
          <Box sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h4" component="div">
              {booking.returnBranch ? "Devolución" : ""}
              <Typography gutterBottom variant="h6" component="div">
                {`${booking.returnBranch.name} (${booking.returnBranch.population})`}
                <Typography gutterBottom variant="subtitle1" component="div">
                  {!booking.returnBranch
                    ? `${new Date(
                        booking.bookingDates.startDate
                      ).toLocaleDateString("es-ES")} (${
                        booking.returnBranch.population
                      })-`
                    : ""}
                  {` ${new Date(
                    booking.bookingDates.endDate
                  ).toLocaleDateString("es-ES")} (${
                    booking.returnBranch.population
                  })`}
                </Typography>
              </Typography>
            </Typography>
          </Box>
        ) : (
          ""
        )}
      </Stack>

      {/* //////////////////////////////////////// */}

      <Box style={{ textAlign: "center" }}>
        <Stack
          spacing={0}
          direction={{ xs: "column", sm: "row" }}
          sx={{ justifyContent: "center" }}
        >
          <div>
            <FilterButtons
              options={[
                { value: "todos", label: "Todos" },
                { value: "gasolina", label: "Gasolina" },
                { value: "diesel", label: "Diesel" },
              ]}
              name="oilType"
              setOilFilter={setOilFilter}
              filter="combustible"
            />
          </div>
          <div>
            <FilterButtons
              options={[
                { value: "todos", label: "Todos" },
                { value: "manual", label: "Manual" },
                { value: "automatico", label: "Automatico" },
              ]}
              name="gearShiftType"
              setGearFilter={setGearFilter}
              filter="cambio"
            />
          </div>
        </Stack>
        <Stack
          spacing={0}
          direction={{ xs: "column", sm: "row" }}
          sx={{ justifyContent: "center" }}
        >
          <div>
            <FilterButtons
              options={[
                { value: "todos", label: "Todos" },
                { value: "A", label: "A" },
                { value: "B", label: "B" },
                { value: "C", label: "C" },
                { value: "D", label: "D" },
              ]}
              name="carType"
              setCarTypeFilter={setCarTypeFilter}
              filter="coche"
            />
          </div>
        </Stack>
      </Box>

      {/* ////////////////////////// */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 5, md: 5 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          style={{ width: "100%", justifyContent: "center" }}
          className="grid-cars"
        >
          {filteredCars.length ? (
            filteredCars.map((car) => (
              <Grid
                key={car.id}
                sx={{ margin: "auto" }}
                className="justify-content-center"
              >
                <CarCard car={car} booking={booking} />
              </Grid>
            ))
          ) : (
            <Typography gutterBottom variant="h4" component="p">
              No hay ningún resultado con estos filtros.
            </Typography>
          )}
        </Grid>
      </Box>
    </section>
  );
}
