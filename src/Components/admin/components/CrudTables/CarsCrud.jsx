/* import { useEffect, useState } from "react";
import {
  TableWithBrowserPagination,
  Column,
  ButtonMenu,
  MenuItem,
} from "react-rainbow-components";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
//
import { baseUrl } from "../../../../Services/baseUrl";
import authHeader from "../../../../services/login/auth-header";

function CarsCrud({ endPoint, headers, fields }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortedBy, setSortedBy] = useState(undefined);
  const [sortDirection, setShortDirection] = useState("asc");

  const MenuAction = ({ value, name }) => {
    if (value === "verified") {
      return <MenuItem label="Delete" />;
    }
    return (
      <>
        <MenuItem
          label="Delete"
          onClick={() => console.log(`Delete ${name}`)}
        />
        <MenuItem label="Edit" onClick={() => console.log(`Edit ${name}`)} />
      </>
    );
  };

  const ButtonAction = (props) => {
    const {
      value,
      row: { id },
    } = props;
    return (
      <ButtonMenu
        id="button-menu-2"
        menuAlignment="right"
        menuSize="x-small"
        icon={<FontAwesomeIcon icon={faEllipsisV} />}
        buttonVariant="base"
        className="rainbow-m-left_xx-small"
      >
        <MenuAction value={value} name={id} />
      </ButtonMenu>
    );
  };

  const handleOnSort = (event, field, nextSortDirection) => {
    const newData = [...data];

    const key = (value) => value[field];
    const reverse = nextSortDirection === "asc" ? 1 : -1;

    const sortedData = newData.sort((aItem, bItem) => {
      const aValue = key(aItem);
      const bValue = key(bItem);
      return reverse * ((aValue > bValue) - (bValue > aValue));
    });

    setData(sortedData);
    setSortedBy(field);
    setShortDirection(nextSortDirection);
  };

  const WrapText = styled.p`
    overflow-wrap: break-word;
    white-space: normal;
    line-height: 20px;
    margin: 4px 0.5rem;
  `;

  const autorization = authHeader();

  useEffect(() => {
    try {
      fetch(`${baseUrl + endPoint}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: autorization,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setIsLoading(false);
          setData(data);
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [autorization, endPoint]);

  return (
    <div className="rainbow-m-bottom_xx-large">
      <TableWithBrowserPagination
        pageSize={2}
        keyField="id"
        data={data}
        onSort={handleOnSort}
        sortDirection={sortDirection}
        sortedBy={sortedBy}
        emptyTitle={"No hay registros"}
        emptyDescription={""}
        isLoading={isLoading}
      >
        {headers.indexOf("id")}
        {headers.map((header) => (
          <Column
            key={headers.indexOf(header)}
            header={header}
            field={fields[headers.indexOf(header)]}
            sortable
            component={({ value }) => <WrapText>{value}</WrapText>}
          />
        ))}
        <Column field="status" component={ButtonAction} width={60} />
      </TableWithBrowserPagination>
    </div>
  );
}

export { CarsCrud };
 */
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
import { baseUrl } from "../../../../services/baseUrl";
import authHeader from "../../../../services/login/auth-header";
//Import Material React Table Translations
import { MRT_Localization_ES } from "material-react-table/locales/es";

const CarsCrud = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const autorization = authHeader();
  const [isLoading, setIsLoading] = useState({ isLoading: true });

  useEffect(() => {
    try {
      fetch(`${baseUrl + "cars"}`, {
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
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

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
      console.log(cell);
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
              [cell.id]: `${cell.column.columnDef.header} is required`,
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
        header: "Id Sucursal",
        size: 80,
        enableClickToCopy: true,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "brand",
        header: "Marca",
        enableClickToCopy: true,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          /* type: "email", */
        }),
      },
      {
        accessorKey: "model",
        header: "Modelo",
        size: 80,
        enableClickToCopy: true,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          /* type: "number", */
        }),
      },
      {
        accessorKey: "fuelType",
        header: "Combustible",
        size: 80,
        enableClickToCopy: true,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          /* type: "number", */
        }),
      },
      {
        accessorKey: "gearShiftType",
        header: "Cambio",
        size: 80,
        enableClickToCopy: true,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          /* type: "number", */
        }),
      },
      {
        accessorKey: "category",
        header: "Categoría",
        size: 80,
        enableClickToCopy: true,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          /* type: "number", */
        }),
      },
      {
        accessorKey: "image",
        header: "Imagen",
        size: 80,
        enableClickToCopy: true,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          /* type: "number", */
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
        editingMode="modal" //default
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
      <CreateNewAccountModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        /* onSubmit={handleCreateNewRow} */
      />
    </>
  );
};

//CarsCrud of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal = ({ open, columns, onClose, onSubmit }) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {})
  );

  const handleSubmit = () => {
    //put your validation logic here
    console.log(values);
    /* onSubmit(values);
    onClose(); */
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
              return (
                <TextField
                  key={column.accessorKey}
                  label={column.header}
                  name={column.accessorKey}
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
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

export default CarsCrud;
