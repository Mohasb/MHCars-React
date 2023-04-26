import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState, useEffect } from "react";
import { styled, lighten, darken } from "@mui/system";

export default function ComboBox({ setBranchId }) {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5134/api/Branches")
      .then((response) => {
        return response.json();
      })
      .then((branches) => {
        setBranches(branches);
      });
  }, []);

  return (
    <>
      <Autocomplete
        onChange={(event, newValue) => {
          if (newValue !== null && newValue !== "undefined") {
            setBranchId(newValue.id);
          }
        }}
        disablePortal
        id="disable-close-on-select"
        options={branches}
        getOptionLabel={(options) =>
          options.name + ` (${options.population}, ${options.country})`
        }
        groupBy={(options) => options.country}
        sx={{ width: 600 }}
        renderInput={(params) => <TextField {...params} label="Sucursal" />}
        renderGroup={(params) => (
          <li key={params.key}>
            <GroupHeader>{params.group}</GroupHeader>
            <GroupItems>{params.children}</GroupItems>
          </li>
        )}
      />
    </>
  );
}

const GroupHeader = styled("div")(({ theme }) => ({
  position: "sticky",
  top: "-8px",
  padding: "4px 10px",
  color: theme.palette.secondary.main,
  backgroundColor:
    theme.palette.mode === "light"
      ? lighten(theme.palette.primary.light, 0.85)
      : darken(theme.palette.primary.main, 0.8),
}));
const GroupItems = styled("ul")({
  padding: 0,
});
