import { Button } from "antd";
import { HiPlus } from "react-icons/hi";
import CategoriesTable from "./CategoriesTable";
import { useNavigate } from "react-router-dom";

function Categories() {
  const navigate=useNavigate();
  return <div>
    <Button className="mb-4" type="primary" icon={<HiPlus />} onClick={()=>navigate(`/addCategories`)}>
      Add Categories
    </Button>
    <CategoriesTable/>
  </div>;
}

export default Categories;
