import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { baseUrl } from "../../../../Services/baseUrl";
import authHeader from "../../../../services/login/auth-header";
//Import Material React Table Translations
import { MRT_Localization_ES } from "material-react-table/locales/es";

const BranchCrud = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const autorization = authHeader();
  const [isLoading, setIsLoading] = useState({ isLoading: true });

  useEffect(() => {
    try {
      fetch(`${baseUrl + "branches"}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: autorization,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setTableData(data);
          setIsLoading({ isLoading: false });
        });
    } catch (error) {
      console.log(error);
    }
  }, [autorization]);

  /* const handleCreateNewRow = (values) => {
    tableData.push(values);
    setTableData([...tableData]);
  }; */

  /* const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      tableData[row.index] = values;
      //send/receive api updates here, then refetch or update local table data for re-render
      setTableData([...tableData]);
      exitEditingMode(); //required to exit editing mode and close modal
    }
  }; */

  /* const handleCancelRowEdits = () => {
    setValidationErrors({});
  }; */

  /* const handleDeleteRow = useCallback(
    (row) => {
      if (
        !confirm(`Are you sure you want to delete ${row.getValue("firstName")}`)
      ) {
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
    },
    [tableData]
  ); */

  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],

        helperText: validationErrors[cell.id],

        onBlur: (event) => {
          const isValid =
            cell.column.id === "email"
              ? validateEmail(event.target.value)
              : cell.column.id === "age"
              ? validateAge(+event.target.value)
              : validateRequired(event.target.value);

          if (!isValid) {
            //set validation error for cell if invalid

            setValidationErrors({
              ...validationErrors,

              [cell.id]: `${cell.column.columnDef.header} es requerido`,
            });
          } else {
            //remove validation error for cell if valid

            delete validationErrors[cell.id];

            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },

    [validationErrors]
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        size: 80,
      },
      {
        accessorKey: "cif",
        header: "Cif",
        size: 140,
        enableClickToCopy: true,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
        /* muiTableBodyCellEditTextFieldProps: {
          error: !!validationErrors.cif, //highlight mui text field red error color
          helperText: validationErrors.cif, //show error message in helper text.
          required: true,
          onChange: (event) => {
            const value = event.target.value;
            //validation logic
            console.log(value);
            if (!value) {
              console.log("valueee" + value);
              setValidationErrors((prev) => ({
                ...prev,
                cif: "Cif is required",
              }));
            } else {
              delete validationErrors.cif;
              setValidationErrors({ ...validationErrors });
            }
            console.log(validationErrors);
          },
        }, */
      },
      {
        accessorKey: "name",
        header: "Nombre",
        size: 140,
        enableClickToCopy: true,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "population",
        header: "Población",
        enableClickToCopy: true,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "country",
        header: "País",
        size: 80,
        enableClickToCopy: true,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "address",
        header: "Dirección",
        size: 80,
        enableClickToCopy: true,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
    ],
    [getCommonEditTextFieldProps]
  );

  return (
    <>
      <MaterialReactTable
        displayColumnDefOptions={{
          "mrt-row-actions": {
            muiTableHeadCellProps: {
              align: "center",
            },
            size: 120,
          },
        }}
        columns={columns}
        data={tableData}
        editingMode="modal"
        enableColumnOrdering
        enableEditing
        localization={MRT_Localization_ES}
        state={isLoading}
        initialState={{ density: "compact" }}
        enableStickyHeader
        enableStickyFooter
        //muiTableContainerProps={{ sx: { maxHeight: '100px' } }}
        /* onEditingRowSave={handleSaveRowEdits} */
        /* onEditingRowCancel={handleCancelRowEdits} */
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton
                color="error" /* onClick={() => handleDeleteRow(row)} */
              >
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Button
            color="secondary"
            onClick={() => setCreateModalOpen(true)}
            variant="contained"
          >
            Añadir
          </Button>
        )}
      />
      <CreateNewBranchModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        /* onSubmit={handleCreateNewRow} */
      />
    </>
  );
};

//BranchCrud of creating a mui dialog modal for creating new rows
export const CreateNewBranchModal = ({ open, columns, onClose, onSubmit }) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {})
  );
  const [validationErrors, setValidationErrors] = useState({});

  const handleSubmit = () => {
    //put your validation logic here
    console.log(values);

    /* onSubmit(values);
    onClose(); */
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    validateField(name, value);
  };
  const validateField = (fieldName, value) => {
    let errors = { ...validationErrors };

    // Realiza la validación específica para el campo modificado
    if (fieldName === "cif" && !validateRequired(value)) {
      errors[fieldName] = "Cif es requerido";
    } else {
      delete errors[fieldName];
    }

    setValidationErrors(errors);
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Añadir Sucursal</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            {columns.map((column) => {
              if (column.accessorKey == "id") {
                return null;
              }
              const error = validationErrors[column.accessorKey] || false;

              return (
                <TextField
                  key={column.accessorKey}
                  label={column.header}
                  name={column.accessorKey}
                  onChange={handleInputChange} // Utiliza el evento onChange para validar en tiempo real
                  error={!!error} // Muestra el error si existe
                  helperText={error} // Muestra el mensaje de error
                  /* onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  } */
                />
              );
            })}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancelar</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Añadir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const validateRequired = (value) => !!value.length;
const validateEmail = (email) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
const validateAge = (age) => age >= 18 && age <= 50;

export default BranchCrud;
