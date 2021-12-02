import { Container, makeStyles } from "@material-ui/core";
import { useState, useEffect } from "react";
import StepperFormComplex from "./components/BigForm/StepperFormComplex";
import axios from "axios";
import fileDataActions from "./components/store/fileDataSlice";
import fieldDataActions from "./components/store/fieldDataSlice";
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

const useStyles = makeStyles({
  container: {
    width: "50%",
    backgroundColor: "white",
  },
});

const App = () => {
  // const dispatch = useDispatch();
  // const state = useSelector((state) => state.fieldData);
  const classes = useStyles();
  // const [isLoggedIn, setLoggedIn] = useState(false);
  // useEffect(() => {
  //   console.log("app launched");
  // }, []);

  // useEffect(()=>{
  //   axios.all([axios.get('http://10.0.0.197:3030/api/onboarding/289334a4-50f3-11ec-be49-d08e7912923c'),
  //     axios.get('http://10.0.0.197:3030/api/file/289334a4-50f3-11ec-be49-d08e7912923c')])
  //     .then(axios.spread(function(res1,res2){
  //       const textFields = res1.data[0];
  //       const fileFields = {};
  //       res2.data.forEach(file => {
  //         fileFields[file.field_name] = file.file_name;
  //       });
  //      const fullData = {...textFields, ...fileFields};
  //      dispatch(formDataActions.uploadFields(fullData));
  // }))})
  return (
    <ChiefProvider>
      <Container md={6} className={classes.container}>
        {/* {!false ? <SimpleForm /> : <StepperFormComplex />} */}

        <Router>
          <Routes>
            {/* <Route exact path="/" element={<SimpleForm />}></Route> */}
            <Route exact path="/" element={<SimpleForm />}></Route>
            <Route path="/:uuid" element={<StepperFormComplex />}></Route>
            <Route path="/finale" element={<FinaleBox />}></Route>
          </Routes>
        </Router>
      </Container>
    </ChiefProvider>
  );
};

export default App;
