import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { makeStyles, TextField } from "@material-ui/core";
import FieldContext from "../context/fields";
import AuthContext from "../context/auth";
import { BASE_URL, END_POINT } from "../constants";
import validate from "../utils/validate";

import { useDebouncedCallback } from "use-debounce";
import { useDispatch, useSelector } from "react-redux";
import { setOnboardingContactField } from "../redux/slices/singleOnboardingSlice";

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
      padding: "16.5px 14px",
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

const ContactsDispatcherField = (props) => {
  const value = useSelector((state) =>
    props.subIndex
      ? state.onboarding.current.contacts[props.index][props.id][props.subIndex]
      : state.onboarding.current.contacts[props.index][props.id]
  );

  const classes = useStyles();
  const dispatch = useDispatch();
  const handleChange = async (e) => {
    //Need to think how to send to the server.
    console.log("VALUEEE!!!", e.target.value);
    props.handleChange(e, props.index, props.objectField);
  };

  const debounced = useDebouncedCallback(handleChange, 400);
  if (props.objectField) {
    console.log(
      "valuess",

      value[0][props.objectField]
    );
  }
  if (props.id === "contact_email") {
    console.log("value", value[0], props.objectField, props.subIndex);
  }
  return (
    <TextField
      className={classes.textField}
      id={props.id}
      type={props.type}
      fullWidth
      required={props.required}
      onChange={(e) => {
        console.log("FACKING NOOB", props.index);
        dispatch(
          setOnboardingContactField({
            id: props.id,
            value: e.target.value,
            contactIndex: props.index,
            objectField: props.objectField,
          })
        );
        debounced(e);
      }}
      inputProps={{ style: { padding: 2 } }}
      label={props.label}
      value={
        props.objectField
          ? value[0][props.objectField]
          : props.id === "contact_email"
          ? value[props.index]
          : value
      }
      variant="outlined"
      rows={props.rows}
      multiline={props.multiline && props.multiline}
    />
  );
};

export default ContactsDispatcherField;
