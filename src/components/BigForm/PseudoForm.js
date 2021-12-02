import React, { memo, useContext } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import DispatcherField from "./DispatcherField";
import { formData } from "../../utils/formData";
import { useSelector } from "react-redux";
import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import CountryAutoComplete from "../CountryAutoComplete";
import FieldContext from "../../context/fields";

const steps = [
  "Submit on-boarding documentation",
  "Attach documents",
  "Terms of Use",
];

const useStyles = makeStyles({
  root: {
    "& .MuiGrid-root.MuiGrid-container": {
      // gap: "4px",
    },
  },
});

const PseudoForm = memo(function (props) {
  const { fieldState, setFieldState } = useContext(FieldContext);
  const { steps } = props;
  // const state = useSelector((state) => {
  //   console.log("stately", state);
  //   return state.fieldReducer;
  // });
  const classes = useStyles();

  React.useEffect(() => {
    console.log("state in use effect", fieldState);
  }, [fieldState]);

  return (
    <Grid container direction="column" className={classes.root} spacing={3}>
      <Grid item>
        <Grid container spacing={3}>
          {formData.form1.grid1.map(({ label, id }) => (
            <Grid className={classes.root} item xs={6}>
              <DispatcherField value={fieldState[id]} id={id} label={label} />
            </Grid>
          ))}
          <Grid item xs={6}>
            <CountryAutoComplete />
          </Grid>
        </Grid>
      </Grid>
      <Grid item spacing={3}>
        <Grid container spacing={3}>
          {formData.form1.grid2.map(({ label, id }) => (
            <Grid className={classes.root} item xs={12}>
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
});

export default PseudoForm;

export const StyledTextField = withStyles((theme) => ({
  root: {
    // border: "solid #3F3073",
    color: "#6d6d6d",
    // marginTop: "20px",
    textAlign: "center",
  },
}))(TextField);
