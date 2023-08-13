import { baseUrl } from "../baseUrl";

const login = (email, password) => {
  try {
    const response = fetch(`${baseUrl}custom/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        return response;
      });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const logout = () => {
  localStorage.removeItem("_ughVjkKj");
  sessionStorage.removeItem("_dghVjkKj");
  sessionStorage.removeItem("_bghVjkKj");
};

const getCurrentUser = (id) => {
  try {
    const response = fetch(`${baseUrl}clients/${id}`)
      .then((response) => response.json())
      .then((response) => {
        return response;
      });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const authService = {
  login,
  logout,
  getCurrentUser,
};

export default authService;
