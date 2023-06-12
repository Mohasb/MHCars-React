import { baseUrl } from "../../baseUrl";
import authHeader from "../../login/auth-header";
const autorization = authHeader();

const getReservations = async (setTableData, setIsLoading) => {
  try {
    await fetch(`${baseUrl + "reservations"}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: autorization,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTableData(data);
        setIsLoading({ isLoading: false });
      });
  } catch (error) {
    console.log(error);
  }
};
const postReservation = async (reservation) => {
  try {
    const response = await fetch(`${baseUrl}reservations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: autorization,
      },
      body: JSON.stringify(reservation),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        return response;
      });
    return response;
  } catch (error) {
    return error;
  }
};

const deleteReservation = async (id) => {
  try {
    const response = await fetch(`${baseUrl}reservations/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: autorization,
      },
    }).then((response) => {
      return response;
    });
    return response;
  } catch (error) {
    return error;
  }
};
const putReservation = async (reservation) => {
  const response = await fetch(baseUrl + `reservation/${reservation.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: autorization,
    },
    body: JSON.stringify(reservation),
  }).then((resp) => {
    return resp;
  });
  return response;
};

const BranchService = {
  getReservations,
  postReservation,
  deleteReservation,
  putReservation,
};

export default BranchService;
