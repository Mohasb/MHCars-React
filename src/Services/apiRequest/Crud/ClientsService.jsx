import { baseUrl } from "../../baseUrl";
import authHeader from "../../login/auth-header";
import { PostClient } from "../PostClient";
import { PutClient } from "../PutClient";
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
  PostClient(client);
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
    return error;
  }
};
const putClient = async (client) => {
  PutClient(client);
};

const ClientsService = {
  getClients,
  postNewClient,
  deleteClient,
  putClient,
};

export default ClientsService;
