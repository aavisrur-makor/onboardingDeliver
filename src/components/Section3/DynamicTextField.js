import { TextField } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

function DynamicTextField(props) {
  const value = useSelector(
    (state) => state.onboarding.current?.contacts[props.index][props.id]
  );
  console.log("PROPS INDEX", props.index);
  return (
    <TextField
      onChange={props.onChange}
      value={value ? value : ""}
      label={props.label}
      id={props.id}
      variant="outlined"
    />
  );
}

export default DynamicTextField;
