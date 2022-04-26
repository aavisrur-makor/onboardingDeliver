import React, { useContext, useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
// import countries from "../data/countries";
import { withStyles } from "@material-ui/core";
import axios from "axios";
import AuthContext from "../context/auth";
import FieldContext from "../context/fields";
import validate from "../utils/validate";
import { BASE_URL, END_POINT } from "../constants";
import { useSelector } from "react-redux";

const CountryAutoComplete = (props) => {
  const [error, setError] = useState("");
  const [countryState, setCountryState] = useState({});
  const [countryStateInput, setCountryStateInput] = useState("");
  const countries = useSelector((state) => state.meta.countries);
  const countriesMap = useSelector((state) => state.meta.countriesMap);
  const country = useSelector((state) =>
    props.index
      ? state.onboarding.current.contacts[props.index][props.id]
      : state.onboarding.current[props.id]
  );
  const uuid = useSelector((state) => state.auth.uuid);
  useEffect(() => {
    setCountryState(countriesMap[country]);
    setCountryStateInput(countriesMap[country]?.name);
  }, [countriesMap, country]);

  // const handleChange = (e, value) => {
  //   setCountryState(e);
  //   if (e) {
  //     const fieldToUpdate = {
  //       country: e.iso_code_2,
  //     };
  //     axios
  //       .put(
  //         `${BASE_URL}${END_POINT.EXTERNAL}${END_POINT.ONBOARDING}${uuid}`,
  //         fieldToUpdate
  //       )
  //       .then((res) => {})
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // };

  const handleInputChange = (e, inputValue) => {
    console.log("INPUT COUNTRY", inputValue);
    setCountryStateInput(inputValue);

    validate(null, inputValue, setError);
  };
  return (
    <StyledAutoComplete
      id={props.id}
      // autoComplete="off"
      fullWidth
      value={countryState}
      options={countries}
      autoHighlight
      getOptionLabel={(option) => option.name || ""}
      onChange={(e, value) => props.handleChange(e, value)}
      onInputChange={(e, inputValue) => handleInputChange(e, inputValue)}
      inputValue={countryStateInput || ""}
      renderInput={(params) => (
        <StyledTextFieldCountry
          {...params}
          error={!!error}
          required={props.required}
          helperText={error && "Field is empty."}
          disableOutline
          label={props.label}
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};
export default CountryAutoComplete;

export const StyledAutoComplete = withStyles((theme) => ({
  // root: {
  //   color: "#6d6d6d",
  //   background: "0% 0% no-repeat padding-box",
  //   border: "1px solid #B9C6CD",
  //   opacity: "1",
  //   "& .MuiInputLabel-formControl": {
  //     top: "50%",
  //     transform: "translateY(calc(-65%))",
  //   },
  //   "& .MuiButtonBase-root": {
  //     transform: "translate(-20px,-3px)",
  //   },
  //   [theme.breakpoints.down("md")]: {
  //     "& .MuiButtonBase-root": {
  //       transform: "translate(-20px,-6px)",
  //     },
  //     "& .MuiInputLabel-formControl": {
  //       top: "50%",
  //       transform: "translateY(calc(-80%))",
  //     },
  //   },
  // },
  // inputRoot: {
  //   color: "black",
  // },
  // paper: {
  //   color: "black",
  // },
  // popper: {
  //   color: "white",
  // },
}))(Autocomplete);

export const StyledTextFieldCountry = withStyles((theme) => ({
  root: {
    color: "white",
  },
}))(TextField);
