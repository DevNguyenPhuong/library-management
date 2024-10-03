import { Button } from "antd";
import PatronsTable from "./PatronsTable";
import { HiPlus } from "react-icons/hi";

function Patrons() {
  return (
    <>
      <Button className="mb-4" type="primary" icon={<HiPlus />}>
        Add patron
      </Button>
      <PatronsTable />
    </>
  );
}

export default Patrons;
