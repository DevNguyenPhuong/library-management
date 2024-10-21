import { LoadingOutlined } from "@ant-design/icons";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { Result, Spin, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { getAllData, deleteData } from "../../services/apiLibrary";
import { PATRON_PAGE_SIZE } from "../../utils/constants";
import { prepareAuthorsTableData } from "../Table/tableUtils";
import { toast } from "react-hot-toast";
import authorsCols from "./authorsCols";

const AuthorsTable = () => {
  const {
    data: samples,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getAllData(`/authors`),
    queryKey: ["authors"],
    select: (data) => data.sort((a, b) => a.name.localeCompare(b.name)),
  });

  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { mutate: deleteAuthor } = useMutation({
    mutationFn: (id) => deleteData(`/authors/${id}`),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`authors`],
      });
    },

    onError: (error) => {
      const { response } = error;
      toast.error(response?.data.message || "Opps, cannot perform this action");
    },
  });

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
    navigate(`/authors/${id}`);
  };

  const handleDelete = (id) => {
    deleteAuthor(id);
  };

  const columns = authorsCols(handleEdit, handleDelete);
  const emptyRowsCount = Math.max(
    0,
    PATRON_PAGE_SIZE - (samples?.length % PATRON_PAGE_SIZE)
  );

  const dataWithEmptyRows = prepareAuthorsTableData(samples, emptyRowsCount);
  return (
    <Table
      className="shadow-lg rounded-lg"
      columns={columns}
      dataSource={samples?.length === 0 ? [] : dataWithEmptyRows}
      pagination={{
        pageSize: PATRON_PAGE_SIZE,
      }}
      bordered
    />
  );
};

export default AuthorsTable;
