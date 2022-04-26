import React from "react";
import GoogleApiAutoComplete from "../../utils/GoogleApiAutoComplete";
import DispatcherField from "../DispatcherField";
import DynamicTextField from "./DynamicTextField";
import { Grid, IconButton, useMediaQuery, useTheme } from "@material-ui/core";
import RoleSelectBox from "./RoleSelectBox";
import { ReactComponent as TrashIcon } from "../../assets/icons/trashIcon.svg";

import CustomToggleButton from "../../utils/CustomToggleButton";
import { useDispatch } from "react-redux";
import {
  deleteContact,
  deleteContactAsync,
  deleteManagmentContact,
  setOnboardingContactField,
  updateContactFieldOnboarding,
  updateFieldOnboarding,
  updateSection3Contact,
} from "../../redux/slices/singleOnboardingSlice";
import { useDebouncedCallback } from "use-debounce/lib";
import CustomKeyBoardDatePicker from "./CustomKeyBoardDatePicker";

function DynamicList(props) {
  const dispatch = useDispatch();
  const handleDynamicListChange = (e) => {
    console.log("HERE DYNAMIC");
    dispatch(updateSection3Contact(props.index));
  };
  const theme = useTheme();
  const querySelector = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Grid item md={2} xs={12}>
        <DynamicTextField
          onChange={(e) => {
            dispatch(
              setOnboardingContactField({
                id: e.target.id,
                value: e.target.value,
                contactIndex: props.index,
              })
            );
            handleDynamicListChange();
          }}
          id="first_name"
          label="First Name"
          index={props.index}
        />
      </Grid>
      <Grid item md={2} xs={12}>
        <DynamicTextField
          onChange={(e) => {
            dispatch(
              setOnboardingContactField({
                id: e.target.id,
                value: e.target.value,
                contactIndex: props.index,
              })
            );
            handleDynamicListChange();
          }}
          id="last_name"
          label="Last Name"
          index={props.index}
        />
      </Grid>
      <Grid item md={2} xs={12}>
        <CustomKeyBoardDatePicker
          id="birthday_at"
          index={props.index}
          handleDynamicListChange={handleDynamicListChange}
        />
      </Grid>
      <Grid item md={2} xs={12}>
        <GoogleApiAutoComplete
          index={props.index}
          handleSelect={handleDynamicListChange}
          id="address"
          label="Address"
        />
      </Grid>
      <Grid item md={2} xs={12}>
        <RoleSelectBox
          index={props.index}
          id={"position_uuid"}
          label="Role"
          data={props.data ? props.data : null}
          handleSelect={handleDynamicListChange}
        />
      </Grid>
      {props.companyType !== "Company Limited by Shares" &&
      props.arrLength > 1 ? (
        <Grid item md={2} xs={12}>
          <IconButton
            onClick={(e) => dispatch(deleteContactAsync(props.index))}
          >
            {<TrashIcon />}
          </IconButton>
        </Grid>
      ) : (
        props.arrLength > 2 && (
          <Grid item md={2} xs={12}>
            <IconButton
              onClick={(e) => dispatch(deleteContactAsync(props.index))}
            >
              {<TrashIcon />}
            </IconButton>
          </Grid>
        )
      )}
    </>
  );
}

export default DynamicList;
