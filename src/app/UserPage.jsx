import { useContext, useEffect } from "react";
import Context from "../Services/contextUser/ContextUser";
import { useNavigate } from "react-router-dom";
export default function UserPage(props) {
  const { user, setUser } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null || typeof user === "undefined") {
      navigate("/");
    }
  });

  return (
    <main>
      <h1>User Page</h1>
      <h1>{JSON.stringify(user)}</h1>
    </main>
  );
}
