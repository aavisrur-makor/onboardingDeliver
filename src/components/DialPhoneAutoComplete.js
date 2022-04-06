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
  const [userCountry, setUserCountry] = useState();
  const [countryDialCode, setCountryDialCode] = useState({});
  const [countryDialCodeInput, setCountryDialCodeInput] = useState("");
  const countries = useSelector((state) => state.meta.countries);
  const dial_code = useSelector(
    (state) =>
      state.onboarding.current.contacts[props.index][props.id][props.subIndex][
        props.objectField
      ]
  );
  const dialCodeMap = useSelector((state) => state.meta.dialCodesMap);
  const dispatch = useDispatch();
  const getUserCountry = async () => {
    const userDetails = await axios.get("https://ip.nf/me.json");
    const country = userDetails.data.ip.country;
    if (dialCodeMap[dial_code]?.name) {
      setUserCountry(dialCodeMap[dial_code]?.name);
    } else {
      setUserCountry(country);
    }
  };

  const fetchCountry = () => {
    getUserCountry();

    // setDialCode(sortDialingCode);
  };
  useEffect(() => {
    fetchCountry();
    setCountryDialCode(
      countries.filter((dial) => dial.name === userCountry)[0]
    );

    // dispatch(
    //   setOnboardingContactField({
    //     id: "contact_phone",
    //     value: countryDialCodeInput,
    //     contactIndex: props.index >= 1 ? props.index : null,
    //     objectField: "dialing_code",
    //   })
    // );
  }, [userCountry]);

  const handleChange = (e, inputValue) => {
    setCountryDialCode(inputValue);
    props.handleChange(e, "", props.index);
  };
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
          setOnboardingContactField({
            id: "contact_phone",
            value: inputValue,
            contactIndex: props.index,
            objectField: "dialing_code",
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
export default DialPhoneAutoComplete;

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
