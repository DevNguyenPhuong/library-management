import { Table } from "antd";
import { fakeLoanData } from "../../data/fakeData";
import { PATRON_PAGE_SIZE } from "../../utils/constants";
import { getLoanColumns } from "./loanColumns";
import { prepareLoanTableData } from "../Table/tableUtils";
import { useNavigate } from "react-router-dom";

function LoansTable() {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/patrons/${id}`);
  };

  const handleDetail = (id) => {
    console.log(`Deleting patron with id: ${id} `);
  };

  const columns = getLoanColumns(
    handleEdit,
    handleDetail
  );

  const emptyRowsCount = Math.max(
    0,
    PATRON_PAGE_SIZE - (fakeLoanData.length % PATRON_PAGE_SIZE)
  );

  const dataWithEmptyRows = prepareLoanTableData(fakeLoanData, emptyRowsCount);

  return (
    <Table
      columns={columns}
      dataSource={dataWithEmptyRows}
      pagination={{
        pageSize: PATRON_PAGE_SIZE,
        showQuickJumper: true,
      }}
      style={{ height: 500 }}
    />
  );
}

export default LoansTable;
