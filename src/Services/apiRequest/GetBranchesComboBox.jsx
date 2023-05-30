import { baseUrl } from "../../services/baseUrl";
import authHeader from "../../services/login/auth-header";
export async function fetcBranches(active, setOptions) {
  const autorization = authHeader();
  try {
    const response = fetch(`${baseUrl}Branches`, {
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
}
