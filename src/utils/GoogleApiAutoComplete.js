import { Box, Paper, TextField, Typography } from "@material-ui/core";
import { isObject } from "lodash";
import { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import {
  sendGeoLocation,
  setCurrentOnboardingFields,
  setOnboardingContactField,
  updateFieldOnboarding,
} from "../redux/slices/singleOnboardingSlice";

const GoogleApiAutoComplete = (props) => {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const dispatch = useDispatch();
  const value = useSelector((state) =>
    props.id === "address"
      ? state.onboarding.current.contacts[props.index][props.id]
      : state.onboarding.current[props.id]
  );
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latlng = await getLatLng(results[0]);
    let fieldToUpdate = { [props.id]: value };
    if (props.id === "address") {
      props.handleSelect(props.index);
    } else {
      dispatch(setCurrentOnboardingFields({ id: props.id, value }));
      dispatch(updateFieldOnboarding(fieldToUpdate));
    }
    setAddress(value);
    setCoordinates(latlng);
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
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
          return (
            <Box style={{ position: "relative" }}>
              <TextField
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
