import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { LoadingOutlined } from "@ant-design/icons";
import { Result, Spin, Table, Button, Space, Tooltip } from "antd";
import { PATRON_PAGE_SIZE } from "../../utils/constants";
import { toast } from "react-hot-toast";
import { getAllData, deleteData } from "../../services/apiLibrary";
import { getPatronColumns } from "./patronColumns";
import { prepareTableData } from "../Table/tableUtils";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ReusableDataTable } from "../UI/Table/ReuseableDataTable";


function PatronsTable() {
  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Date of Birth", accessor: "dob" },
    { header: "Gender", accessor: "gender" },
    { header: "Currently Borrowed", accessor: "currentlyBorrowed" },
    { header: "Membership Date", accessor: "membershipDate" },
    { header: "Actions", accessor: "actions" },
  ];

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


  const handleDetail = (id) => {
    navigate(`/patrons/${id}`);
  };

  const handleDelete = (id) => {
    deletePatron(id)
  };

  const renderRow = (patrons, columns) => (
    <tr key={patrons.id}>
      {columns.map((column) => (
        <td
          key={column.accessor}
          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
        >
          {column.accessor === "name" && (
            <span>{patrons.name}</span>
          )}
          {column.accessor === "dob" && (
            <span>{patrons.dob}</span>
          )}
          {column.accessor === "gender" && (
            <span>{patrons.gender}</span>
          )}
          {column.accessor === "currentlyBorrowed" && (
            <span>{patrons.currentlyBorrowed}</span>
          )}
          {column.accessor === "membershipDate" && (
            <span>{patrons.membershipDate}</span>
          )}
          {column.accessor === "actions" && (
            <Space size="middle">
              <Tooltip title="Edit">
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => handleDetail(patrons.id)}
                />
              </Tooltip>
              <Tooltip title="Delete">
                <Button
                  type="primary"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(patrons.id)}
                />
              </Tooltip>
            </Space>
          )}
          {![
            "name",
            "dob",
            "gender",
            "currentlyBorrowed",
            "membershipDate",
            "actions",
          ].includes(column.accessor) && patrons[column.accessor]}
        </td>
      ))}
    </tr>
  );


  return (
    <>
      <ReusableDataTable
        queryFn={({ page, size, query }) =>
          getAllData(`/patrons?page=${page}&size=${PATRON_PAGE_SIZE}&query=${query}`)
        }
        searchPlaceHolder={"Search by name..."}
        queryKey={["patrons"]}
        columns={columns}
        renderRow={renderRow}
        pageSize={10}
      />
    </>


  );
}

export default PatronsTable;
