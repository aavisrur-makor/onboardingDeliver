import React, { useContext } from "react";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import countries from "../data/countries";
import { withStyles } from "@material-ui/core";
import axios from "axios";
import AuthContext from "../context/auth";

const CountryAutoComplete = () => {
  const { authState } = useContext(AuthContext);
  const { uuid } = authState;
  const handleChange = (e) => {
    const fieldToUpdate = {
      field: e.target.id,
      value: e.target.value,
    };
    axios
      .put(`${process.env.REACT_APP_BASE_RUL}onboarding/${uuid}`, fieldToUpdate)
      .then((res) => {
        console.log("country res", res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <StyledAutoComplete
      id="country-select-demo"
      fullWidth
      label={"country"}
      options={countries}
      autoHighlight
      getOptionLabel={(option) => option.label}
      onChange={handleChange}
      renderInput={(params) => (
        <StyledTextFieldCountry
          {...params}
          disableOutline
          label="Choose a country"
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
  root: {
    color: "#6d6d6d",
    background: "0% 0% no-repeat padding-box",
    border: "1px solid #B9C6CD",
    opacity: "1",
    "& .MuiSvgIcon-root": {
      transform: "translate(-20px,-3px)",
    },
    "& .MuiInputLabel-formControl": {
      top: "50%",
      transform: "translateY(calc(-50%))",
    },
  },

  inputRoot: {
    color: "black",
    font: "normal normal normal 16px/19px Work Sans",
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
