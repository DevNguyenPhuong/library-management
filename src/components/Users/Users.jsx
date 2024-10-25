import { Button } from "antd";
import UsersList from "./UsersList";
import { HiPlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function Users() {
  const navigate = useNavigate();
  return (
    <>
      <Button
        type="primary"
        icon={<HiPlus />}
        onClick={() => navigate("/addUser")}
      >
        Add user
      </Button>
      <UsersList />
    </>
  );
}

export default Users;
