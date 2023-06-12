import { baseUrl } from "../../baseUrl";
import authHeader from "../../login/auth-header";
const autorization = authHeader();

const getBranches = async (setTableData, setIsLoading) => {
  try {
    await fetch(`${baseUrl + "branches"}`, {
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
const postNewBranch = async (branch) => {
  try {
    const response = await fetch(`${baseUrl}branches`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: autorization,
      },
      body: JSON.stringify(branch),
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

const deleteBranch = async (id) => {
  try {
    const response = await fetch(`${baseUrl}branches/${id}`, {
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
const putBranch = async (branch) => {
  console.log(branch);
  const response = await fetch(baseUrl + `branches/${branch.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: autorization,
    },
    body: JSON.stringify(branch),
  }).then((resp) => {
    return resp;
  });
  return response;
};

const BranchService = {
  getBranches,
  postNewBranch,
  deleteBranch,
  putBranch,
};

export default BranchService;
