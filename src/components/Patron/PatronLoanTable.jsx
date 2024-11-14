import { SearchOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert, Input, Spin, Table } from "antd";
import { addDays, format, parseISO } from "date-fns";
import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { deleteData, getAllData, updateData } from "../../services/apiLibrary";
import CreateFineModal from "./CreateFineModal";
import { getLoanTableColumns } from "./LoanTableColumns";
import { PATRON_LOAN_TABLE_PAGE_SIZE } from "../../utils/constants";

export default function PatronLoanTable() {
  const { patronID } = useParams();
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentLoan, setCurrentLoan] = useState(null);
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryFn: () => getAllData(`/patrons/${patronID}/loans`),
    queryKey: ["loans", patronID],
  });

  const { mutate: updateLoan, isPending: isPendingUpdateLoan } = useMutation({
    mutationFn: ({ loanId, updatedLoan }) =>
      updateData(`/loans/${loanId}`, updatedLoan),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`loans`, patronID],
      });
      toast.success("update Success");
    },
    onError: (error) => {
      const { response } = error;
      toast.error(response?.data.message || "Opps, cannot perform this action");
    },
  });

  const { mutate: deleteLoan, isPending: isPendingDelete } = useMutation({
    mutationFn: (id) => deleteData(`/loans/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`loans`, patronID],
      });

      queryClient.invalidateQueries({
        queryKey: [`fines`, patronID],
      });
    },

    onError: (error) => {
      const { response } = error;
      toast.error(response?.data.message || "Opps, cannot perform this action");
    },
  });

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter(
      (item) =>
        item.bookCopy.title.toLowerCase().includes(searchText.toLowerCase())
      //  ||item.patron.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [data, searchText]);

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

  const columns = getLoanTableColumns({
    onUpdate,
    deleteLoan,
    showModal,
    isLoading: isPendingDelete || isPendingUpdateLoan,
  });

  function onUpdate(oldLoan, type) {
    const updatedLoan = {
      loanDate: oldLoan.loanDate,
      returnDate: type === "RETURNED" ? format(new Date(), "yyyy-MM-dd") : null,
      dueDate:
        type === "RETURNED"
          ? oldLoan.dueDate
          : format(addDays(parseISO(oldLoan.dueDate), 7), "yyyy-MM-dd"),
      status: type === "RETURNED" ? "RETURNED" : "BORROWED",
      patronId: oldLoan.patron.id,
      bookCopyId: oldLoan.bookCopy.id,
      userId: oldLoan.user.id,
    };

    updateLoan({ loanId: oldLoan.id, updatedLoan });
  }

  function showModal(record) {
    setCurrentLoan(record);
    setIsModalVisible(true);
  }

  return (
    <>
      <div className="mb-4">
        <Input
          placeholder="Search by book title"
          prefix={<SearchOutlined className="text-gray-400" />}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full max-w-md"
        />
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={{
          pageSize: PATRON_LOAN_TABLE_PAGE_SIZE,
        }}
        className="shadow-sm"
      />

      <CreateFineModal
        open={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onChangeModalVisible={setIsModalVisible}
        loan={currentLoan}
      />
    </>
  );
}
