import {
  Container,
  makeStyles,
  Box,
  Button,
  Typography,
} from "@material-ui/core";
// import { useState, useEffect } from "react";
// import StepperFormComplex from "./components/BigForm/StepperFormComplex";
// import axios from "axios";
// import fileDataActions from "./components/store/fileDataSlice";
// import fieldDataActions from "./components/store/fieldDataSlice";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Routes,
//   Link,
// } from "react-router-dom";
// import SimpleForm from "./components/BigForm";
// import { Context } from "./context";
// import FileContext, { initialState as initialFileState } from "./context/files";
// import FieldContext, {
//   initialState as initialFieldState,
// } from "./context/fields";
// import AuthContext, { initialState as initialAuthState } from "./context/auth";
// import ChiefProvider from "./components/ChiefProvider";

const useStyles = makeStyles({
  container: {
    width: "50%",
    backgroundColor: "white",
  },
});

const FinaleBox = () => {
  const handleClose = () => {};
  return (
    <Box>
      <Typography>Your application is successfully sent</Typography>
      <Button onClick={handleClose}>Close</Button>
    </Box>
  );
};

export default FinaleBox;
