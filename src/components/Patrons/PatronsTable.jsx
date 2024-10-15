import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { LoadingOutlined } from "@ant-design/icons";
import { Result, Spin, Table } from "antd";
import { PATRON_PAGE_SIZE } from "../../utils/constants";
import { toast } from "react-hot-toast";
import { getAllData,deleteData } from "../../services/apiLibrary";
import { getPatronColumns } from "./patronColumns";
import { prepareTableData } from "../Table/tableUtils";


function PatronsTable() {
  const {
    data: samples,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getAllData(`/patrons`),
    queryKey: ["patrons"],
    select: data => data.sort((a, b) => a.name.localeCompare(b.name))
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: deletePatron } = useMutation({
    mutationFn: (id) => deleteData(`/patrons/${id}`),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`patrons`],
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
    navigate(`/patrons/${id}`);
  };

  const handleDelete = (id) => {
    deletePatron(id)
  };

  const columns = getPatronColumns(
    handleEdit,
    handleDelete
  );

  const emptyRowsCount = Math.max(
    0,
    PATRON_PAGE_SIZE - (samples.length % PATRON_PAGE_SIZE)
  );

  const dataWithEmptyRows = prepareTableData(samples, emptyRowsCount);

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
}

export default PatronsTable;
