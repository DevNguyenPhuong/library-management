import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import UserItem from "./UserItem";
import { deleteData, getAllData } from "../../services/apiLibrary";
import { Empty, Result, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function UsersList() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getAllData("/users"),
    queryKey: ["users"],
  });

  const { mutate } = useMutation({
    mutationFn: (id) => deleteData(`/users/${id}`),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`users`],
      });
      toast.success("users deleted");
    },

    onError: (error) => {
      const { response } = error;
      toast.error(response?.data.message || "Opps, cannot perform this action");
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin></Spin>
      </div>
    );
  }

  if (error) {
    return (
      <Result
        status="error"
        title="Error"
        subTitle="Sorry, there was an error loading the  data."
      />
    );
  }

  if (users?.length === 0 || !users)
    return (
      <div className="min-h-[80vh] flex justify-center items-center">
        <Empty></Empty>
      </div>
    );

  const handleEdit = (id) => {
    navigate(`${id}`);
  };

  const handleDelete = (id) => {
    mutate(id);
  };
  console.log(users);

  return (
    <div className="p-4 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {users?.map((user) => (
          <UserItem
            key={user.id}
            user={user}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default UsersList;
