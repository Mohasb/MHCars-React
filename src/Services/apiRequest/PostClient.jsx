import { baseUrl } from "../baseUrl";
import authHeader from "../login/auth-header";

export async function PostClient(client) {
  const autorization = authHeader();
  const response = await fetch(baseUrl + `clients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: autorization,
    },
    body: JSON.stringify(client),
  })
    .then((res) => res.json())
    .then((resp) => {
      return resp;
    });
  return response;
}
