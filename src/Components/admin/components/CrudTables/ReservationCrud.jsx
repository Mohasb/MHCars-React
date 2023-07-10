import React, { useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
//Import Material React Table Translations
import { MRT_Localization_ES } from "material-react-table/locales/es";
import ReservationService from "../../../../services/apiRequest/Crud/ReservationService";


const ReservationsCrud = () => {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState({ isLoading: true });


  useEffect(() => {
    ReservationService.getReservations(setTableData, setIsLoading);
  }, []);

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
        accessorKey: "branchId",
        header: "Id sucursal",
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
        header: "Id Cliente",
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
        data={tableData}
        editingMode="modal"
        enableColumnOrdering
        localization={MRT_Localization_ES}
        state={isLoading}
        initialState={{ density: "compact" }}
        enableStickyHeader
        enableStickyFooter
      />
    </>
  );
};

export default ReservationsCrud;
