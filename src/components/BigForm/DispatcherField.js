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
  textField: {
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
  },
});
const DispatcherField = (props) => {
  const { fieldState, setFieldState } = useContext(FieldContext);
  const { authState, setAuthState } = useContext(AuthContext);
  // const ownState = useSelector((state) => state[props.formState[props.id]]);
  // const [isSearching, setIsSearching] = useState(false);
  const classes = useStyles();
  // useEffect(() => {
  //   console.log('dispatcher ownState', props);
  // }, [props]);
  // const dispatch = useDispatch();

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
        `http://10.0.0.197:3030/api/onboarding/6ba26ce7-536b-11ec-be49-d08e7912923c`,
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
    // }
    // try {
    //   await axios.put(
    //     "http://10.0.0.197:3030/api/onboarding/289334a4-50f3-11ec-be49-d08e7912923c",
    //     { fieldToUpdate }
    //   );
    // } catch (err) {
    //   console.log(err);
    // }
    // dispatch(
    //   fieldDataSlice.actions.putFile({
    //     id: props.id,
    //     value: e.target.value,
    //   })
    // );

    // axios.put('randomURLasdasdsadsad', data);
  };

  // const debouncedHandleChange = debounce(handleChange, 50);

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
