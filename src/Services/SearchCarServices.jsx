export async function fetchCars(consulta, setCars, setBooking) {
  return await fetch(
    `http://localhost:5134/api/Custom/getCarsAvailables/${consulta.branch.id}/${consulta.bookingDates.startDate}/${consulta.bookingDates.endDate}/${consulta.age}`
  )
    .then((response) => {
      return response.json();
    })
    .then((cars) => {
      setCars([...cars]);
      setBooking(consulta);
    });
}
