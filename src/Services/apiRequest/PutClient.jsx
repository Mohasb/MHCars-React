import { baseUrl } from "../baseUrl";

export async function PutClient(client) {
  const response = await fetch(baseUrl + `clients/${client.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(client),
  })
    .then((res) => res.json())
    .then((resp) => {
      return resp;
    });
  return response;
}
