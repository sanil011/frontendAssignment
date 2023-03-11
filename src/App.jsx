import Header from "./component/header"
import { useState } from "react";
import { Alert, Backdrop, CircularProgress, Snackbar } from "@mui/material";
import Home from "./page/home"
import History from "./page/history";
import { useGlobalContext } from './context/globalContext'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
function App() {
  const { loading, alert, setAlert } = useGlobalContext();
  const handleAlertClose = () => {
    setAlert({
      flag: false,
      type: "",
      msg: "",
    });
  };
  return (
    <BrowserRouter>
      <div>
        <Backdrop style={{ zIndex: "10000", color: "#fff" }} open={loading}>
          <CircularProgress />
        </Backdrop>
        <Snackbar open={alert?.flag} anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={5000} onClose={handleAlertClose}>
          <Alert onClose={handleAlertClose} severity={alert?.type}>
            {alert?.msg}
          </Alert>
        </Snackbar>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
