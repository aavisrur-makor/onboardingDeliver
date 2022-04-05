import React from "react";
import GoogleApiAutoComplete from "../../utils/GoogleApiAutoComplete";
import DispatcherField from "../DispatcherField";
import DynamicTextField from "./DynamicTextField";
import { Grid } from "@material-ui/core";

function DynamicList() {
  return (
    <>
      <Grid item md={2}>
        <DynamicTextField label="First Name" />
      </Grid>
      <Grid item md={2}>
        <DynamicTextField label="Last Name" />
      </Grid>
      <Grid item md={2}>
        <DynamicTextField label="Date of Birth" />
      </Grid>
      <Grid item md={2}>
        <GoogleApiAutoComplete label="Address" />
      </Grid>
      <Grid item md={2}>
        <DynamicTextField label="Role" />
      </Grid>
      <Grid item md={2}></Grid>
    </>
  );
}

export default DynamicList;
