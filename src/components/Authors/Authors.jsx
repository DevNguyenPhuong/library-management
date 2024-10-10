import { Button } from "antd";
import AuthorsTable from "./AuthorsTable";
import { HiPlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function Authors() {
  const navigate=useNavigate();
  return <div>
    <Button className="mb-4" type="primary" icon={<HiPlus />} onClick={()=>navigate(`/addAuthor`)}>
      Add Author
    </Button>
    <AuthorsTable />
  </div>;
}

export default Authors;
