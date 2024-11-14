import { Alert, Input, Select, Spin, Table } from "antd";
import { PATRON_FINE_TABLE_PAGE_SIZE } from "../../utils/constants";
import { useMemo, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { deleteData, getAllData, updateData } from "../../services/apiLibrary";
import { getFineTableColumns } from "./FineTableColumn";
import toast from "react-hot-toast";

function PatronFineTable() {
  const [searchText, setSearchText] = useState("");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("all");
  const { patronID } = useParams();
  const queryClient = useQueryClient();
  const {
    data: fines,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getAllData(`/fines/${patronID}`),
    queryKey: ["fines", patronID],
  });

  const { mutate: updateFine, isPending: isPendingUpdateFine } = useMutation({
    mutationFn: ({ fineId, updatedFine }) =>
      updateData(`/fines/${fineId}`, updatedFine),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`fines`, patronID],
      });
      toast.success("update Success");
    },
    onError: (error) => {
      const { response } = error;
      toast.error(response?.data.message || "Opps, cannot perform this action");
    },
  });

  const { mutate: deleteFine, isPending: isPendingDeleteFine } = useMutation({
    mutationFn: (id) => deleteData(`/fines/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`fines`, patronID],
      });
      toast.success("success");
    },

    onError: (error) => {
      const { response } = error;
      toast.error(response?.data.message || "Opps, cannot perform this action");
    },
  });

  const filteredFines = useMemo(() => {
    if (!fines) return [];

    return fines.filter((item) => {
      const loanId = item.loan?.id?.toLowerCase() || "";
      const paymentStatus =
        item?.paymentStatus?.toLowerCase().replace("_", " ") || "";

      const matchesSearchText = loanId.includes(searchText.toLowerCase());

      const matchesPaymentStatus =
        paymentStatusFilter === "all" ||
        (paymentStatusFilter === "paid" && paymentStatus === "paid") ||
        (paymentStatusFilter === "unpaid" && paymentStatus === "unpaid");

      return matchesSearchText && matchesPaymentStatus;
    });
  }, [fines, searchText, paymentStatusFilter]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-24">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description="There was an error loading the data. Please try again later."
        type="error"
        showIcon
      />
    );
  }

  const columns = getFineTableColumns({
    deleteFine,
    updateFine,
    isLoading: isPendingDeleteFine || isPendingUpdateFine,
  });

  console.log(fines);

  return (
    <>
      <div className="mb-4 flex items-center">
        <Input
          placeholder="Search by loan"
          prefix={<SearchOutlined className="text-gray-400" />}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full max-w-md mr-4"
        />
        <Select
          defaultValue="all"
          onChange={(value) => setPaymentStatusFilter(value)}
          className="w-40"
        >
          <Select.Option value="all">All</Select.Option>
          <Select.Option value="paid">Paid</Select.Option>
          <Select.Option value="unpaid">Unpaid</Select.Option>
        </Select>
      </div>
      <Table
        columns={columns}
        dataSource={filteredFines}
        rowKey="id"
        pagination={{
          pageSize: PATRON_FINE_TABLE_PAGE_SIZE,
        }}
        className="shadow-sm"
      />
    </>
  );
}

export default PatronFineTable;
