import { Alert, Container, Snackbar } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import WebAdmin from "./screens/webadmin/WebAdmin";
import WebDriver from "./screens/WebDriver";
import WebTracker from "./screens/WebTracker";
import { COLORS } from "./utils/colors";

function App() {

  return (
    <Container
      style={{
        padding: 0,
        margin: "unset",
        maxWidth: "100%",
        backgroundColor: COLORS.primary,
      }}
    >
        <Routes>
          <Route path={"/"} element={<WebTracker />} />
          <Route path={"/driver"} element={<WebDriver />} />
          <Route path={"/admin"} element={<WebAdmin />} />
        </Routes>
    </Container>
  );
}

export default App;
