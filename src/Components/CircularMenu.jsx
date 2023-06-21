import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//Material UI imports
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import NavigationIcon from "@mui/icons-material/Navigation";
import BuildIcon from "@mui/icons-material/Build";

const actions = [
  { icon: <KeyboardReturnIcon />, name: "Volver" },
  { icon: <NavigationIcon />, name: "Arriba" },
];

export default function ControlledOpenSpeedDial() {
  const [open, setOpen] = useState(false);
  const handleclick = () => setOpen(!open);
  const navigate = useNavigate();

  const [speedDial, setSpeedDial] = useState();

  useEffect(() => {
    setSpeedDial(document.querySelector("#scroll-top"));
  }, []);

  window.onscroll = () => {
    if (typeof speedDial != "undefined") {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        speedDial.classList.add("visible");
      } else {
        speedDial.classList.remove("visible");
      }
    }
  };

  return (
    <Box className="container-speed-dial">
      <SpeedDial
        ariaLabel="SpeedDial"
        icon={<BuildIcon />}
        open={open}
        onClick={handleclick}
        id="scroll-top"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => {
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
