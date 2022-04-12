import React, { useContext, useEffect, useState } from "react";
import { TextField, useMediaQuery } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
// import countries from "../data/countries";
import { withStyles } from "@material-ui/core";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setFormFields } from "../../redux/slices/smallFormSlice";

const SmallFormDialingCode = (props) => {
  const [countryDialCode, setCountryDialCode] = useState({});
  const [countryDialCodeInput, setCountryDialCodeInput] = useState("");
  const countries = useSelector((state) => state.meta.countries);
  const countriesMap = useSelector((state) => state.meta.countriesMap);

  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(
  //     setFormFields({ id: "dialing_code", value: countryDialCodeInput })
  //   );
  // }, [countryDialCodeInput]);

  const handleChange = (e, inputValue) => {
    setCountryDialCode(inputValue);
    props.handleChange(e, "", props.index);
  };
  console.log("country", countryDialCodeInput);
  return (
    <StyledAutoComplete
      id="contact_phone"
      name="contact_phone"
      label={"Dial Code"}
      options={countries}
      onBlur={props.handleBlur}
      disableClearable
      className={props.className}
      autoHighlight
      fullWidth
      getOptionLabel={(option) =>
        option.dialing_code ? option.dialing_code : ""
      }
      onChange={(e, value) => handleChange(e, value)}
      value={countryDialCode}
      inputValue={countryDialCodeInput}
      onInputChange={(e, inputValue) => {
        dispatch(
          setFormFields({
            id: "dialing_code",
            value: inputValue,
          })
        );
        setCountryDialCodeInput(inputValue);
      }}
      renderInput={(params) => (
        <StyledTextFieldCountry
          {...params}
          placeholder={"Code"}
          id={"contact_phone"}
          inputProps={{
            ...params.inputProps,

            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};
export default SmallFormDialingCode;

export const StyledAutoComplete = withStyles((theme) => ({
  root: {
    color: "#6d6d6d",
    border: "1px solid #B9C6CD",
    borderRadius: "4px 0 0 4px",
    opacity: "1",
    "& .MuiFormControl-root ": {
      "& .MuiInput-underline:before": {
        // Semi-transparent underline
        borderBottomColor: "transparent",
      },
      "& .MuiInput-underline:hover:before": {
        // Solid underline on hover
        borderBottomColor: "transparent",
      },
      "& .MuiInput-underline:after": {
        // Solid underline on focus
        // borderBottomColor: theme.palette.input.placeholder // on admins step 3
        borderBottom: `1px solid transparent}`, // on step 1
      },
    },
    "& .MuiInputLabel-formControl": {
      top: "50%",
      transform: "translateY(calc(-65%))",
    },
    // "& .MuiAutocomplete-input:first-child": {
    //   transform: "translateY(calc(-5%))",
    // },
    "& .MuiButtonBase-root": {
      transform: "translateX(-10px)",
    },
    "& .MuiTextField-root": {
      padding: "3px",
    },
    [theme.breakpoints.down("md")]: {
      "& .MuiButtonBase-root": {
        transform: "translateX(-5px)",
      },
      "& .MuiInputLabel-formControl": {
        top: "50%",
        transform: "translateY(calc(-20%))",
      },
    },
  },
  inputRoot: {
    color: "black",
  },
  paper: {
    color: "black",
  },
  popper: {
    color: "white",
  },
}))(Autocomplete);

export const StyledTextFieldCountry = withStyles((theme) => ({
  root: {
    color: "white",
  },
}))(TextField);
