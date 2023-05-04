import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import NavigationIcon from '@mui/icons-material/Navigation';
import {useNavigate} from 'react-router-dom';

const actions = [
  { icon: <KeyboardReturnIcon />, name: 'Volver' },
  { icon: <NavigationIcon />, name: 'Arriba' },
];

export default function ControlledOpenSpeedDial() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();
    const goBack = () => {
		navigate(-1);
	}
    

  return (
    <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1, position:"fixed", bottom: 16, right: 16 }}>
      <SpeedDial
        ariaLabel="SpeedDial controlled open example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => {
                window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
               /*  action.name = "Volver" ? goBack():"" */

                
            }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}