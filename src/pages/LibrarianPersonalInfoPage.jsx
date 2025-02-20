import UpdateUserPassword from "../components/CurrentUser/UpdateUserPassword";
import UpdateCurrentLibrarianForm from "../components/Librarians/UpdateCurrentLibrarianForm";

function LibrarianPersonalInfoPage() {
  return (
    <>
      <UpdateCurrentLibrarianForm />
      <UpdateUserPassword />
    </>
  );
}

export default LibrarianPersonalInfoPage;
