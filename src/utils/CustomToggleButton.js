import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
import React from "react";

const CustomToggleButton = (props) => {
  const handleAlignment = (event, newAlignment) => {
    console.log("NEW ALIGNMENT", newAlignment);
    console.log("PROPS", props);
    props.setAlignment(newAlignment);
    props.setAlignmentToRender(newAlignment);
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
