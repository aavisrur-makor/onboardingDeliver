import { Container, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import StepperFormComplex from "./components/StepperFormComplex";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SimpleForm from "./components/SimpleForm";
import FinaleBox from "./components/FinaleBox";
import useEventListener from "./hooks/useEventListener";
import { useDispatch } from "react-redux";
import { getMetaDataAsync } from "./redux/slices/metaDataSlice";
import { getGapiLocation } from "./redux/slices/singleOnboardingSlice";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    "& Mui-error": {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.error.main,
    },
    padding: "0",
    [theme.breakpoints.down("md")]: { padding: "1rem" },
  },
}));

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const appRef = useEventListener("copy", (e) => {
    e.preventDefault();
  });
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    var crd = pos.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    dispatch(
      getGapiLocation(
        crd.latitude,
        crd.longitude,
        "registered_office_address_gapi"
      )
    );
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(success, error, options);
  useEffect(() => {
    dispatch(getMetaDataAsync());
  }, []);

  return (
    <Container maxWidth="md" className={classes.mainContainer} ref={appRef}>
      <Router>
        <Routes>
          <Route path="/" element={<SimpleForm />}></Route>
          <Route path="/:uuid" element={<StepperFormComplex />}></Route>
          <Route path="/finale" element={<FinaleBox />}></Route>
        </Routes>
      </Router>
      <FinaleBox />
    </Container>
  );
};

export default App;
