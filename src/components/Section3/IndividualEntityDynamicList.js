import React from "react";
import GoogleApiAutoComplete from "../../utils/GoogleApiAutoComplete";
import DispatcherField from "../DispatcherField";
import DynamicTextField from "./DynamicTextField";
import { Grid, IconButton } from "@material-ui/core";
import RoleSelectBox from "./RoleSelectBox";
import CountryAutoComplete from "../CountryAutoComplete";
import CustomToggleButton from "../../utils/CustomToggleButton";
import { ReactComponent as TrashIcon } from "../../assets/icons/trashIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteContactAsync,
  deleteManagmentContact,
  setOnboardingContactField,
  updateContactFieldOnboarding,
} from "../../redux/slices/singleOnboardingSlice";
import CustomKeyBoardDatePicker from "./CustomKeyBoardDatePicker";
import { useDebouncedCallback } from "use-debounce/lib";

const IndividualEntityDynamicList = (props) => {
  // const [alignment, setAlignment] = React.useState("individual");
  const dispatch = useDispatch();
  const alignment = useSelector(
    (state) => state.onboarding.current.contacts[props.index].partner_type
  );

  const handleDynamicListChange = (e) => {
    dispatch(updateContactFieldOnboarding(props.index));
  };
  const handleAddAutoComplete = (e, value) => {
    const id = e.target.id.split("-")[0];
    console.log("AUTOCOMPLERTE", id, value);

    dispatch(
      setOnboardingContactField({
        id,
        value: value.iso_code_2,
        contactIndex: props.index,
      })
    );
    dispatch(updateContactFieldOnboarding(props.index));
  };
  const debounce = useDebouncedCallback(handleDynamicListChange, 400);
  console.log("arrlength", props.arrLength);
  return (
    <>
      {alignment === "individual" ? (
        <>
          <Grid item md={2} xs={12}>
            <CustomToggleButton
              id="partner_type"
              // setAlignment={setAlignment}
              value={alignment}
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
                debounce(e);
              }}
              id="first_name"
              index={props.index}
              label="First Name"
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
                debounce(e);
              }}
              id="last_name"
              index={props.index}
              label="Last Name"
            />
          </Grid>
          <Grid item md={2} xs={12}>
            <CustomKeyBoardDatePicker
              id="birthday_at"
              index={props.index}
              label="Date of Birth"
              handleDynamicListChange={handleDynamicListChange}
            />
          </Grid>
          <Grid item md={2} xs={12}>
            <GoogleApiAutoComplete
              handleSelect={handleDynamicListChange}
              id="address"
              index={props.index}
              label="Address"
            />
          </Grid>
          <Grid item md={1} xs={12}>
            <RoleSelectBox
              handleSelect={handleDynamicListChange}
              index={props.index}
              id={"position_uuid"}
              label="Role"
              data="roles"
            />
          </Grid>
          {props.arrLength > 1 && (
            <Grid item md={1}>
              <IconButton
                onClick={(e) => dispatch(deleteContactAsync(props.index))}
              >
                {<TrashIcon />}
              </IconButton>
            </Grid>
          )}
        </>
      ) : (
        <>
          <Grid item md={2} xs={12}>
            <CustomToggleButton
              value={alignment}
              index={props.index}
              id="partner_type"
            />
          </Grid>
          <Grid item md={3} xs={12}>
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
              id="company_name"
              index={props.index}
              label="Company Name"
            />
          </Grid>
          <Grid item md={3} xs={12}>
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
              index={props.index}
              id="company_number"
              label="Company Number"
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <CountryAutoComplete
              id="country"
              index={props.index}
              label="Country of incorporation"
              handleChange={handleAddAutoComplete}
            />
          </Grid>
          {props.arrLength > 1 && (
            <Grid item md={1}>
              <IconButton
                onClick={(e) => dispatch(deleteContactAsync(props.index))}
              >
                {<TrashIcon />}
              </IconButton>
            </Grid>
          )}
        </>
      )}
    </>
  );
};

export default IndividualEntityDynamicList;
