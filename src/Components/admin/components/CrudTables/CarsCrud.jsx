import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  IconButton,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
//Import Material React Table Translations
import { MRT_Localization_ES } from "material-react-table/locales/es";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import SuccessNotification from "../../../notifications/Notification";
import CarService from "../../../../services/apiRequest/Crud/CarsService";
import DeleteDialog from "../DeleteDialog";
import CustomService from "../../../../Services/apiRequest/CustomService";

const CarsCrud = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState({ isLoading: true });
  const [showNotification, setShowNotification] = useState(false);
  const [severity, setSeverity] = useState("");
  const [caller, setCaller] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [rowToEliminate, setRowToEliminate] = useState(null);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    CarService.getCars(setTableData, setIsLoading);
    CustomService.fetchBranches(true, setBranches);
  }, []);

  const handleCreateNewRow = (values) => {
    tableData.push(values);
    setTableData([...tableData]);
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      CarService.putCar(values).then((resp) => {
        if (resp.ok) {
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
      CarService.deleteCar(row.getValue("id")).then((response) => {
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
        header: "Matrícula",
        size: 140,
        enableClickToCopy: true,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "branchId",
        header: "Sucursal",
        size: 80,
        enableClickToCopy: true,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          select: true,
          children: branches
            .map((obj) => obj.name)
            .map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            )),
        }),
      },
      {
        accessorKey: "brand",
        header: "Marca",
        enableClickToCopy: true,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "model",
        header: "Modelo",
        size: 80,
        enableClickToCopy: true,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "fuelType",
        header: "Combustible",
        size: 80,
        enableClickToCopy: true,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          select: true,
          children: ["Diesel", "Gasolina"].map((state) => (
            <MenuItem key={state} value={state}>
              {state}
            </MenuItem>
          )),
        }),
      },
      {
        accessorKey: "gearShiftType",
        header: "Cambio",
        size: 80,
        enableClickToCopy: true,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          select: true,
          children: ["Automatico", "Manual"].map((state) => (
            <MenuItem key={state} value={state}>
              {state}
            </MenuItem>
          )),
        }),
      },
      {
        accessorKey: "category",
        header: "Categoría",
        size: 80,
        enableClickToCopy: true,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          select: true,
          children: ["A", "B", "C", "D"].map((state) => (
            <MenuItem key={state} value={state}>
              {state}
            </MenuItem>
          )),
        }),
      },
      {
        accessorKey: "image",
        header: "Imagen",
        size: 80,
        enableClickToCopy: true,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
    ],
    [branches, getCommonEditTextFieldProps]
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
      <CreateNewCarModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
        setShowNotification={setShowNotification}
        setSeverity={setSeverity}
        setCaller={setCaller}
        tableData={tableData}
        branches={branches}
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

//Dialog Add Car
export const CreateNewCarModal = ({
  open,
  columns,
  onClose,
  onSubmit,
  setShowNotification,
  setSeverity,
  setCaller,
  tableData,
  branches,
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
        case "id":
          label = "Id";
          break;
        case "registration":
          label = "Matricula";
          break;
        case "branchId":
          label = "Id Sucursal";
          break;
        case "brand":
          label = "Marca";
          break;
        case "model":
          label = "Modelo";
          break;
        case "fuelType":
          label = "Combustible";
          break;
        case "gearShiftType":
          label = "Cambio";
          break;
        case "category":
          label = "Categoria";
          break;
        case "image":
          label = "Imagen";
          break;
        default:
          break;
      }

      validateField(key, values[key], label);
    }

    delete values["id"];
    const isValid = Object.values(values).every((x) => x !== "");
    if (isValid) {
      setIsLoadingButton(true);
      await CarService.postNewCar(values).then((response) => {
        if (response.id) {
          values.id = response.id;
          setIsLoadingButton(false);
          setShowNotification(true);
          setSeverity("success");
          setCaller("Add");
          onSubmit(values);
          onClose();
        } else {
          setIsLoadingButton(false);
          setShowNotification(true);
          setSeverity("error");
          setCaller("Error");
          onSubmit(values);
          onClose();
        }
      });
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    const label = event.target.labels
      ? event.target.labels[0].innerText
      : event.target.value;
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
    if (fieldName == "registration") {
      const exist = tableData.find(
        (car) => car.registration.toLowerCase() === value.toLowerCase()
      );
      if (exist) {
        setValidationErrors((prevState) => ({
          //si extraen todos los valores anteriores...
          ...prevState,
          //Se establece el campo y su valor dinámicamente
          [fieldName]: `Matricula repetida`,
        }));
      }
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Añadir Coche</DialogTitle>
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

              if (column.accessorKey == "branchId") {
                return (
                  <TextField
                    key={column.accessorKey}
                    label={column.header}
                    name={column.accessorKey}
                    onChange={handleInputChange}
                    error={!!error}
                    helperText={error}
                    select
                    defaultValue=""
                    size="small"
                  >
                    {branches
                      .map((obj) => ({ value: obj.id, label: obj.name }))
                      .map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                  </TextField>
                );
              } else if (column.accessorKey == "fuelType") {
                return (
                  <TextField
                    key={column.accessorKey}
                    label={column.header}
                    name={column.accessorKey}
                    onChange={handleInputChange}
                    error={!!error}
                    helperText={error}
                    select
                    defaultValue=""
                    size="small"
                  >
                    {[
                      { value: "Gasolina", label: "Gasolina" },
                      { value: "Diesel", label: "Diesel" },
                    ].map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                );
              } else if (column.accessorKey == "gearShiftType") {
                return (
                  <TextField
                    key={column.accessorKey}
                    label={column.header}
                    name={column.accessorKey}
                    onChange={handleInputChange}
                    error={!!error}
                    helperText={error}
                    select
                    defaultValue=""
                    size="small"
                  >
                    {[
                      { value: "Manual", label: "Manual" },
                      { value: "Automatico", label: "Automático" },
                    ].map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                );
              } else if (column.accessorKey == "category") {
                return (
                  <TextField
                    key={column.accessorKey}
                    label={column.header}
                    name={column.accessorKey}
                    onChange={handleInputChange}
                    error={!!error}
                    helperText={error}
                    select
                    defaultValue=""
                    size="small"
                  >
                    {[
                      { value: "A", label: "A" },
                      { value: "B", label: "B" },
                      { value: "C", label: "C" },
                      { value: "D", label: "D" },
                    ].map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                );
              } else if (column.accessorKey == "image") {
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
              } else {
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
              }
            })}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button
          onClick={() => {
            setValidationErrors({});
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

export default CarsCrud;
