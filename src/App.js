import { Container, makeStyles } from "@material-ui/core";
import React, { useState, useEffect, useRef, useContext } from "react";
import StepperFormComplex from "./components/BigForm/StepperFormComplex";
import axios from "axios";
import fileDataActions from "./components/store/fileDataSlice";
import fieldDataActions from "./components/store/fieldDataSlice";

import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import SimpleForm from "./components/BigForm";
import { Context } from "./context";
import FileContext, { initialState as initialFileState } from "./context/files";
import FieldContext, {
  initialState as initialFieldState,
} from "./context/fields";
import AuthContext, { initialState as initialAuthState } from "./context/auth";
import ChiefProvider from "./components/ChiefProvider";
import FinaleBox from "./components/FinaleBox";
import useEventListener from "./hooks/useEventListener";

const useStyles = makeStyles({
  container: {
    width: "50%",
    backgroundColor: "white",
  },
});

const App = () => {
  const classes = useStyles();
  const appRef = useEventListener("copy", (e) => {
    e.preventDefault();
  });

  useEffect(() => {
    console.log("PROCESS< PORT", process.env.REACT_APP_PORT);
  });

  // const { fieldState, setFieldState } = useContext(FieldContext);
  // const { fileState, setFileState } = useContext(FileContext);
  // const { authState, setAuthState } = useContext(AuthContext);
  // const params = useParams();

  // const [error, setError] = useState('');

  // useEffect(() => {
  //   console.log('app useefect', params);
  //   if (params.uuid) {
  //     console.log('uuid useeffect', params.uuid);
  //     setAuthState((prev) => ({ ...prev, uuid: params.uuid }));
  //     console.log('uuid useeffect again', params.uuid, authState);
  //   }
  // }, [authState]);

  return (
    // <ChiefProvider>
    <Container md={6} className={classes.container} ref={appRef}>
      {/* <Router>
        <Routes>
          <Route exact path='/' element={<SimpleForm />}></Route>
          <Route exact path='/:uuid' element={<StepperFormComplex />}></Route>
          <Route exact path='/finale' element={<FinaleBox />}></Route>
        </Routes>
      </Router> */}
      <FinaleBox />
    </Container>
    // </ChiefProvider>
  );
};

export default App;
