import React, { useEffect, useLayoutEffect, useContext } from "react";
import { Grid, makeStyles, Typography, IconButton } from "@material-ui/core";
import DispatcherField from "./DispatcherField";
import formData from "../data/formData";
import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import CountryAutoComplete from "./CountryAutoComplete";
import FieldContext from "../context/fields";
import { ReactComponent as AddIcon } from "./../assets/icons/Group46.svg";

import CustomSelect from "./CustomSelect";
import StyledButton from "./StyledButton";
import Contacts from "./Contacts";
import { useStyles } from "../styles/UiForm";
import { useDispatch, useSelector } from "react-redux";
import {
  addOnboardingContact,
  removeOnboardingContact,
  setCurrentOnboardingFields,
  setManagmentList,
  setOnboardingContactField,
  updateContactFieldOnboarding,
  updateFieldOnboarding,
} from "../redux/slices/singleOnboardingSlice";
import GoogleApiAutoComplete from "../utils/GoogleApiAutoComplete";

const PseudoForm = function (props) {
  const has_regulation_required = useSelector(
    (state) => state.onboarding.current.has_regulation_required
  );

  const contacts = useSelector((state) => state.onboarding.current.contacts);
  const { steps } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const handleAdd = () => {
    dispatch(addOnboardingContact());
  };
  const handleActivitiesYes = (e) => {
    dispatch(
      setCurrentOnboardingFields({ id: "has_regulation_required", value: true })
    );
    dispatch(updateFieldOnboarding({ ["has_regulation_required"]: true }));
  };
  const handleActivitiesNo = (e) => {
    dispatch(
      setCurrentOnboardingFields({
        id: "has_regulation_required",
        value: false,
      })
    );
    dispatch(updateFieldOnboarding({ ["has_regulation_required"]: false }));
  };
  const handleAddField = (e, child) => {
    console.log("HANDLEADD", e.target.value);
    dispatch(
      setCurrentOnboardingFields({ id: e.target.name, value: child.props.id })
    );
    dispatch(updateFieldOnboarding({ [e.target.name]: child.props.id }));
  };
  const handleDeleteContact = (e, index) => {
    dispatch(removeOnboardingContact(index));
  };
  const handleContactChange = (e, contactIndex, objectField) => {
    const fieldName = e.target.id.split("-")[0];
    console.log("CONTACT INDEX IS", contactIndex, e.target.value, fieldName);
    // dispatch(
    //   setOnboardingContactField({
    //     id: fieldName,
    //     value: e.target.value,
    //     contactIndex,
    //     objectField,
    //   })
    // );

    dispatch(updateContactFieldOnboarding(contactIndex));
  };
  const handleContactDialCodeChange = (
    e,
    countryDialCodeInput,
    contactIndex,
    objectField
  ) => {
    const fieldName = e.target.id.split("-")[0];
    dispatch(
      setOnboardingContactField({
        id: fieldName,
        value: countryDialCodeInput || e.target.value,
        contactIndex,
        objectField,
      })
    );
    dispatch(updateContactFieldOnboarding(contactIndex));
  };

  const handleContactPositionChange = (e, child, contactIndex) => {
    dispatch(
      setOnboardingContactField({
        id: e.target.name,
        value: child.props.id,
        contactIndex,
      })
    );
    dispatch(updateContactFieldOnboarding(contactIndex));
  };

  const handleCompanyTypeChange = (e, child) => {
    dispatch(setManagmentList(child.props.value));
    dispatch(
      setCurrentOnboardingFields({ id: e.target.name, value: child.props.id })
    );
    dispatch(updateFieldOnboarding({ [e.target.name]: child.props.id }));
  };

  return (
    <Grid container direction="column" className={classes.root} spacing={3}>
      <Grid item xs={11}>
        {!props.query && (
          <Typography className={classes.titleText} variant="body1">
            Information
          </Typography>
        )}
      </Grid>

      <Grid item>
        <Grid container spacing={3}>
          {formData.form1.grid1.map(({ label, id, isRequired }) => {
            return (
              <Grid item xs={12} md={6}>
                <DispatcherField type="text" id={id} label={label} />
              </Grid>
            );
          })}
          <Grid item xs={12} md={6} className={classes.countryAutoComplete}>
            <CustomSelect
              stateData={"company_types"}
              stateDataMap={"company_typesMap"}
              id={"company_type_uuid"}
              label={"Company Type"}
              handleChange={handleCompanyTypeChange}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item spacing={3}>
        <Grid container spacing={3}>
          {formData.form1.grid2.map(({ label, id }) => {
            return (
              <Grid item xs={12} md={6}>
                <GoogleApiAutoComplete id={id} label={label} />
              </Grid>
            );
          })}
          {formData.form1.grid4.map(({ label, id }) => {
            if (id === "country") {
              return (
                <Grid item xs={12} md={6}>
                  <CountryAutoComplete label={label} />
                </Grid>
              );
            } else if (id === "type_of_business_uuid") {
              return (
                <Grid item xs={12} md={6}>
                  <CustomSelect
                    handleChange={handleAddField}
                    stateData={"type_of_business"}
                    stateDataMap={"TypeOfBusinessMap"}
                    id={id}
                    label={label}
                  />
                </Grid>
              );
            } else if (id === "description_of_activity") {
              return (
                <Grid item xs={12}>
                  <DispatcherField
                    rows={id === "description_of_activity" && 6}
                    id={id}
                    label={label}
                    multiline
                  />
                </Grid>
              );
            }
            return (
              <Grid item xs={12}>
                <DispatcherField
                  rows={id === "description_of_activity" && 6}
                  id={id}
                  label={label}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>

      {/* <Grid item xs={12}>
        <Grid container spacing={3}>
          {formData.form1.grid3.map(({ label, id }) => (
            <Grid item xs={12} md={6}>
              <DispatcherField multiline rows={6} id={id} label={label} />
            </Grid>
          ))}
        </Grid>
      </Grid> */}
      <Grid item>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          className={classes.activitiesRequireBox}
        >
          <Grid item>
            <Typography>
              Do your activities require you to be regulated/hold a licence?
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={4}>
              <Grid item>
                <StyledButton
                  style={{
                    backgroundColor: has_regulation_required && "#3E2F72",
                    color: has_regulation_required && "#FFFF",
                  }}
                  id="Yes"
                  onClick={handleActivitiesYes}
                >
                  Yes
                </StyledButton>
              </Grid>
              <Grid item>
                <StyledButton
                  style={{
                    backgroundColor: !has_regulation_required && "#3E2F72",
                    color: !has_regulation_required && "#FFFF",
                  }}
                  onClick={handleActivitiesNo}
                  id="No"
                >
                  No
                </StyledButton>
              </Grid>
            </Grid>
          </Grid>
          {has_regulation_required && (
            <Grid item md={12} xs={12}>
              <CustomSelect
                id="regulator_uuid"
                label="Name of Regulator/authority"
                stateData={"regulators"}
                stateDataMap={"regulatorsMap"}
                handleChange={handleAddField}
              />
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item spacing={2} xs={12}>
        <Grid container spacing={2}>
          <Grid item>
            <Typography className={classes.titleText} variant="body1">
              Contacts
            </Typography>
          </Grid>
        </Grid>
        <Grid container direction="column">
          <Grid item>
            {contacts.map((contact, contactIndex) => {
              return (
                <Contacts
                  handleChange={handleContactChange}
                  handlePositionChange={handleContactPositionChange}
                  handleDialCodeChange={handleContactDialCodeChange}
                  handleDeleteContact={handleDeleteContact}
                  index={contactIndex}
                />
              );
            })}
          </Grid>
          <Grid item>
            <Grid container justifyContent="center" alignItems="center">
              <Grid item className={classes.addButtonParent}>
                <IconButton
                  className={classes.addButton}
                  onClick={handleAdd}
                  disableRipple
                  disableTouchRipple
                  focusRipple={false}
                >
                  <AddIcon style={{ marginRight: "20px" }} />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography style={{ cursor: "pointer" }} onClick={handleAdd}>
                  Add Contact
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PseudoForm;

export const StyledTextField = withStyles((theme) => ({
  root: {
    // border: "solid #3F3073",
    color: "#6d6d6d",
    // marginTop: "20px",
    textAlign: "center",
  },
}))(TextField);
