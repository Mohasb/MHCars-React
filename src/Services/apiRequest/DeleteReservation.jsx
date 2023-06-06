import { baseUrl } from "../../services/baseUrl";
import authHeader from "../../services/login/auth-header";
export async function DeleteReservation(id) {
  const autorization = authHeader();
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
