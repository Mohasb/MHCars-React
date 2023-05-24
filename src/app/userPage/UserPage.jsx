import { useContext, useEffect } from "react";
import Context from "../../Services/contextUser/ContextUser";
import { useNavigate } from "react-router-dom";
/* import { Button } from "react-rainbow-components";
 */
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Input, Button } from "react-rainbow-components";
import Tooltip from "../register/Tooltip";

import "./style.scss";

export default function UserPage(props) {
  const { user, setUser } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(user);
    } else {
      navigate("/");
    }
  }, []);

  return (
    user &&
    localStorage.getItem("user") && (
      <main>
        <section className="user-page">
          <h1>User Page</h1>
          <h1>{JSON.stringify(user)}</h1>

          <div className="emp-profile">
            <div className="row">
              <div className="col-md-6 col-xl-2">
                <div className="profile-img">
                  <img
                    src="https://i.pravatar.cc/300?u=fakeee@pravatar.com"
                    alt=""
                    onClick={() => {
                      document.querySelector("input[type=file]").click();
                    }}
                  />
                  <div className="file btn btn-lg btn-primary">
                    Cambiar foto
                    <input type="file" name="file" />
                  </div>
                </div>
              </div>
              <div className="col-md-6 h-100 datos">
                <div className="profile-head">
                  <div className="row mt-1">
                    <div className="col-md-3 col-xl-2">
                      <p className="proile-data">Nombre:</p>
                    </div>
                    <div className="col-md-9 ">
                      <span>
                        {user.name.charAt(0).toUpperCase() + user.name.slice(1)}{" "}
                        {user.lastName.charAt(0).toUpperCase() +
                          user.lastName.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col-md-3 col-xl-2">
                      <p className="proile-data">Email:</p>
                    </div>
                    <div className="col-md-9 ">
                      <span>{user.email}</span>
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col-md-3 col-xl-2">
                      <p className="proile-data">Telefono:</p>
                    </div>
                    <div className="col-md-9 ">
                      <span>{user.phone}</span>
                    </div>
                  </div>

                  <ul className="nav nav-tabs"></ul>
                  <div className="col-md-12 edit-form">
                    {/* aqui form edición */}
                    <Input
                      label="Nombre"
                      placeholder="Jhon Doe"
                      type="text"
                      className="rainbow-p-around_medium"
                      borderRadius="semi-rounded"
                      value={user.name}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    )
  );
}
