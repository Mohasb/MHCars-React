import { baseUrl } from "../../baseUrl";
import authHeader from "../../login/auth-header";
const autorization = authHeader();

const getClients = async (setTableData, setIsLoading) => {
  try {
    await fetch(`${baseUrl + "clients"}`, {
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
const postNewClient = async (client) => {
  try {
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
        console.log(resp);
        return resp;
      });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteClient = async (id) => {
  try {
    const response = await fetch(`${baseUrl}clients/${id}`, {
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
    console.log(error);
    return error;
  }
};
const putClient = async (client) => {
  const autorization = authHeader();
  try {
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
  } catch (error) {
    console.log(error);
    return error;
  }
};

const ClientsService = {
  getClients,
  postNewClient,
  deleteClient,
  putClient,
};

export default ClientsService;
