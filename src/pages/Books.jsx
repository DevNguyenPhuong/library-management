import { Button } from "@mui/material";

function Books() {
  //call enviroment variable
  console.log(import.meta.env.VITE_BASE_URL);
  return (
    <>
      <div>Books page</div>
      <Button variant="contained">MUI btn</Button>
    </>
  );
}

export default Books;
