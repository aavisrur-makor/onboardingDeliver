import { useState, useEffect, useContext, useMemo } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import fieldDataSlice from "../store/fileDataSlice";
import { StyledTextField } from "./PseudoForm";
// import useDebounce from '../../hooks/useDebounce';
// import debounce from 'lodash.debounce';
// import { DebounceInput } from 'react-debounce-input';
import { makeStyles, TextField } from "@material-ui/core";
import FieldContext from "../../context/fields";
import AuthContext from "../../context/auth";

import { useDebouncedCallback } from "use-debounce";

// const useStyles = makeStyles({textField:{
// '&:'
// }})
const useStyles = makeStyles({
  root: {
    // borderRadius: "0",
    border: "0px",
    "& .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-fullWidth.MuiInputBase-formControl":
      {
        // borderRadius: "0",
        border: "0px",
      },
    "& .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-fullWidth.MuiInputBase-formControl":
      {
        borderRadius: "0",
        // border: "1px solid gray",
      },
    "& .MuiInputLabel-outlined": {
      textAlign: "center",
      font: "normal normal normal 16px/19px Work Sans",
      letterSpacing: "0px",
      color: "#8A8A8A",
      opacity: "1",
    },
  },
});
const DispatcherField = (props) => {
  const { fieldState, setFieldState } = useContext(FieldContext);
  const { authState, setAuthState } = useContext(AuthContext);
  const classes = useStyles();

  const handleChange = async (e) => {
    console.log("handling change in dispatcher", e.target.value);
    // e.preventDefault();
    //////redux updat
    const fieldToUpdate = {
      field: e.target.id,
      value: fieldState[e.target.id],
    };
    // console.log('debounce', fieldToUpdate);
    console.log("about to putting in fields", authState);
    // if (authState.uuid !== "") {
    console.log("putting in fields");
    axios
      .put(
        `http://10.0.0.197:3030/api/onboarding/${authState.uuid}`,
        {
          fieldToUpdate,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          console.log("200 in fields", res.data.progress);
          console.log("200 in fields", authState.progress);
          setAuthState((prev) => ({
            ...authState,
            progress: res.data.progress,
          }));
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
 
  };


  const debounced = useDebouncedCallback(handleChange, 400);

  return (
    <TextField
      className={classes.textField}
      id={props.id}
      // InputLabelProps={{
      //   style: { color: "#1a1616" },
      // }}
      fullWidth
      // onChange={debouncedHandleChange}
      onChange={(e) => {
        setFieldState((prev) => {
          console.log("previous field state", e.target.value);
          return {
            ...prev,
            [props.id]: e.target.value,
          };
        });
        debounced(e);
      }}
      label={props.label}
      // value={props.value}
      value={fieldState[props.id]}
      variant="outlined"
    />
  );
};

export default DispatcherField;
