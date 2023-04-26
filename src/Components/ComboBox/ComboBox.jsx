/* import TextField from "@mui/material/TextField";
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
        sx={{ width: 500 }}
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
      ? lighten(theme.palette.primary.light, 0.2)
      : darken(theme.palette.primary.main, 0.8),
}));
const GroupItems = styled("ul")({
  padding: 0,
});
 */

import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { styled, lighten, darken } from "@mui/system";


/* function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
} */

export default function ComboBoxBranches({setBranchId}) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      //await sleep(1e3);  For demo purposes.
      await fetch("http://localhost:5134/api/Branches")
      .then((response) => {
        return response.json();
      })
      .then((branches) => {
        if (active) {
          setOptions([...branches]);
        }
      });

    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(event, newValue) => {
        if (newValue !== null && newValue !== "undefined") {
          setBranchId(newValue.id);
        }
      }}
      groupBy={(options) => options.country}
        sx={{ width: 500 }}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      getOptionLabel={(options) =>
        options.name + ` (${options.population}, ${options.country})`
      }
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Sucursal"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
      renderGroup={(params) => (
        <li key={params.key}>
          <GroupHeader>{params.group}</GroupHeader>
          <GroupItems>{params.children}</GroupItems>
        </li>
      )}
    />
  );
}

const GroupHeader = styled("div")(({ theme }) => ({
  position: "sticky",
  top: "-8px",
  padding: "4px 10px",
  color: theme.palette.secondary.main,
  backgroundColor:
    theme.palette.mode === "light"
      ? lighten(theme.palette.primary.light, 0.2)
      : darken(theme.palette.primary.main, 0.8),
}));
const GroupItems = styled("ul")({
  padding: 0,
});