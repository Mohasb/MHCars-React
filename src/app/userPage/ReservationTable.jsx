import React from "react";
import { Table, Column, Badge } from "react-rainbow-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faPlus,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { ButtonGroup, ButtonIcon } from "react-rainbow-components";

const badgeStyles = { color: "#1de9b6", marginLeft: "0.5rem" };
const tableContainerStyles = { height: 300 };

const StatusBadge = ({ value }) => (
  <Badge label={value} variant="lightest" style={badgeStyles} />
);
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

class TableExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedBy: undefined,
      sortDirection: "asc",
      data: [
        {
          id: 1,
          name: "Alberto",
          status: "active",
          company: "Google",
          email: "google@gmail.com",
        },
        {
          id: 2,
          name: "Pepe",
          status: "active",
          company: "Google",
          email: "google@gmail.com",
        },
        {
          id: 3,
          name: "Juan",
          status: "active",
          company: "Google",
          email: "google@gmail.com",
        },
        {
          id: 4,
          name: "Zeta",
          status: "active",
          company: "Google",
          email: "google@gmail.com",
        },
      ],
    };
    this.handleOnSort = this.handleOnSort.bind(this);
  }

  handleOnSort(event, field, nextSortDirection) {
    const { data } = this.state;

    const newData = [...data];

    const key = (value) => value[field];
    const reverse = nextSortDirection === "asc" ? 1 : -1;

    const sortedData = newData.sort((aItem, bItem) => {
      const aValue = key(aItem);
      const bValue = key(bItem);
      return reverse * ((aValue > bValue) - (bValue > aValue));
    });

    this.setState({
      data: sortedData,
      sortedBy: field,
      sortDirection: nextSortDirection,
    });
  }

  render() {
    const { data, sortDirection, sortedBy } = this.state;
    return (
      <Table
        keyField="id"
        data={data}
        onSort={this.handleOnSort}
        sortDirection={sortDirection}
        sortedBy={sortedBy}
      >
        <Column header="Name" field="name" sortable />
        <Column header="Status" field="status" sortable />
        <Column header="Company" field="company" sortable />
        <Column header="Email" field="email" sortable />
        <Column
          width={60}
          component={({ row }) => (
            <CustomAction
              row={row} /* onDeleteElement={handleDeleteElement} */
            />
          )}
        />
      </Table>
    );
  }
}

export default function ReservationTable() {
  return (
    <div className="rainbow-m-bottom_xx-large">
      <TableExample />
    </div>
  );
}
