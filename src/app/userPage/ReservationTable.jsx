import React, { useEffect, useState } from "react";
import { Table, Column } from "react-rainbow-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { ButtonIcon } from "react-rainbow-components";
import DeleteModal from "../../components/modals/DeleteModal";
import Notification from "../../components/notifications/Notification";
import CustomService from "../../Services/apiRequest/CustomService";

function CustomAction(props) {
  const { row, onDeleteElement } = props;
  return (
    <ButtonIcon
      onClick={() => onDeleteElement(row.id)}
      buttonSize="small"
      icon={<FontAwesomeIcon icon={faTrashAlt} />}
    />
  );
}

export default function ReservationTable({ user }) {
  const [data, setData] = useState([]);
  const [sortedBy, setSortedBy] = useState(undefined);
  const [sortDirection, setShortDirection] = useState("asc");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [idToEliminate, setIdToEliminate] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  const handleResponseModal = (ok, id) => {
    if (ok) {
      setShowNotification(true);
      const newData = data.filter((item) => item.id !== id);
      setData(newData);
    }
  };

  const handleDeleteElement = (id) => {
    setIsOpenModal(true);
    setIdToEliminate(id);
  };

  useEffect(() => {
    CustomService.getReservationByClient(user.id, setData);
  }, [user.id]);

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

  return (
    <div className="rainbow-m-bottom_xx-large">
      <Table
        keyField="id"
        data={data}
        onSort={handleOnSort}
        sortDirection={sortDirection}
        sortedBy={sortedBy}
        emptyTitle={"No hay reservas"}
        emptyDescription={""}
        className="table-reservas"
      >
        <Column header="Sucursal Recogida" field="pickUpBranch" sortable />
        <Column header="Fecha Recogida" field="startDate" sortable />
        <Column header="Sucursal Devolución" field="returnBranch" sortable />
        <Column header="Fecha Devolución" field="endDate" sortable />
        <Column
          width={60}
          component={({ row }) => (
            <CustomAction row={row} onDeleteElement={handleDeleteElement} />
          )}
        />
      </Table>
      <DeleteModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        element={"Reserva"}
        text={
          "¿Estas seguro de eliminar esta reserva? Esta acción no se puede revertir"
        }
        idToEliminate={idToEliminate}
        handleResponseModal={handleResponseModal}
      />
      <Notification
        open={showNotification}
        setShowNotification={setShowNotification}
        severity={"success"}
        caller={"userPage"}
      />
    </div>
  );
}
