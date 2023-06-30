import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useState, forwardRef } from "react";
import "./style.scss";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Notification(props) {
  const [open, setOpen] = useState(props.open);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          <main className="container-alert">
            <p>Bienvenido 👋 </p>
            <section className="animation">
              <div className="first">
                <div>{props.user.name}!</div>
              </div>
              <div className="second">
                <div>{props.user.name}!</div>
              </div>
              <div className="third">
                <div>{props.user.name}!</div>
              </div>
            </section>
          </main>
        </Alert>
      </Snackbar>
    </Stack>
  );
}
