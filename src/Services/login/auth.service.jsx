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

const getCurrentUser = (id) => {
  try {
    const response = fetch(`http://localhost:5134/api/clients/${id}`)
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
