import { Table } from "antd";
import { useRef, useState } from "react";
import { FakePatronData } from "../../data/fakeData";
import { PATRON_PAGE_SIZE } from "../../utils/constants";
import { getPatronColumns } from "./patronColumns";
import { prepareTableData } from "../Table/tableUtils";
import { useNavigate } from "react-router-dom";

function PatronsTable() {
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/patrons/${id}`);
  };

  const handleDetail = (id) => {
    console.log(`Deleting patron with id: ${id} `);
  };

  const columns = getPatronColumns(
    searchInput,
    searchText,
    setSearchText,
    searchedColumn,
    setSearchedColumn,
    handleEdit,
    handleDetail
  );

  const emptyRowsCount = Math.max(
    0,
    PATRON_PAGE_SIZE - (FakePatronData.length % PATRON_PAGE_SIZE)
  );

  const dataWithEmptyRows = prepareTableData(FakePatronData, emptyRowsCount);

  return (
    <Table
      columns={columns}
      dataSource={dataWithEmptyRows}
      pagination={{
        pageSize: PATRON_PAGE_SIZE,
        showQuickJumper: true,
      }}
    />
  );
}

export default PatronsTable;
