import { Box, Paper, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import PlacesAutocomplete, {

} from "react-places-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentOnboardingFields,
  setOnboardingContactField,
  updateFieldOnboarding,
  updateSection3Contact,
} from "../redux/slices/singleOnboardingSlice";

const GoogleApiAutoComplete = (props) => {
  const dispatch = useDispatch();
  const value = useSelector((state) =>
    props.id === "address"
      ? state.onboarding.current.contacts[props.index][props.id]
      : state.onboarding.current[props.id]
  );
  const handleSelect = async (value) => {
    let fieldToUpdate = { [props.id]: value };
    if (props.id === "address") {
      props.handleSelect(props.index);
    } else {
      dispatch(setCurrentOnboardingFields({ id: props.id, value }));
      dispatch(updateFieldOnboarding(fieldToUpdate));
    }
  };
  const handleSection3Select = async (value) => {
    dispatch(
      setOnboardingContactField({
        id: props.id,
        value,
        contactIndex: props.index,
      })
    );
    dispatch(updateSection3Contact(props.index));
  };
  return (
    <div>
      <PlacesAutocomplete
        style={{ zIndex: 10000 }}
        value={value ? value : ""}
        onChange={(e) => {
          props.id === "address"
            ? dispatch(
                setOnboardingContactField({
                  id: props.id,
                  value: e,
                  contactIndex: props.index,
                })
              )
            : dispatch(setCurrentOnboardingFields({ id: props.id, value: e }));
        }}
        onSelect={props.id === "address" ? handleSection3Select : handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
          return (
            <Box style={{ position: "relative" }}>
              <TextField
                required={props.required}
                fullWidth
                label={props.label}
                variant="outlined"
                {...getInputProps()}
              />
              <Paper style={{ position: "absolute", zIndex: 300 }}>
                {loading ? <Box>Loading...</Box> : null}
                {suggestions.map((suggestion) => {
                  const style = {
                    backgroundColor: suggestion.active ? "#F7F7F7" : "#ffffff",
                    padding: "10px",
                  };
                  return (
                    <Typography
                      style={{ marginRight: "10px" }}
                      {...getSuggestionItemProps(suggestion, { style })}
                      key={props.id}
                    >
                      {suggestion.description}
                    </Typography>
                  );
                })}
              </Paper>
            </Box>
          );
        }}
      </PlacesAutocomplete>
    </div>
  );
};
export default GoogleApiAutoComplete;
