import { TextField } from "@material-ui/core";
import React from "react";

function DynamicTextField(props) {
  return <TextField label={props.label} id={props.id} variant="outlined" />;
}

export default DynamicTextField;
