import React, {useState } from "react";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { withStyles } from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";

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

            autoComplete: "new-password",
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
