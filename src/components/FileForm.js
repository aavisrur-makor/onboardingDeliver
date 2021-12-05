import React, { useEffect, useContext } from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import formData from "../data/formData";
import UploaderField from "./UploaderField";
import FileContext from "../context/files";
import DynamicInputGroup from "./DynamicInputGroup";
import { useStyles } from "../styles/UiForm";

const FileForm = ({ step }) => {
  const classes = useStyles();

  useEffect(() => {});
  return (
    <Box>
      <Typography className={classes.titleText}>Documents</Typography>
      <Box className={classes.uploader}>
        {formData.form2.map(({ id, label }, i) => (
          <>
            <UploaderField
              style={{ padding: "16px 0" }}
              id={id}
              label={label}
              info={i !== 1 && i !== formData.form2.length ? true : false}
            />
          </>
        ))}
      </Box>
      <Typography
        style={{
          backgroundColor: "#D6DFE4",
          marginTop: "32px",
          padding: "16px",
        }}
      >
        Personal documents for all shareholder/interest holders with 25% or more
        in the company, and also for at least two company’s current directors
        (and if no majority shareholder, than please provide a document signed
        by a director certifying that no individual owns 25% or more and leave
        this field empty)
      </Typography>
      <DynamicInputGroup />
    </Box>
  );
};

const StaticUploaderField = () => {};
export default FileForm;
