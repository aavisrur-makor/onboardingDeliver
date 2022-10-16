import React from "react";
import GoogleApiAutoComplete from "../../utils/GoogleApiAutoComplete";
import DynamicTextField from "./DynamicTextField";
import { Grid, IconButton } from "@material-ui/core";
import RoleSelectBox from "./RoleSelectBox";
import CountryAutoComplete from "../CountryAutoComplete";
import CustomToggleButton from "../../utils/CustomToggleButton";
import { ReactComponent as TrashIcon } from "../../assets/icons/trashIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteContactAsync,
  setOnboardingContactField,
  updateSection3Contact,
} from "../../redux/slices/singleOnboardingSlice";
import CustomKeyBoardDatePicker from "./CustomKeyBoardDatePicker";
import { useDebouncedCallback } from "use-debounce/lib";
import CustomSelect from "../CustomSelect";
import { deleteContactValidation, setOnboardingContactValidationField } from "../../redux/slices/validationSlice";

const IndividualEntityDynamicList = (props) => {
  const dispatch = useDispatch();
  const alignment = useSelector(
    (state) => state.onboarding.current.contacts[props.index].type
  );

  const handleDynamicListChange = (e) => {
    dispatch(updateSection3Contact(props.index));
  };
  const handleAddAutoComplete = (e, value) => {
    const id = e.target.id.split("-")[0];

    dispatch(
      setOnboardingContactField({
        id,
        value: value.iso_code_2,
        contactIndex: props.index,
      })
    );
    dispatch(updateSection3Contact(props.index));
    dispatch(
      setOnboardingContactValidationField({
        contactIndex: props.index,
        field: id,
        value: true,
      })
    );
  };
  const handleAddCompanyType = (e, child) => {
    dispatch(
      setOnboardingContactField({
        id: "client_type_uuid",
        value: child.props.id,
        contactIndex: props.index,
      })
    );
    dispatch(updateSection3Contact(props.index));
    dispatch(
      setOnboardingContactValidationField({
        contactIndex: props.index,
        field: "client_type_uuid",
        value: true,
      })
    );
  };

  const handleChange = (e) => {
    dispatch(
      setOnboardingContactField({
        id: e.target.id,
        value: e.target.value,
        contactIndex: props.index,
      })
    );
    dispatch(updateSection3Contact(props.index));
    if (e.target.value) {
      dispatch(
        setOnboardingContactValidationField({
          contactIndex: props.index,
          field: e.target.id,
          value: true,
        })
      );
    } else {
      dispatch(
        setOnboardingContactValidationField({
          contactIndex: props.index,
          field: e.target.id,
          value: false,
        })
      );
    }
  };

  const handleDeleteContact =()=>{
    dispatch(deleteContactAsync(props.index))
    dispatch(deleteContactValidation({contactIndex:props.index}))

  }
  return (
    <>
      {alignment === "individual" ? (
        <>
          <Grid item container xs={11} spacing={3}>
            <Grid item container md={12} spacing={3}>
              <Grid item md={2} xs={12}>
                <CustomToggleButton
                  id="type"
                  type={props.type}
                  // setAlignment={setAlignment}
                  value={alignment}
                  index={props.index}
                />
              </Grid>
              <Grid item md={5} xs={12}>
                <DynamicTextField
                  required
                  onChange={handleChange}
                  id="first_name"
                  index={props.index}
                  label="First Name"
                />
              </Grid>
              <Grid item md={5} xs={12}>
                <DynamicTextField
                  required
                  onChange={handleChange}
                  id="last_name"
                  index={props.index}
                  label="Last Name"
                />
              </Grid>
            </Grid>
            <Grid item container md={12} spacing={3}>
              <Grid item md={4} xs={12}>
                <CustomKeyBoardDatePicker
                  required
                  id="birthday_at"
                  index={props.index}
                  label="Date of Birth"
                  handleDynamicListChange={handleDynamicListChange}
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <GoogleApiAutoComplete
                  required
                  handleSelect={handleDynamicListChange}
                  id="address"
                  index={props.index}
                  label="Address"
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <RoleSelectBox
                  required
                  handleSelect={handleDynamicListChange}
                  index={props.index}
                  id={"position_uuid"}
                  label="Role"
                  data="roles"
                />
              </Grid>
            </Grid>
          </Grid>
          {props.arrLength > 1 && (
            <Grid item md={1}>
              <IconButton
                style={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}
                onClick={handleDeleteContact}
              >
                {<TrashIcon />}
              </IconButton>
            </Grid>
          )}
        </>
      ) : (
        <>
          <Grid item container md={11} spacing={3}>
            <Grid item container md={12} spacing={3}>
              <Grid item md={2} xs={12}>
                <CustomToggleButton
                  value={alignment}
                  index={props.index}
                  type={props.type}
                  id="type"
                />
              </Grid>
              <Grid item md={5} xs={12}>
                <DynamicTextField
                  required
                  onChange={handleChange}
                  id="entity_name"
                  index={props.index}
                  label="Company Name"
                />
              </Grid>
              <Grid item md={5} xs={12}>
                <DynamicTextField
                  required
                  onChange={handleChange}
                  index={props.index}
                  id="entity_registration_number"
                  label="Company Number"
                />
              </Grid>
            </Grid>
            <Grid item container md={12} spacing={3}>
              <Grid item md={6} xs={12}>
                <CustomSelect
                  required
                  stateData={"company_types"}
                  stateDataMap={"company_typesMap"}
                  id={"client_type_uuid"}
                  contactIndex={props.index}
                  label={"Company Type"}
                  handleChange={handleAddCompanyType}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <CountryAutoComplete
                  required
                  id="country"
                  index={props.index}
                  label="Country of incorporation"
                  handleChange={handleAddAutoComplete}
                />
              </Grid>
            </Grid>
          </Grid>
          {props.arrLength > 1 && (
            <Grid item md={1}>
              <IconButton
                style={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}
                onClick={handleDeleteContact}
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
