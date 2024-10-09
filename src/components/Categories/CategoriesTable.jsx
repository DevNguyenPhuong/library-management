import { LoadingOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Result, Spin, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { getAllData } from "../../services/apiLibrary";
import { PATRON_PAGE_SIZE } from "../../utils/constants";
import { prepareCategoriesTableData } from "../Table/tableUtils";
import categoriesCols from "./categoriesCols";

const CategoriesTable = () => {
  const {
    data: samples,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getAllData(),
    queryKey: ["samples"],
  });

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );
  }

  if (error) {
    return (
      <Result
        status="error"
        title="Error"
        subTitle="Sorry, there was an error loading the sample data."
      />
    );
  }

  const handleEdit = (id) => {
    navigate(`/category/${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Deleting patron with id: ${id} `);
  };

  const columns = categoriesCols(handleEdit, handleDelete);
  const emptyRowsCount = Math.max(
    0,
    PATRON_PAGE_SIZE - (samples?.length % PATRON_PAGE_SIZE)
  );

  const dataWithEmptyRows = prepareCategoriesTableData(samples, emptyRowsCount);
  return (
    <Table
      columns={columns}
      dataSource={samples?.length === 0 ? [] : dataWithEmptyRows}
      pagination={{
        pageSize: PATRON_PAGE_SIZE,
        showQuickJumper: true,
      }}
      bordered
    />
  );
};

export default CategoriesTable;
