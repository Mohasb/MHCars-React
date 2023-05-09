//import axios from "axios";

const API_URL = "http://localhost:5134/api/custom/login";

/* const signup = (email, password) => {
  return axios
    .post(API_URL + "/signup", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
}; */

const login = (email, password) => {
  try {
    const response = fetch(`http://localhost:5134/api/custom/login`, {
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
        if (response.isOk) {
          console.log("Saved token");
          localStorage.setItem("user", JSON.stringify(response.userWithToken));
        }
        return response;
      });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  //signup,
  login,
  logout,
  getCurrentUser,
};

export default authService;
