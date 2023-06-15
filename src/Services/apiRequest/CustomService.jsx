import { baseUrl } from "../baseUrl";
import authHeader from "../login/auth-header";
const autorization = authHeader();

const fetchBranches = async (active, setOptions) => {
  try {
    await fetch(`${baseUrl}Branches`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: autorization,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((branches) => {
        if (active) {
          setOptions([...branches]);
        }
      });
  } catch (error) {
    console.log(error);
  }
};

const getReservationByClient = async (id, setData) => {
  try {
    await fetch(`${baseUrl}custom/getreservationbyclient/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: autorization,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        if (resp.isOk) {
          setData(resp.reservations);
        }
      });
  } catch (error) {
    console.log(error);
  }
};

export async function DeleteReservation(id) {
  try {
    const response = await fetch(`${baseUrl}Reservations/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: autorization,
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        return resp;
      });
    return response;
  } catch (error) {
    console.log(error);
  }
}

const fetchCars = async (booking, setCars, setBooking) => {
  try {
    await fetch(
      `${baseUrl}Custom/getCarsAvailables/${booking.branch.id}/${booking.bookingDates.startDate}/${booking.bookingDates.endDate}/${booking.age}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: autorization,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((cars) => {
        setCars(cars);
        setBooking(booking);
      });
  } catch (error) {
    console.log(error);
  }
};

const CustomService = {
  fetchBranches,
  getReservationByClient,
  DeleteReservation,
  fetchCars,
};

export default CustomService;
