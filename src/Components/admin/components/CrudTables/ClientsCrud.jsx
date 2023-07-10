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
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
//Import Material React Table Translations
import { MRT_Localization_ES } from "material-react-table/locales/es";
import ClientsService from "../../../../services/apiRequest/Crud/ClientsService";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import SuccessNotification from "../../../notifications/Notification";
import ClientService from "../../../../services/apiRequest/Crud/ClientsService";
import DeleteDialog from "../DeleteDialog";

const ClientsCrud = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState({ isLoading: true });
  const [showNotification, setShowNotification] = useState(false);
  const [severity, setSeverity] = useState("");
  const [caller, setCaller] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [rowToEliminate, setRowToEliminate] = useState(null);

  useEffect(() => {
    ClientsService.getClients(setTableData, setIsLoading);
  }, []);

  const handleCreateNewRow = (values) => {
    tableData.push(values);
    setTableData([...tableData]);
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      console.log(values);
      ClientService.putClient(values).then((resp) => {
        console.log(resp);
        if (resp.isOk) {
          setShowNotification(true);
          setSeverity("success");
          setCaller("Edit");
        } else {
          setShowNotification(true);
          setSeverity("error");
          setCaller("Edit");
        }
      });
      tableData[row.index] = values;
      setTableData([...tableData]);
      exitEditingMode();
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    (row) => {
      setOpenDeleteDialog(false);
      ClientService.deleteClient(row.getValue("id")).then((response) => {
        if (response.ok) {
          setShowNotification(true);
          setSeverity("success");
          setCaller("Delete");
          tableData.splice(row.index, 1);
          setTableData([...tableData]);
        } else {
          setShowNotification(true);
          setSeverity("error");
          setCaller("Delete");
        }
      });
    },
    [tableData]
  );

  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid = validateRequired(event.target.value);

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
        accessorKey: "registration",
        header: "Identificación",
        size: 140,
        enableClickToCopy: true,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
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
        accessorKey: "lastName",
        header: "Apellido/s",
        size: 140,
        enableClickToCopy: true,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "email",
        header: "Email",
        enableClickToCopy: true,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "phoneNumber",
        header: "Telefono",
        size: 80,
        enableClickToCopy: true,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "bankAccount",
        header: "Cuenta bancaria",
        size: 80,
        enableClickToCopy: true,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "rol",
        header: "Rol",
        size: 80,
        enableClickToCopy: true,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "password",
        header: "Password",
        size: 80,
        enableEditing: false,
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
        enableEditing
        enableColumnOrdering
        localization={MRT_Localization_ES}
        state={isLoading}
        initialState={{ density: "compact" }}
        enableStickyHeader
        enableStickyFooter
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title="Editar">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Eliminar">
              <IconButton
                color="error"
                onClick={() => {
                  setOpenDeleteDialog(true);
                  setRowToEliminate(row);
                }}
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
      <CreateNewClientModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
        setShowNotification={setShowNotification}
        setSeverity={setSeverity}
        setCaller={setCaller}
        tableData={tableData}
      />
      <SuccessNotification
        open={showNotification}
        setShowNotification={setShowNotification}
        severity={severity}
        caller={caller}
      />
      <DeleteDialog
        open={openDeleteDialog}
        setOpenDeleteDialog={setOpenDeleteDialog}
        handleDeleteRow={handleDeleteRow}
        row={rowToEliminate}
      />
    </>
  );
};

//Dialog Add Branch
export const CreateNewClientModal = ({
  open,
  columns,
  onClose,
  onSubmit,
  setShowNotification,
  setSeverity,
  setCaller,
  tableData,
}) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {})
  );
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const handleSubmit = async () => {
    for (const key in values) {
      let label = "";
      switch (key) {
        case "registration":
          label = "La Identificación";
          break;
        case "name":
          label = "El Nombre";
          break;
        case "email":
          label = "El Email";
          break;
        case "bankAccount":
          label = "La Cuenta Bancaria";
          break;
        case "password":
          label = "El Password";
          break;
        default:
          break;
      }

      validateField(key, values[key], label);
    }
    delete values["id"];
    console.log(values);
    const isValid = Object.values(values).every((x) => x !== "");
    if (isValid) {
      setIsLoadingButton(true);
      await ClientService.postNewClient(values).then((response) => {
        if (response.isOk) {
          setIsLoadingButton(false);
          setShowNotification(true);
          setSeverity("success");
          setCaller("Add");
          onSubmit(values);
          onClose();
        }
      });
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const label = event.target.labels[0].innerText;
    setValues({ ...values, [name]: value });
    validateField(name, value, label);
  };
  const validateField = (fieldName, value, label) => {
    if (!value) {
      setValidationErrors((prevState) => ({
        //si extraen todos los valores anteriores...
        ...prevState,
        //Se establece el campo y su valor dinámicamente
        [fieldName]: `${label} es requerido`,
      }));
    } else {
      setValidationErrors((prevState) => ({
        //si extraen todos los valores anteriores...
        ...prevState,
        //Se establece el campo y su valor dinámicamente
        [fieldName]: ``,
      }));
    }
    //Validation registration unique and email unique
    if (fieldName == "registration") {
      const exist = tableData.find(
        (client) => client.registration.toLowerCase() === value.toLowerCase()
      );
      if (value === "") {
        setValidationErrors((prevState) => ({
          //si extraen todos los valores anteriores...
          ...prevState,
          //Se establece el campo y su valor dinámicamente
          [fieldName]: `${label} es requerido`,
        }));
      } else if (exist) {
        setValidationErrors((prevState) => ({
          //si extraen todos los valores anteriores...
          ...prevState,
          //Se establece el campo y su valor dinámicamente
          [fieldName]: `La Identificacion debe ser unica`,
        }));
      } else if (!/^[0-9]{8,8}[A-Za-z]$/g.test(value)) {
        setValidationErrors((prevState) => ({
          //si extraen todos los valores anteriores...
          ...prevState,
          //Se establece el campo y su valor dinámicamente
          [fieldName]: `Formato identificacion incorrecto(12345678A)`,
        }));
      }
    }
    if (fieldName == "email") {
      const exist = tableData.find(
        (client) => client.email.toLowerCase() === value.toLowerCase()
      );
      if (value === "") {
        setValidationErrors((prevState) => ({
          //si extraen todos los valores anteriores...
          ...prevState,
          //Se establece el campo y su valor dinámicamente
          [fieldName]: `El Email es requerido`,
        }));
      } else if (exist) {
        setValidationErrors((prevState) => ({
          //si extraen todos los valores anteriores...
          ...prevState,
          //Se establece el campo y su valor dinámicamente
          [fieldName]: `El Email debe ser unico`,
        }));
      } else if (
        !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(
          value
        )
      ) {
        setValidationErrors((prevState) => ({
          //si extraen todos los valores anteriores...
          ...prevState,
          //Se establece el campo y su valor dinámicamente
          [fieldName]: `Formato email mal`,
        }));
      }
    }
    if (fieldName == "phoneNumber") {
      if (value === "") {
        setValidationErrors((prevState) => ({
          //si extraen todos los valores anteriores...
          ...prevState,
          //Se establece el campo y su valor dinámicamente
          [fieldName]: `El número de teléfono es requerido`,
        }));
      } else if (!/^\d+$/.test(value)) {
        setValidationErrors((prevState) => ({
          //si extraen todos los valores anteriores...
          ...prevState,
          //Se establece el campo y su valor dinámicamente
          [fieldName]: `El número de teléfono deben ser números`,
        }));
      }
    }
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
              marginTop: "1rem",
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
                  onChange={handleInputChange}
                  error={!!error}
                  helperText={error}
                />
              );
            })}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button
          onClick={() => {
            setValidationErrors({});
            setValues(() =>
              columns.reduce((acc, column) => {
                acc[column.accessorKey ?? ""] = "";
                return acc;
              }, {})
            );
            onClose();
          }}
        >
          Cancelar
        </Button>
        <LoadingButton
          loading={isLoadingButton}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
          onClick={handleSubmit}
        >
          Añadir
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

const validateRequired = (value) => !!value.length;

export default ClientsCrud;
