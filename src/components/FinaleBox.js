import {
  Container,
  makeStyles,
  Box,
  Button,
  Typography,
  Modal,
} from "@material-ui/core";
import { useStyles } from "../styles/FinalePage";
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

const FinaleBox = () => {
  const classes = useStyles();
  const handleClose = () => {};
  return (
    <Modal open={true} className={classes.container}>
      <Box className={classes.subContainer}>
        <Typography
          style={{ font: "normal normal normal 24px/28px Work Sans" }}
        >
          Your application is successfully sent
        </Typography>
        <Button className={classes.Button} onClick={handleClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default FinaleBox;
