import { Button } from "antd";
import UpdateBook from "../Books/UpdateBook";
import BookCopiesTable from "./BookCopiesTable";

function Book() {
  return (
    <div>
      <UpdateBook />
      <div>Book copies</div>
      <Button>Add copies</Button>
      <BookCopiesTable />
    </div>
  );
}

export default Book;
