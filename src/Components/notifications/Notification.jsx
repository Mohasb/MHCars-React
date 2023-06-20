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

  const message = (caller) => {
    switch (caller) {
      case "Edit":
        return (
          <p>
            Modificación {props.severity == "error" ? "in" : ""}correcta{" "}
            {props.severity == "error" ? "❌" : "✔️"}{" "}
          </p>
        );
      case "Delete":
        return (
          <p>
            Eliminación {props.severity == "error" ? "in" : ""}correcta{" "}
            {props.severity == "error" ? "❌" : "✔️"}{" "}
          </p>
        );
      case "Add":
        return (
          <p>
            Addición {props.severity == "error" ? "in" : ""}correcta{" "}
            {props.severity == "error" ? "❌" : "✔️"}{" "}
          </p>
        );
      case "Error":
        return <p>Error ❌</p>;
      default:
        return <p>Error ❌</p>;
    }
  };
  return (
    <div className="user-notification">
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={props.open}
          autoHideDuration={4000}
          onClose={handleClose}
        >
          <Alert
            open={props.open}
            onClose={handleClose}
            severity={props.severity}
            sx={{ width: "100%" }}
          >
            <main className="container-alert">{message(props.caller)}</main>
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}
