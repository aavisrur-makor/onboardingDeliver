import React from "react";
import { Grid, Typography } from "@material-ui/core";
import DispatcherField from "./DispatcherField";
import formData from "../data/formData";
import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import CountryAutoComplete from "./CountryAutoComplete";

import CustomSelect from "./CustomSelect";
import { useStyles } from "../styles/UiForm";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentOnboardingFields,
  setManagmentList,
  updateFieldOnboarding,
} from "../redux/slices/singleOnboardingSlice";
import GoogleApiAutoComplete from "../utils/GoogleApiAutoComplete";
import ContactsForm from "./ContactsForm";
import OnRegulationRequired from "./OnRegulationRequired";

const PseudoForm = function (props) {
  const companyMinIndividual = useSelector(
    (state) => state.meta.companyMinIndividual
  );
  const companyType = useSelector(
    (state) => state.onboarding.current.client_type_uuid
  );
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleAddAutoComplete = (e, value) => {
    const id = e.target.id.split("-")[0];

    dispatch(
      setCurrentOnboardingFields({ id, value: value ? value.iso_code_2 : "" })
    );
    dispatch(updateFieldOnboarding({ [id]: value ? value.iso_code_2 : "" }));
  };
  const handleAddField = (e, child) => {
    dispatch(
      setCurrentOnboardingFields({ id: e.target.name, value: child.props.id })
    );
    dispatch(updateFieldOnboarding({ [e.target.name]: child.props.id }));
  };

  const handleCompanyTypeChange = (e, child) => {
    dispatch(
      setManagmentList({
        name: child.props.value,
        minFields: companyMinIndividual[child.props.id],
      })
    );
    dispatch(
      setCurrentOnboardingFields({ id: e.target.name, value: child.props.id })
    );
    dispatch(updateFieldOnboarding({ [e.target.name]: child.props.id }));
  };

  const isMandatory = (id) => {
    switch (id) {
      case "client_company_legal_name":
      case "registration_number":
      case "registered_office_address_gapi":
      case "country":
      case "type_of_business_uuid":
      case "description_of_activity":
        return true;
      default:
        return false;
    }
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

      <Grid item xs={12}>
        <Grid container spacing={3}>
          {formData.form1.grid1.map(({ label, id, isRequired }) => {
            return (
              <Grid key={id} item xs={12} md={6}>
                <DispatcherField
                  required={isMandatory(id)}
                  type="text"
                  id={id}
                  label={label}
                />
              </Grid>
            );
          })}
          <Grid item xs={12} md={6} className={classes.countryAutoComplete}>
            <CustomSelect
              stateData={"company_types"}
              stateDataMap={"company_typesMap"}
              required
              id={"client_type_uuid"}
              label={"Company Type"}
              handleChange={handleCompanyTypeChange}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          {formData.form1.grid2.map(({ label, id }) => {
            return (
              <Grid key={id} item xs={12} md={6}>
                <GoogleApiAutoComplete
                  required={isMandatory(id)}
                  id={id}
                  label={label}
                />
              </Grid>
            );
          })}
          {formData.form1.grid4.map(({ label, id }) => {
            if (id === "country") {
              return (
                <Grid key={id} item xs={12} md={6}>
                  <CountryAutoComplete
                    required={isMandatory(id)}
                    handleChange={handleAddAutoComplete}
                    label={label}
                    id={"country"}
                  />
                </Grid>
              );
            } else if (id === "business_type_uuid") {
              return (
                <Grid key={id} item xs={12} md={6}>
                  <CustomSelect
                    required={isMandatory(id)}
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
                <Grid key={id} item xs={12}>
                  <DispatcherField
                    required={isMandatory(id)}
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
                  required={isMandatory(id)}
                  rows={id === "description_of_activity" && 6}
                  id={id}
                  label={label}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          className={classes.activitiesRequireBox}
        >
          <OnRegulationRequired />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography className={classes.titleText} variant="body1">
              Contacts
            </Typography>
          </Grid>
        </Grid>
        <Grid container direction="column">
          <ContactsForm />
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
