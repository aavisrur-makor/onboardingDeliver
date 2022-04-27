import { TextField } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles((theme) => ({
  root: {},
  textField: {
    "& > .MuiInputLabel-root": {
      [theme.breakpoints.down("sm")]: { fontSize: "13px" },
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
function DynamicTextField(props) {
  const classes = useStyles();
  const value = useSelector(
    (state) => state.onboarding.current?.contacts[props.index][props.id]
  );
  console.log("Value", value, props.index, props.id);
  return (
    <TextField
      required={props.required}
      className={classes.textField}
      fullWidth
      onChange={props.onChange}
      value={value ? value : ""}
      label={props.label}
      type={props.type}
      id={props.id}
      variant="outlined"
    />
  );
}

export default DynamicTextField;
