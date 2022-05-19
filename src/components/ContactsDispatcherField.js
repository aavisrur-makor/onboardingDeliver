import { makeStyles, TextField } from "@material-ui/core";

import { useDebouncedCallback } from "use-debounce";
import { useDispatch, useSelector } from "react-redux";
import { setOnboardingContactField } from "../redux/slices/singleOnboardingSlice";
import validator from "validator";
import { NightsStay } from "@material-ui/icons";

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
      ? state.onboarding.current.contacts[props.index][props.id][
          props.subIndex
        ][props.objectField]
      : state.onboarding.current.contacts[props.index][props.id]
  );

  const classes = useStyles();
  const dispatch = useDispatch();
  const handleChange = async (e) => {
    props.handleChange(e, props.index, props.objectField);
  };

  const debounced = useDebouncedCallback(handleChange, 400);
  return (
    <TextField
      className={classes.textField}
      id={props.id}
      type={props.type}
      fullWidth
      required={props.required}
      error={props.id === "email" && !props.error}
      helperText={!props.error && props.helperText}
      onChange={(e) => {
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
        props.objectField && value
          ? value[0][props.objectField]
          : props.id === "email" && value
          ? value[0]
          : value
          ? value
          : ""
      }
      variant="outlined"
      rows={props.rows}
      multiline={props.multiline && props.multiline}
    />
  );
};

export default ContactsDispatcherField;
