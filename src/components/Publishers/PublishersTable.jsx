import { LoadingOutlined } from "@ant-design/icons";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { Result, Spin, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { getAllData, deleteData } from "../../services/apiLibrary";
import { PATRON_PAGE_SIZE } from "../../utils/constants";
import { preparePublishersTableData } from "../Table/tableUtils";
import publishersCols from "./publishersCols";
import { toast } from "react-hot-toast";

const PublishersTable = () => {
  const {
    data: samples,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getAllData(`/publishers`),
    queryKey: ["publishers"],
    select: (data) => data.sort((a, b) => a.name.localeCompare(b.name)),
  });

  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { mutate: deletePublisher } = useMutation({
    mutationFn: (id) => deleteData(`/publishers/${id}`),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`publishers`],
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
    navigate(`/publishers/${id}`);
  };

  const handleDelete = (id) => {
    deletePublisher(id);
  };

  const columns = publishersCols(handleEdit, handleDelete);
  const emptyRowsCount = Math.max(
    0,
    PATRON_PAGE_SIZE - (samples?.length % PATRON_PAGE_SIZE)
  );

  const dataWithEmptyRows = preparePublishersTableData(samples, emptyRowsCount);
  return (
    <Table
      className="shadow-lg rounded-lg"
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

export default PublishersTable;
