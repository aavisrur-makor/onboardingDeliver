import React, { useContext, useEffect, useState } from "react";
import { FormControl, InputLabel, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
// import countries from "../data/countries";
import { withStyles } from "@material-ui/core";
import axios from "axios";
import AuthContext from "../context/auth";
import FieldContext from "../context/fields";
import { Email } from "@material-ui/icons";

const CountryAutoComplete = (props) => {
  const [countries, setCountries] = useState([]);
  const { fieldState } = useContext(FieldContext);
  const [countryState, setCountryState] = useState({});
  const [countryStateInput, setCountryStateInput] = useState("");

  useEffect(async () => {
    const countriesData = await axios.get(
      "http://10.0.0.191:3030/api/onboarding/country"
    );
    console.log(
      "🚀 ~ file: CountryAutoComplete.js ~ line 21 ~ useEffect ~ countriesData",
      countriesData
    );
    setCountries(countriesData.data);
    setCountryState(fieldState.country);
    setCountryStateInput(fieldState.country);
  }, [fieldState.country]);
  const { authState } = useContext(AuthContext);
  const { uuid } = authState;

  const handleChange = (e) => {
    setCountryState(e);
    if (e) {
      const fieldToUpdate = {
        country: e.name,
      };
      axios
        .put(`http://10.0.0.191:3030/api/onboarding/${uuid}`, fieldToUpdate)
        .then((res) => {})
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <StyledAutoComplete
      id="country"
      // autoComplete="off"
      fullWidth
      value={countryState}
      options={countries}
      autoHighlight
      getOptionLabel={(option) => option.name || ""}
      onChange={(e, value) => handleChange(value)}
      onInputChange={(e, inputValue) => setCountryStateInput(inputValue)}
      inputValue={countryStateInput || ""}
      renderInput={(params) => (
        <StyledTextFieldCountry
          {...params}
          disableOutline
          label="Country"
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
