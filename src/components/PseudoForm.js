import React, { useContext } from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import DispatcherField from "./DispatcherField";
import formData from "../data/formData";
import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import CountryAutoComplete from "./CountryAutoComplete";
import FieldContext from "../context/fields";

// const steps = [
//   "Submit on-boarding documentation",
//   "Attach documents",
//   "Terms of Use",
// ];

const useStyles = makeStyles({
  root: {},
  formControl: {
    "& .MuiFormControl-root": {
      background: "0% 0% no-repeat padding-box",
      border: "none",
      opacity: "1",
    },
  },
  titleText: {
    fontWeight: "bold",
    font: "normal normal bold 24px/29px Cormorant Garamond",
  },
  countryAutoComplete: {
    display: "flex",
    marginTop: "0 !important",
    padding: "1rem 0 0 1rem",
    "& .MuiAutocomplete-root": { padding: "15px 0 0 10px" },
    "& .MuiInputBase-root": {
      marginTop: "0",
    },
    "& .MuiInputBase-root::before,& .MuiInputBase-root.Mui-focused::before ": {
      content: "none",
    },
    "& .MuiFormLabel-root.MuiInputLabel-root.MuiInputLabel-formControl.MuiInputLabel-animated.MuiInputLabel-shrink.MuiFormLabel-filled":
      { display: "none" },
    "& .MuiButtonBase-root.MuiIconButton-root.MuiAutocomplete-clearIndicator.MuiAutocomplete-clearIndicatorDirty":
      { display: "none" },
  },
});

const PseudoForm = function (props) {
  const { fieldState } = useContext(FieldContext);
  const { steps } = props;
  const classes = useStyles();

  React.useEffect(() => {}, [fieldState]);

  return (
    <Grid
      container
      direction="column"
      className={classes.formControl}
      spacing={3}
    >
      <Grid item xs={11}>
        <Typography className={classes.titleText} variant="body1">
          On-Boarding Documentation
        </Typography>
      </Grid>

      <Grid item>
        <Grid container spacing={3}>
          {formData.form1.grid1.map(({ label, id }) => {
            return (
              <Grid item xs={6}>
                <DispatcherField value={fieldState[id]} id={id} label={label} />
              </Grid>
            );
          })}
          <Grid item xs={6} className={classes.countryAutoComplete}>
            <CountryAutoComplete />
          </Grid>
        </Grid>
      </Grid>
      <Grid item spacing={3}>
        <Grid container spacing={3}>
          {formData.form1.grid2.map(({ label, id }) => (
            <Grid item xs={12}>
              <DispatcherField value={fieldState[id]} id={id} label={label} />
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={3}>
          {formData.form1.grid3.map(({ label, id }) => (
            <Grid item xs={6}>
              <DispatcherField
                value={fieldState[id]}
                multiline
                maxRows={9}
                rows={9}
                id={id}
                label={label}
              />
            </Grid>
          ))}
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
