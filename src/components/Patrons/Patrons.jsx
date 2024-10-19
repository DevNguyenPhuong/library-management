import { Button } from "antd";
import PatronsTable from "./PatronsTable";
import { HiPlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function Patrons() {
  const navigate = useNavigate();
  return (
    <>
      <Button
        className="mb-4"
        type="primary"
        icon={<HiPlus />}
        onClick={() => navigate(`/addPatron`)}
      >
        New Patron
      </Button>
      <PatronsTable />
    </>
  );
}

export default Patrons;
