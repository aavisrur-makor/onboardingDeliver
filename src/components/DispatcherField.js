import { useState, useContext } from "react";
import axios from "axios";
import { makeStyles, TextField } from "@material-ui/core";
import FieldContext from "../context/fields";
import AuthContext from "../context/auth";
import { BASE_URL, END_POINT } from "../constants";
import validate from "../utils/validate";

import { useDebouncedCallback } from "use-debounce";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentOnboardingFields,
  updateFieldOnboarding,
  updateOnBoardingField,
} from "../redux/slices/singleOnboardingSlice";
import { setAuthField } from "../redux/slices/authSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    border: "0px",
    "& .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-fullWidth.MuiInputBase-formControl":
      {
        border: "0px",
      },
    "& .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-fullWidth.MuiInputBase-formControl":
      {
        borderRadius: "0",
      },
    "& .MuiInputLabel-outlined": {
      textAlign: "center",

      letterSpacing: "0px",
      color: "#8A8A8A",
      opacity: "1",
    },
  },
  textField: {
    "& > .MuiInputLabel-root": {
      [theme.breakpoints.down("sm")]: { fontSize: "13px" },
    },
    "& .MuiOutlinedInput-root": {
      padding: "18.5px 14px",
    },
    "& input[type=number]": {
      "-moz-appearance": "textfield",
    },
    "& input[type=number]::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "& input[type=number]::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
  },
}));
// {"name":"11 Derech Menachem Begin","location":{"lat":100.123456,"lon":-90.987654}}

const DispatcherField = (props) => {
  const value = useSelector((state) => state.onboarding.current[props.id]);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const classes = useStyles();

  const handleChange = async (e) => {
    if (props.isRequired) {
      validate(null, value, setError);
    }
    let fieldToUpdate = {
      [e.target.id]: value,
    };
    dispatch(updateFieldOnboarding(fieldToUpdate));
  };

  const debounced = useDebouncedCallback(handleChange, 400);
  return (
    <TextField
      className={classes.textField}
      id={props.id}
      type={props.type}
      fullWidth
      required={props.required}
      onChange={(e) => {
        dispatch(
          setCurrentOnboardingFields({ id: props.id, value: e.target.value })
        );
        debounced(e);
      }}
      inputProps={{ style: { padding: 2 } }}
      label={value ? "" : props.label}
      value={value}
      variant="outlined"
      rows={props.rows}
      multiline={props.multiline && props.multiline}
    />
  );
};

export default DispatcherField;
