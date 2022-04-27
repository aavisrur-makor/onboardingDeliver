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
      <Grid item md={11} container spacing={3}>
        <Grid item container spacing={3} md={12}>
          <Grid item md={4} xs={12}>
            <DynamicTextField
            required
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
          <Grid item md={4} xs={12}>
            <DynamicTextField
            required
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
          <Grid item md={4} xs={12}>
            <CustomKeyBoardDatePicker
            required
              id="birthday_at"
              index={props.index}
              handleDynamicListChange={handleDynamicListChange}
            />
          </Grid>
        </Grid>
        <Grid item container xs={12} spacing={3}>
          <Grid item md={6} xs={12}>
            <GoogleApiAutoComplete
            required
              index={props.index}
              handleSelect={handleDynamicListChange}
              id="address"
              label="Address"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <RoleSelectBox
            required
              index={props.index}
              id={"position_uuid"}
              label="Role"
              data={props.data ? props.data : null}
              handleSelect={handleDynamicListChange}
            />
          </Grid>
        </Grid>
      </Grid>
      {props.arrLength > 1 && (
        <Grid item md={1} xs={12}>
          <IconButton
            style={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}
            onClick={(e) => dispatch(deleteContactAsync(props.index))}
          >
            {<TrashIcon />}
          </IconButton>
        </Grid>
      )}
    </>
  );
}

export default DynamicList;
