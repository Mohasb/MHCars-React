import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { styled, lighten, darken } from "@mui/system";
import { useState, useEffect } from "react";

/* function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
} */

export default function ComboBoxBranches({ setBranch, name, errrorBranch1 }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  function handleData(newValue) {
    console.log(newValue);

    setBranch(newValue);
  }

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      //await sleep(1e3);
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

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(event, newValue) => {
        handleData(newValue);
      }}
      groupBy={(options) => options.country}
      sx={{
        width: 500,
        input: { "&::placeholder": { fontSize: "1.2rem", opacity: 0.3 } },
        /* border: "1px solid rgb(164, 167, 181)",
        borderRadius: 2, */
        /* "&:hover": {
          border: "1px solid rgba(0,0,0,0)",
          borderRadius: 1.4,
        }, */
        /* "& .MuiOutlinedInput-notchedOutline": { border: "none" }, */
      }}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      getOptionLabel={(options) =>
        options.name + ` (${options.population}, ${options.country})`
      }
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          //label="Sucursal"
          error={!!errrorBranch1}
          helperText={errrorBranch1}
          placeholder={"Sucursal " + name}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
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
