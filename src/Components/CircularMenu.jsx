import { useState } from "react";
import { useNavigate } from "react-router-dom";
//Material UI imports
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import NavigationIcon from "@mui/icons-material/Navigation";

const actions = [
  { icon: <KeyboardReturnIcon />, name: "Volver" },
  { icon: <NavigationIcon />, name: "Arriba" },
];

export default function ControlledOpenSpeedDial() {
  const [open, setOpen] = useState(false);
  const handleclick = () => setOpen(!open);
  const navigate = useNavigate();


  return (
    <Box
      sx={{
        height: 320,
        transform: "translateZ(0px)",
        flexGrow: 1,
        position: "fixed",
        bottom: 16,
        right: 16,
      }}
    >
      <SpeedDial
        ariaLabel="SpeedDial controlled open example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        /* onClose={handleClose}
        onOpen={handleOpen} */
        open={open}
        onClick={handleclick}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => {
              console.log(navigate);
              action.name == "Volver"
                ? navigate(-1)
                : window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
