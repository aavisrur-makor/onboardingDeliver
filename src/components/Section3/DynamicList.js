import React from "react";
import GoogleApiAutoComplete from "../../utils/GoogleApiAutoComplete";
import DispatcherField from "../DispatcherField";
import DynamicTextField from "./DynamicTextField";
import { Grid, IconButton } from "@material-ui/core";
import RoleSelectBox from "./RoleSelectBox";
import { ReactComponent as TrashIcon } from "../../assets/icons/trashIcon.svg";

import CustomToggleButton from "../../utils/CustomToggleButton";
import { useDispatch } from "react-redux";
import {
  deleteManagmentContact,
  setOnboardingContactField,
  updateContactFieldOnboarding,
  updateFieldOnboarding,
} from "../../redux/slices/singleOnboardingSlice";
import { useDebouncedCallback } from "use-debounce/lib";
import CustomKeyBoardDatePicker from "./CustomKeyBoardDatePicker";

function DynamicList(props) {
  const dispatch = useDispatch();
  const handleDynamicListChange = (e) => {
    dispatch(updateContactFieldOnboarding(props.index));
  };
  const debounce = useDebouncedCallback(handleDynamicListChange, 400);
  return (
    <>
      <Grid item md={2}>
        <DynamicTextField
          onChange={(e) => {
            dispatch(
              setOnboardingContactField({
                id: e.target.id,
                value: e.target.value,
                contactIndex: props.index,
              })
            );
            debounce(e);
          }}
          id="first_name"
          label="First Name"
          index={props.index}
        />
      </Grid>
      <Grid item md={2}>
        <DynamicTextField
          onChange={(e) => {
            dispatch(
              setOnboardingContactField({
                id: e.target.id,
                value: e.target.value,
                contactIndex: props.index,
              })
            );
            debounce(e);
          }}
          id="last_name"
          label="Last Name"
          index={props.index}
        />
      </Grid>
      <Grid item md={2}>
        <CustomKeyBoardDatePicker
          id="birthday_at"
          index={props.index}
          handleDynamicListChange={handleDynamicListChange}
        />
      </Grid>
      <Grid item md={2}>
        <GoogleApiAutoComplete
          index={props.index}
          handleSelect={handleDynamicListChange}
          id="address"
          label="Address"
        />
      </Grid>
      <Grid item md={2}>
        <RoleSelectBox
          index={props.index}
          id={"position_uuid"}
          label="Role"
          data={props.data ? props.data : null}
          handleSelect={handleDynamicListChange}
        />
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
