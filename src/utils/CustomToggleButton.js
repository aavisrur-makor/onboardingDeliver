import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
import React from "react";
import { useDispatch } from "react-redux";
import {
  setOnboardingContactField,
  updateContactFieldOnboarding,
  updateSection3Contact,
} from "../redux/slices/singleOnboardingSlice";

const CustomToggleButton = (props) => {
  const dispatch = useDispatch();
  const handleAlignment = (event, newAlignment) => {
    console.log("NEW ALIGNMENT", newAlignment, props.id, props.index);
    dispatch(
      setOnboardingContactField({
        id: props.id,
        value: newAlignment,
        contactIndex: props.index,
      })
    );
    dispatch(updateSection3Contact(props.index));
  };
  return (
    <>
      <ToggleButtonGroup
        value={props.value}
        exclusive
        onChange={handleAlignment}
      >
        <ToggleButton
          style={{ textTransform: "capitalize" }}
          value="individual"
        >
          Individual
        </ToggleButton>
        <ToggleButton style={{ textTransform: "capitalize" }} value="entity">
          Entity
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
};

export default CustomToggleButton;
