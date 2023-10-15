import { Typography } from "@mui/material";
import Main from "./components/Main/Main";

function App() {
  return (
    <>
      <Main />
      <Typography
        bgcolor={"#008000"}
        color={"white"}
        m={-1}
        p={2}
        textAlign={"center"}
        variant="h6"
      >
        Copyright © 2023. Developed By <b> "Huzaifa Qaiser"</b>
      </Typography>
    </>
  );
}

export default App;
