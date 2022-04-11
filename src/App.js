import { Container, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import StepperFormComplex from "./components/StepperFormComplex";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SimpleForm from "./components/SimpleForm";
import FinaleBox from "./components/FinaleBox";
import useEventListener from "./hooks/useEventListener";
import { useDispatch, useSelector } from "react-redux";
import { getMetaDataAsync } from "./redux/slices/metaDataSlice";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    "& Mui-error": {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.error.main,
    },
    padding: "0",
    // [theme.breakpoints.down("md")]: { padding: "1rem" },
  },
}));

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const uuid = useSelector((state) => state.auth.uuid);
  const appRef = useEventListener("copy", (e) => {
    e.preventDefault();
  });

  useEffect(() => {
    dispatch(getMetaDataAsync());
  }, []);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Container fixed className={classes.mainContainer} ref={appRef}>
        <Router>
          <Routes>
            <Route path="/" element={<SimpleForm />}></Route>

            <Route path="/:uuid" element={<StepperFormComplex />}></Route>

            <Route path="/finale" element={<FinaleBox />}></Route>
          </Routes>
        </Router>
        <FinaleBox />
      </Container>
    </MuiPickersUtilsProvider>
  );
};

export default App;
