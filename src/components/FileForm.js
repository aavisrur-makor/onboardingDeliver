import React, { useEffect, useContext } from "react";
import { Box, makeStyles, Typography, Grid } from "@material-ui/core";
import formData from "../data/formData";
import UploaderField from "./UploaderField";
import FileContext from "../context/files";
import DynamicInputGroup from "./DynamicInputGroup";
import { useStyles } from "../styles/UiForm";

const FileForm = ({ step }) => {
  const classes = useStyles();

  useEffect(() => {});
  return (
    <Grid container>
      <Grid item>
        <Typography className={classes.titleText}>Documents</Typography>
      </Grid>
      <Grid item className={classes.uploader}>
        <Grid container>
          {formData.form2.map(({ id, label }, i) => (
            <Grid item xs={12}>
              <UploaderField
                style={{ padding: "16px 0" }}
                id={id}
                label={label}
                info={i !== 1 && i !== formData.form2.length ? true : false}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item>
        <Typography
          style={{
            backgroundColor: "#D6DFE4",
            marginTop: "32px",
            padding: "16px",
          }}
        >
          Personal documents for all shareholder/interest holders with 25% or
          more in the company, and also for at least two company’s current
          directors (and if no majority shareholder, than please provide a
          document signed by a director certifying that no individual owns 25%
          or more and leave this field empty)
        </Typography>
      </Grid>
      <DynamicInputGroup />
    </Grid>
  );
};

const StaticUploaderField = () => {};
export default FileForm;
