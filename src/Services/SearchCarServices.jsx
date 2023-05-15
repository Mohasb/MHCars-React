export async function fetchCars(booking, setCars, setBooking) {
  try {
    const response = fetch(
      `http://localhost:5134/api/Custom/getCarsAvailables/${booking.branch.id}/${booking.bookingDates.startDate}/${booking.bookingDates.endDate}/${booking.age}`
    ).then((response) => {
      return response.json();
    });
    return response.then((cars) => {
      setCars(cars);
      setBooking(booking);
      return response;
    });
  } catch (error) {
    console.log(error);
  }
}
