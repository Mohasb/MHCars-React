import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { styled, lighten, darken } from "@mui/system";
import { useState, useEffect } from "react";
import "./Style.scss";
import { fetchBranches } from "../../../services/apiRequest/GetBranchesComboBox";

/* function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
} */

export default function ComboBoxBranches({
  setBranch,
  setReturnBranch,
  name,
  errorBranch1,
  setErrorBranch1,
  errorBranch2,
  setErrorBranch2,
}) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  function handleData(newValue) {
    if (name == "recogida") {
      setBranch(newValue);
    }
    if (name == "devolución") {
      setReturnBranch(newValue);
    }
  }

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }
    //
    fetchBranches(active, setOptions);

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
    <>
      <Autocomplete
        id={`asynchronous${name}`}
        open={open}
        onOpen={() => {
          setOpen(true);
          console.log(name);
          if (name == "recogida") {
            setErrorBranch1();
          }
          if (name == "devolución") {
            setErrorBranch2();
          }
        }}
        onClose={() => {
          setOpen(false);
        }}
        onChange={(event, newValue) => {
          handleData(newValue);
        }}
        groupBy={(options) => options.country}
        sx={{
          maxWidth: 600,
          margin: "1rem auto",

          "& .MuiFormHelperText-root": {
            textAlign: "center",
            background: "#FF0000",
            color: "#fff !important",
            borderRadius: "5px",
            marginTop: "0.5rem",
          },
          input: { "&::placeholder": { opacity: "100" } },
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
            error={!!errorBranch1 || !!errorBranch2}
            helperText={errorBranch1 || errorBranch2}
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
      ? lighten(theme.palette.primary.light, 0.8)
      : darken(theme.palette.primary.main, 0.8),
}));
const GroupItems = styled("ul")({
  padding: 0,
});
