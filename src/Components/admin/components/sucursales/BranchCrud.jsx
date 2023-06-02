import { useEffect, useState } from "react";
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

function CrudTable({ endPoint, headers, fields }) {
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

export { CrudTable };
