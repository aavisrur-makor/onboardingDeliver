import React from "react";
import GoogleApiAutoComplete from "../../utils/GoogleApiAutoComplete";
import DispatcherField from "../DispatcherField";
import DynamicTextField from "./DynamicTextField";
import { Grid } from "@material-ui/core";
import RoleSelectBox from "./RoleSelectBox";
import CountryAutoComplete from "../CountryAutoComplete";
import CustomToggleButton from "../../utils/CustomToggleButton";

const IndividualEntityDynamicList = (props) => {
  const [alignment, setAlignment] = React.useState("individual");

  return (
    <>
      {alignment === "individual" ? (
        <>
          <Grid item md={2}>
            <CustomToggleButton
              setAlignmentToRender={props.setAlignmentToRender}
              setAlignment={setAlignment}
              value={alignment}
            />
          </Grid>
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
            <RoleSelectBox label="Role" data="roles" />
          </Grid>
        </>
      ) : (
        <>
          <Grid item md={3}>
            <CustomToggleButton
              setAlignmentToRender={props.setAlignmentToRender}
              setAlignment={setAlignment}
              value={alignment}
            />
          </Grid>
          <Grid item md={3}>
            <DynamicTextField label="Company Name" />
          </Grid>
          <Grid item md={3}>
            <DynamicTextField label="Company Number" />
          </Grid>
          <Grid item md={3}>
            <CountryAutoComplete label="Country of incorporation" />
          </Grid>
        </>
      )}
    </>
  );
};

export default IndividualEntityDynamicList;
