import React from "react";

import GlobalStyles from "./styles/global";
import "bootstrap/dist/css/bootstrap.min.css";

import Crud from "./pages/Crud";

function App() {
  return (
    <>
      <GlobalStyles />
      <Crud />
    </>
  );
}

export default App;
