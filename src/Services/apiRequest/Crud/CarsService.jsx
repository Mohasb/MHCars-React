import { baseUrl } from "../../baseUrl";
import authHeader from "../../login/auth-header";
const autorization = authHeader();

const getCars = async (setTableData, setIsLoading) => {
  try {
    const response = await fetch(`${baseUrl}cars`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: autorization,
      },
    });
    const data = await response.json();

    const branchesResponse = await fetch(`${baseUrl}branches`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: autorization,
      },
    });
    const branchesData = await branchesResponse.json();

    const updatedData = data.map((car) => {
      const branch = branchesData.find((branch) => branch.id === car.branchId);
      if (branch) {
        return { ...car, branchId: branch.name };
      }
      return car;
    });
    setTableData(updatedData);
    setIsLoading({ isLoading: false });
  } catch (error) {
    console.log(error);
  }
};
const postNewCar = async (car) => {
  try {
    const response = await fetch(`${baseUrl}cars`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: autorization,
      },
      body: JSON.stringify(car),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        return response;
      });
    return response;
  } catch (error) {
    return error;
  }
};

const deleteCar = async (id) => {
  try {
    const response = await fetch(`${baseUrl}cars/${id}`, {
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
const putCar = async (car) => {
  const response = await fetch(baseUrl + `cars/${car.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: autorization,
    },
    body: JSON.stringify(car),
  }).then((resp) => {
    return resp;
  });
  return response;
};

const CarService = {
  getCars,
  postNewCar,
  deleteCar,
  putCar,
};

export default CarService;
