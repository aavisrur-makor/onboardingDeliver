import React, { useContext, useEffect, useState } from "react";
import { TextField, useMediaQuery } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
// import countries from "../data/countries";
import { withStyles } from "@material-ui/core";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { setFormFields } from "../redux/slices/smallFormSlice";
import { setOnboardingContactField } from "../redux/slices/singleOnboardingSlice";

const DialPhoneAutoComplete = (props) => {
  const countries = useSelector((state) => state.meta.countries);
  const dialCodeMap = useSelector((state) => state.meta.dialCodesMap);
  const dial_code = useSelector(
    (state) =>
      state.onboarding.current.contacts[props.index]?.phone &&
      state.onboarding.current.contacts[props.index]?.phone[props.subIndex]
        .dialing_code
  );
  const countriesMap = useSelector((state) => state.meta.countriesMap);
  const [countryDialCode, setCountryDialCode] = useState(
    dial_code ? dialCodeMap[dial_code] : {}
  );
  const [countryDialCodeInput, setCountryDialCodeInput] = useState(
    dial_code ? dial_code : ""
  );
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const aysncFunction = async () => {
  //     if (!dial_code) {
  //       console.log("INSIDE THE IF IN EFFECT");
  //       const userDetails = await axios.get("https://geolocation-db.com/json/");
  //       setCountryDialCodeInput(
  //         countriesMap[userDetails.data.country_code]?.dialing_code
  //       );
  //       dispatch(
  //         setOnboardingContactField({
  //           id: "phone",
  //           value: countriesMap[userDetails.data.country_code]?.dialing_code,
  //           contactIndex: props.index,
  //           objectField: "dialing_code",
  //         })
  //       );
  //       setCountryDialCode(countriesMap[userDetails.data.country_code]);
  //     }
  //   }
  //   aysncFunction();
  // }, [dial_code]);

  console.log("countryDialCode", countryDialCode);

  const handleChange = (e, inputValue) => {
    setCountryDialCode(inputValue);
    props.handleChange(e, e.dialing_code, props.index, props.objectField);
  };
  console.log("CHECK THE DIAL CODE RENDER", dial_code);
  return (
    <StyledAutoComplete
      id="phone"
      name="phone"
      label={"Dial Code"}
      variant="outlined"
      options={countries}
      onBlur={props.handleBlur}
      disableClearable
      className={props.className}
      autoHighlight
      fullWidth
      getOptionLabel={(option) =>
        option.dialing_code ? option.dialing_code : ""
      }
      onChange={(e, value) => {
        console.log("INPUT VALUE", value);
        setCountryDialCode(value);
        props.handleContactDialCodeChange(
          e,
          value.dialing_code,
          props.index,
          props.objectField
        );
      }}
      value={countryDialCode}
      inputValue={
        dial_code ? dial_code : countryDialCodeInput ? countryDialCodeInput : ""
      }
      onInputChange={(e, inputValue) => {
        console.log("INPUT VALUE", inputValue);
        // dispatch(
        //   setOnboardingContactField({
        //     id: "phone",
        //     value: inputValue,
        //     contactIndex: props.index,
        //     objectField: "dialing_code",
        //   })
        // );
        setCountryDialCodeInput(inputValue);
      }}
      renderInput={(params) => (
        <StyledTextFieldCountry
          required={props.required}
          {...params}
          label={props.label}
          variant="outlined"
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
export default DialPhoneAutoComplete;

export const StyledAutoComplete = withStyles((theme) => ({
  root: {
    "& .MuiIconButton-root": {
      color: "#3E2F71",
    },
    // color: "#6d6d6d",
    // border: "1px solid #B9C6CD",
    // borderRadius: "4px 0 0 4px",
    // opacity: "1",
    // "& .MuiFormControl-root ": {
    //   "& .MuiInput-underline:before": {
    //     // Semi-transparent underline
    //     borderBottomColor: "transparent",
    //   },
    //   "& .MuiInput-underline:hover:before": {
    //     // Solid underline on hover
    //     borderBottomColor: "transparent",
    //   },
    // "& .MuiInput-underline:after": {
    //   // Solid underline on focus
    //   // borderBottomColor: theme.palette.input.placeholder // on admins step 3
    //   borderBottom: `1px solid transparent}`, // on step 1
    // },
    // },
    // "& .MuiInputLabel-formControl": {
    //   top: "50%",
    //   transform: "translateY(calc(-65%))",
    // },
    // "& .MuiAutocomplete-input:first-child": {
    //   transform: "translateY(calc(-5%))",
    // },
    // "& .MuiButtonBase-root": {
    //   transform: "translateX(-10px)",
    // },
    // "& .MuiTextField-root": {
    //   padding: "3px",
    // },
    // [theme.breakpoints.down("md")]: {
    //   "& .MuiButtonBase-root": {
    //     transform: "translateX(-5px)",
    //   },
    // "& .MuiInputLabel-formControl": {
    //   top: "50%",
    //   transform: "translateY(calc(-20%))",
    // },
    // },
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
