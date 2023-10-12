import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
//Import Material React Table Translations
import { MRT_Localization_ES } from "material-react-table/locales/es";
import ReservationService from "../../../../services/apiRequest/Crud/ReservationService";
import CustomService from "../../../../Services/apiRequest/CustomService";
import ClientsService from "../../../../services/apiRequest/Crud/ClientsService";
import CarService from "../../../../services/apiRequest/Crud/CarsService";
import DeleteDialog from "../DeleteDialog";

const ReservationsCrud = () => {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState({ isLoading: true });
  const [branches, setBranches] = useState([]);
  const [clients, setClients] = useState([]);
  const [cars, setCars] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [rowToEliminate, setRowToEliminate] = useState(null);

  useEffect(() => {
    ReservationService.getReservations(setTableData, setIsLoading);
    CustomService.fetchBranches(true, setBranches);
    ClientsService.getClients(setClients, setIsLoading);
    CarService.getCars(setCars, setIsLoading);
  }, []);

  const handleDeleteRow = useCallback(
    (row) => {
      setOpenDeleteDialog(false);
      ReservationService.deleteReservation(row.getValue("id")).then(
        (response) => {
          if (response.ok) {
            tableData.splice(row.index, 1);
            setTableData([...tableData]);
          } else {
            console.log("Error borrando");
          }
        }
      );
    },
    [tableData]
  );

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const mappedTableData = useMemo(() => {
    if (!Array.isArray(tableData) || tableData.length === 0) {
      return [];
    }

    return tableData.map((item) => {
      // Map bracnhID to branch Name
      const branch = branches.find((branch) => branch.id === item.branchId);
      // Format startDate and endDate
      const formattedStartDate = formatDate(item.startDate);
      const formattedEndDate = formatDate(item.endDate);
      // Map clientId to client registration
      const client = clients.find((client) => client.id === item.clientId);
      const clientRegistration = client
        ? client.registration
        : "Unknown Client";
      // Map car id to registration
      const car = cars.find((car) => car.id === item.carId);
      const carRegistration = car ? car.registration : "Unknown Car";
      // Map bracnhID to branch Name
      const returnBranch = branches.find(
        (branch) => branch.id === item.returnBranchId
      );

      return {
        ...item,
        branchName: branch ? branch.name : "Unknown Branch",
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        clientId: clientRegistration,
        carId: carRegistration,
        returnBranchId: returnBranch ? returnBranch.name : "Unknown Branch",
      };
    });
  }, [tableData, branches, clients, cars]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableColumnOrdering: false,
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "branchName",
        header: "Sucursal Recogida",
        size: 140,
        enableClickToCopy: true,
      },
      {
        accessorKey: "carId",
        header: "Id Coche",
        size: 140,
        enableClickToCopy: true,
      },
      {
        accessorKey: "carCategory",
        header: "Categoria",
        enableClickToCopy: true,
      },
      {
        accessorKey: "clientId",
        header: "DNI Cliente",
        size: 80,
        enableClickToCopy: true,
      },
      {
        accessorKey: "startDate",
        header: "Fecha Inicio",
        size: 80,
        enableClickToCopy: true,
      },
      {
        accessorKey: "endDate",
        header: "Fecha Fin",
        size: 80,
        enableClickToCopy: true,
      },
      {
        accessorKey: "returnBranchId",
        header: "Sucursal retorno",
        size: 80,
        enableClickToCopy: true,
      },
    ],
    []
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
        data={mappedTableData}
        editingMode="modal"
        enableEditing
        enableColumnOrdering
        localization={MRT_Localization_ES}
        state={isLoading}
        initialState={{ density: "compact" }}
        enableStickyHeader
        enableStickyFooter
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
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

export default ReservationsCrud;
