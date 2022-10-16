// import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import {
  setOnboardingContactField,
  updateSection3Contact,
} from "../redux/slices/singleOnboardingSlice";
import {
  handleToggleChange,
  setOwnerShipToggle,
  setShareHolderToggle,
} from "../redux/slices/validationSlice";
import { useStyles } from "../styles/UiForm";
const CustomToggleButton = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleAlignment = (event, newAlignment) => {
    if (newAlignment) {
      dispatch(
        setOnboardingContactField({
          id: props.id,
          value: newAlignment,
          contactIndex: props.index,
        })
      );
      dispatch(updateSection3Contact(props.index));

      if (props.type === "share_holder") {
        dispatch(
          setShareHolderToggle({
            contactIndex: props.index,
            alignment: newAlignment,
            stateType: props.slice,
          })
        );
        dispatch(handleToggleChange(props.index,newAlignment))
      } else {
        dispatch(
          setOwnerShipToggle({
            contactIndex: props.index,
            alignment: newAlignment,
            stateType: props.slice,
          })
        );
      }
    }
  };
  return (
    <>
      <ToggleButtonGroup
        className={classes.toggleButtonColor}
        value={props.value}
        exclusive
        onChange={handleAlignment}
        fullWidth
      >
        <ToggleButton
          style={{ textTransform: "capitalize", padding: "15px" }}
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
