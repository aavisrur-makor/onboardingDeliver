import React from "react";
import GoogleApiAutoComplete from "../../utils/GoogleApiAutoComplete";
import DispatcherField from "../DispatcherField";
import DynamicTextField from "./DynamicTextField";
import { Grid, IconButton } from "@material-ui/core";
import RoleSelectBox from "./RoleSelectBox";
import { ReactComponent as TrashIcon } from "../../assets/icons/trashIcon.svg";

import CustomToggleButton from "../../utils/CustomToggleButton";
import { useDispatch } from "react-redux";
import { deleteManagmentContact } from "../../redux/slices/singleOnboardingSlice";
function DynamicList(props) {
  const dispatch = useDispatch();

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
      <Grid item md={2}>
        <IconButton
          onClick={(e) => dispatch(deleteManagmentContact(props.index))}
        >
          {<TrashIcon />}
        </IconButton>
      </Grid>
    </>
  );
}

export default DynamicList;
