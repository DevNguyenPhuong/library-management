import { Button } from "antd";
import BooksTable from "./BooksTable";
import { HiOutlinePlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function Books() {
  const navigate = useNavigate();
  return (
    <>
      <Button
        onClick={() => navigate("/addBook")}
        type="primary"
        icon={<HiOutlinePlus />}
      >
        New book
      </Button>
      {/* <BooksTable></BooksTable> */}
    </>
  );
}

export default Books;
