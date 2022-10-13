import { useState } from "react";
import { makeStyles, TextField } from "@material-ui/core";
import validate from "../utils/validate";
import validator from "validator";
import { useDebouncedCallback } from "use-debounce";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentOnboardingFields,
  updateFieldOnboarding,
} from "../redux/slices/singleOnboardingSlice";
import { setValidation } from "../redux/slices/validationSlice";

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

const DispatcherField = (props) => {
  const value = useSelector((state) => state.onboarding.current[props.id]);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const classes = useStyles();

  const handleChange = async (e) => {
    let fieldToUpdate = {};
    if (validator.isEmpty(e.target.value)) {
			  setError('This field is required')
				dispatch(setValidation({  field: e.target.id, value: false }))
		} else {
		    dispatch(setValidation({  field: e.target.id, value: true }))
			setError('')
		}
    if (props.type === "number") {
      fieldToUpdate = {
        [e.target.id]: +value,
      };
    } else {
      fieldToUpdate = {
        [e.target.id]: value,
      };
    }
    dispatch(updateFieldOnboarding(fieldToUpdate));
  };

  const debounced = useDebouncedCallback(handleChange, 400);
  return (
    <TextField
      className={classes.textField}
      id={props.id}
      type={props.type}
      fullWidth
      error={error}
      required={props.required}
      onChange={(e) => {

        dispatch(
          setCurrentOnboardingFields({ id: props.id, value: e.target.value })
        );
        debounced(e);
      }}
      inputProps={{ style: { padding: props.id==="license_number"? 0: 2 } }}
      label={props.label}
      helperText={error&&error}
      value={value ? value : ""}
      variant="outlined"
      rows={props.rows}
      multiline={props.multiline && props.multiline}
    />
  );
};

export default DispatcherField;
