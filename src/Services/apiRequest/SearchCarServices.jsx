import { baseUrl } from "../baseUrl";
import authHeader from "../login/auth-header";

export async function fetchCars(booking, setCars, setBooking) {
  const autorization = authHeader();
  try {
    const response = fetch(
      `${baseUrl}Custom/getCarsAvailables/${booking.branch.id}/${booking.bookingDates.startDate}/${booking.bookingDates.endDate}/${booking.age}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: autorization,
        },
      }
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
