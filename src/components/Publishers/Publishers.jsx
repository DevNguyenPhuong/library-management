import { Button } from "antd";
import { HiPlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import PublishersTable from "./PublishersTable";

function Publishers() {
  const navigate=useNavigate();
  return <div>
    <Button className="mb-4" type="primary" icon={<HiPlus />} onClick={()=>navigate(`/addPublisher`)}>
      Add Publishers
    </Button>
    <PublishersTable/>
  </div>;
}

export default Publishers;
