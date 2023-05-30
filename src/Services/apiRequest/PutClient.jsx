import { baseUrl } from "../baseUrl";
import authHeader from "../login/auth-header";

export async function PutClient(client) {
  const autorization = authHeader();
  const response = await fetch(baseUrl + `clients/${client.id}`, {
    method: "PUT",
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
