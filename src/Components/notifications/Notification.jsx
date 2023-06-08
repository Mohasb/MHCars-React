import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { forwardRef } from "react";
import "./style.scss";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SuccessNotification(props) {
  const handleClose = () => {
    props.setShowNotification(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={props.open} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          open={props.open}
          onClose={handleClose}
          severity={props.severity}
          sx={{ width: "100%" }}
        >
          <main className="container-alert">
            {props.caller == "userPage" ?  <p>
              Modificación {props.severity == "error" ? "in" : ""}correcta{" "}
              {props.severity == "error" ? "❌" : "✔️"}{" "}
            </p> :  <p>
              Eliminación {props.severity == "error" ? "in" : ""}correcta{" "}
              {props.severity == "error" ? "❌" : "✔️"}{" "}
            </p> }
           
          </main>
        </Alert>
      </Snackbar>
    </Stack>
  );
}
