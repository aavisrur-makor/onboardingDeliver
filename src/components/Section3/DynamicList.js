import React from "react";
import GoogleApiAutoComplete from "../../utils/GoogleApiAutoComplete";
import DispatcherField from "../DispatcherField";
import DynamicTextField from "./DynamicTextField";
import { Grid } from "@material-ui/core";
import RoleSelectBox from "./RoleSelectBox";
import CustomToggleButton from "../../utils/CustomToggleButton";

function DynamicList(props) {
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
        <RoleSelectBox label="Role" data={props.data ? props.data : null} />
      </Grid>
      <Grid item md={2}></Grid>
    </>
  );
}

export default DynamicList;
