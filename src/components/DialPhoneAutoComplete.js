import React, { useContext, useEffect, useState } from "react";
import { TextField, useMediaQuery } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
// import countries from "../data/countries";
import { withStyles } from "@material-ui/core";
import axios from "axios";
import AuthContext from "../context/auth";
import { END_POINT, BASE_URL } from "../constants";
import FormContext from "../context/form";

const DialPhoneAutoComplete = (props) => {
  const [dialCode, setDialCode] = useState([]);
  const [userCountry, setUserCountry] = useState();
  const [countryDialCode, setCountryDialCode] = useState({});
  const [countryDialCodeInput, setCountryDialCodeInput] = useState("");
  const { formState, setFormState } = useContext(FormContext);
  const getUserCountry = async () => {
    const userDetails = await axios.get('https://ip.nf/me.json');
    const country = userDetails.data.ip.country;
    setUserCountry(country);
  };

  useEffect(() => {
    const fetchCountry = async () => {
      const countriesData = await axios.get(
        `${BASE_URL}${END_POINT.UTILS}${END_POINT.COUNTRY}`
      );
      let sortDialingCode = await countriesData.data.sort(function (a, b) {
        return a.dialing_code - b.dialing_code;
      });
      setDialCode(sortDialingCode);
      getUserCountry();
      // setDialCode(sortDialingCode);
    };
    fetchCountry();
    setCountryDialCode(dialCode.filter((dial) => dial.name === userCountry)[0]);
    setFormState((prev) => {
      return { ...prev, ["dialCode"]: countryDialCodeInput };
    });
  }, [userCountry, countryDialCodeInput]);
  const { authState } = useContext(AuthContext);
  const { uuid } = authState;

  const handleChange = (e, inputValue) => {
    setCountryDialCode(e);

    props.handleChange(e ? e : countryDialCodeInput);
  };
  console.log("INPUT CODE", countryDialCodeInput);
  return (
    <StyledAutoComplete
      id='dialing_code'
      label={'Dial Code'}
      options={dialCode}
      onBlur={props.handleBlur}
      disableClearable
      className={props.className}
      autoHighlight
      fullWidth
      getOptionLabel={(option) =>
        option.dialing_code ? option.dialing_code : ''
      }
      onChange={(e, value) => handleChange(value)}
      value={countryDialCode}
      inputValue={countryDialCodeInput}
      onInputChange={(e, inputValue) => handleInputChange(e, inputValue)}
      renderInput={(params) => (
        <StyledTextFieldCountry
          {...params}
          placeholder={'Code'}
          inputProps={{
            ...params.inputProps,

            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};
export default DialPhoneAutoComplete;

export const StyledAutoComplete = withStyles((theme) => ({
  root: {
    color: '#6d6d6d',
    border: '1px solid #B9C6CD',

    opacity: '1',

    '& .MuiFormControl-root ': {
      '& .MuiInput-underline:before': {
        // Semi-transparent underline

        borderBottomColor: 'transparent',
      },

      '& .MuiInput-underline:hover:before': {
        // Solid underline on hover

        borderBottomColor: 'transparent',
      },
      '& .MuiInput-underline:after': {
        // Solid underline on focus

        // borderBottomColor: theme.palette.input.placeholder // on admins step 3

        borderBottom: `1px solid transparent}`, // on step 1
      },
    },
    '& .MuiInputLabel-formControl': {
      top: '50%',

      transform: 'translateY(calc(-65%))',
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
      '& .MuiInputLabel-formControl': {
        top: '50%',

        transform: 'translateY(calc(-20%))',
      },
    },
  },

  inputRoot: {
    color: 'black',
  },

  paper: {
    color: 'black',
  },

  popper: {
    color: 'white',
  },
}))(Autocomplete);

export const StyledTextFieldCountry = withStyles((theme) => ({
  root: {
    color: 'white',
  },
}))(TextField);
