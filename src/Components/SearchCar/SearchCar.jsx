import { useState } from "react";
import DateRange from "./DateRange/DateRange";
import AgeRadioButtons from "./AgePicker/AgePicker";
import { Button, Application } from "react-rainbow-components";
import ComboBoxBranches from "./ComboBox/ComboBox";
import Box from '@mui/material/Box';

const SearchCar = ({ setCars, setBooking }) => {
  const [Branch, setBranch] = useState();
  const [bookingDates, setBookingDates] = useState();
  const [age, setAge] = useState(2);
  //const [cars, setCars] = useState({});

  /*   useEffect(() => {
    validateValues(Branch, bookingDates, age);
  }, [Branch, bookingDates, age]); */

  function validateValues(Branch, bookingDates, age) {
    if (
      typeof Branch !== "undefined" &&
      typeof bookingDates.range !== "undefined" &&
      bookingDates.range.length == 2
    ) {
      //format data
      bookingDates = {
        startDate: bookingDates.range[0].toISOString().split("T")[0],
        endDate: bookingDates.range[1].toISOString().split("T")[0],
      };

      const consulta = { Branch, bookingDates, age };

      fetch(
        `http://localhost:5134/api/Custom/getCarsAvailables/${consulta.Branch.id}/${consulta.bookingDates.startDate}/${consulta.bookingDates.endDate}/${consulta.age}`
      )
        .then((response) => {
          return response.json();
        })
        .then((cars) => {
          setCars([...cars]);
          setBooking(consulta);
        });
    }
  }

  return (
    <div
      className="rainbow-align-content_center rainbow-m-vertical_large rainbow-p-horizontal_small rainbow-m_auto"
      style={containerStyles}
    >
      <Application theme={themeRainbow}>
        <h1>Alquiler de coches</h1>
        <ComboBoxBranches setBranch={setBranch} />
        <DateRange setBookingDates={setBookingDates} />
        <br />
        <AgeRadioButtons setAge={setAge} />
        <Box textAlign="center">
          <Button
            variant="brand"
            className="rainbow-m-around_medium "
            size="large"
            borderRadius="semi-rounded"
            onClick={() => {
              validateValues(Branch, bookingDates, age);
            }}
          >
            Buscar
          </Button>
        </Box>
      </Application>
    </div>
  );
};

const themeRainbow = {
  rainbow: {
    palette: {
      brand: "#F4B408",
    },
  },
};
const containerStyles = {
  maxWidth: 400,
};
export default SearchCar;
