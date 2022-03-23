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

const PseudoForm = function (props) {
  const { fieldState, setFieldState } = useContext(FieldContext);
  const { steps } = props;
  const classes = useStyles();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const handleAdd = () => {
    setFieldState((prev) => {
      return {
        ...fieldState,
        contacts: [
          ...fieldState.contacts,
          { contact_name: "", dial_code: "", number: "", email: "" },
        ],
      };
    });
  };
  const handleDeleteContact = (e, index) => {
    console.log("inside", index);
    const newContactsArray = fieldState.contacts.filter(
      (contact, contactIndex) => contactIndex !== index
    );
    setFieldState((prev) => {
      return {
        ...fieldState,
        contacts: newContactsArray,
      };
    });
  };
  return (
    <Grid container direction='column' className={classes.root} spacing={3}>
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
                <DispatcherField
                  type="text"
                  value={fieldState[id]}
                  id={id}
                  label={label}
                />
              </Grid>
            );
          })}
          <Grid item xs={12} md={6} className={classes.countryAutoComplete}>
            <CustomSelect label={"Company Type"} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item spacing={3}>
        <Grid container spacing={3}>
          {formData.form1.grid2.map(({ label, id }) => {
            if (id === "country") {
              return (
                <Grid item xs={6}>
                  <CountryAutoComplete label={label} />
                </Grid>
              );
            } else if (id === "type_of_activity") {
              return (
                <Grid item xs={6}>
                  <CustomSelect value={fieldState[id]} id={id} label={label} />
                </Grid>
              );
            } else if (id === "description_of_activity") {
              return (
                <Grid item xs={12}>
                  <DispatcherField
                    rows={id === "description_of_activity" && 6}
                    value={fieldState[id]}
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
                  value={fieldState[id]}
                  id={id}
                  label={label}
                  
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={3}>
          {formData.form1.grid3.map(({ label, id }) => (
            <Grid item xs={12} md={6}>
              <DispatcherField
                value={fieldState[id]}
                multiline
                rows={6}
                id={id}
                label={label}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
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
                <StyledButton>Yes</StyledButton>
              </Grid>
              <Grid item>
                <StyledButton>No</StyledButton>
              </Grid>
            </Grid>
          </Grid>
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
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item>
            {fieldState.contacts.map((contact, contactIndex) => {
              return (
                <Contacts
                  handleDeleteContact={handleDeleteContact}
                  index={contactIndex}
                />
              );
            })}
          </Grid>
          <Grid item>
            <Grid container justifyContent="center" alignItems="center">
              <Grid item>
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
                <Typography>Add Contact</Typography>
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
    color: '#6d6d6d',
    // marginTop: "20px",
    textAlign: 'center',
  },
}))(TextField);
