export async function fetchCars(booking, setCars, setBooking) {
  return await fetch(
    `http://localhost:5134/api/Custom/getCarsAvailables/${booking.branch.id}/${booking.bookingDates.startDate}/${booking.bookingDates.endDate}/${booking.age}`
  )
    .then((response) => {
      return response.json();
    })
    .then((cars) => {
      setCars(cars);
      setBooking(booking);
    });
}
