import React, { useEffect, useLayoutEffect, useContext } from "react";
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

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 0,
    },
  },
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

    "& .MuiOutlinedInput-root": {
      padding: "11px",
    },
    "& .MuiAutocomplete-popupIndicator": {
      transform: "translateX(-10px)",
    },
    "& .MuiInputBase-root": {
      marginTop: "0",

      // boxShadow: "inset 0 0 0 1px #B9C6CD",
    },
    "& .MuiInputBase-root::before,& .MuiInputBase-root.Mui-focused::before ": {
      content: "none",
    },
    "& .MuiFormLabel-root": {
      fontSize: "16px",
      paddingLeft: "4px",
    },
    "& .MuiButtonBase-root.MuiIconButton-root.MuiAutocomplete-clearIndicator.MuiAutocomplete-clearIndicatorDirty":
      { display: "none" },
  },
}));

const PseudoForm = function (props) {
  const { fieldState } = useContext(FieldContext);
  const { steps } = props;
  const classes = useStyles();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <Grid container direction="column" className={classes.root} spacing={3}>
      <Grid item xs={11}>
        {!props.query && (
          <Typography className={classes.titleText} variant="body1">
            On-Boarding Documentation
          </Typography>
        )}
      </Grid>

      <Grid item>
        <Grid container spacing={3}>
          {formData.form1.grid1.map(({ label, id }) => {
            return (
              <Grid item xs={12} md={6}>
                <DispatcherField value={fieldState[id]} id={id} label={label} />
              </Grid>
            );
          })}
          <Grid item xs={12} md={6} className={classes.countryAutoComplete}>
            <CountryAutoComplete />
          </Grid>
        </Grid>
      </Grid>
      <Grid item spacing={3}>
        <Grid container spacing={3}>
          {formData.form1.grid2.map(({ label, id }) => {
            console.log(
              "🚀 ~ file: PseudoForm.js ~ line 89 ~ {formData.form1.grid1.map ~ id",
              id
            );
            return (
              <Grid item xs={12}>
                <DispatcherField value={fieldState[id]} id={id} label={label} />
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
