import React, { useEffect, useState } from "react";
import { Table, Column } from "react-rainbow-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { ButtonIcon } from "react-rainbow-components";

/* function CustomAction(props) {
  const { row, onDeleteElement } = props;

  return (
    <ButtonIcon
      onClick={() => onDeleteElement(row.id)}
      buttonSize="small"
      icon={<FontAwesomeIcon icon={faTrashAlt} />}
    />
  );
}

const handleDeleteElement = id => {
  const newData = data.filter(item => item.id !== id);
  setData(newData);
} */

export default function ReservationTable() {
  const [data, setData] = useState([]);
  const [sortedBy, setSortedBy] = useState(undefined);
  const [sortDirection, setShortDirection] = useState("asc");

  useEffect(() => {
    try {
      const response = fetch(
        `http://localhost:5134/api/custom/getreservationbyclient/1`
      )
        .then((response) => {
          return response.json();
        })
        .then((resp) => {
          console.log(resp);
          if (resp.isOk) {
            //TODO
            setData(resp.reservations);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

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
        showRowNumberColumn={true}
        emptyTitle={"No hay reservas"}
        emptyDescription={""}
        variant={"listview"}
      >
        <Column header="S.Recogida" field="recogida" sortable />
        <Column header="F.Recogida" field="startDate" sortable />
        <Column header="S.Devolución" field="devolucion" sortable />
        <Column header="F.Devolución" field="endDate" sortable />
        {/* <Column
          width={60}
          component={({ row }) => (
            <CustomAction row={row} onDeleteElement={handleDeleteElement} />
          )}
        /> */}
      </Table>
    </div>
  );
}
