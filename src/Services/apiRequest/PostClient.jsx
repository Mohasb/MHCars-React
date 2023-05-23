import { baseUrl } from "../baseUrl";

export async function PostClient(client) {
  const response = await fetch(baseUrl + `clients`, {
    method: "POST",
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
