import React, { useEffect, useContext } from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { formData } from "../../utils/formData";
import UploaderField from "./UploaderField";
import FileContext from "../../context/files";
import { useSelector } from "react-redux";
import DynamicInputGroup from "./DynamicInputGroup";

const useStyles = makeStyles({
  uploader: {
    "& > .MuiBox-root": {
      borderTop: "1px solid rgba(0,0,0,.1)",
      color: "#8A8A8A",
    },
    "& > .MuiBox-root:last-child": {
      borderBottom: "1px solid rgba(0,0,0,.1)",
    },
   
  }, DocumentLabel:{
    font: "normal normal bold 24px/29px Cormorant Garamond"
  }
});


const FileForm = ({ step }) => {
  const classes = useStyles();
  const { fileState, setFileState } = useContext(FileContext);
  // const state = useSelector((state) => state.fileData);

  useEffect(() => {});
  return (
    <Box>
      <Typography>Documents</Typography>
      <Box className={classes.uploader}>
        {formData.form2.map(({ id, label }, i) => (
          <UploaderField
            style={{ padding: "16px 0" }}
            id={id}
            label={label}
            info={i !== 1 && i !== formData.form2.length ? true : false}
          />
        ))}
      </Box>
      <Typography style={{ backgroundColor: "#D6DFE4",marginTop:"32px",padding:"16px" }}>
      Personal documents for all shareholder/interest holders with 25% or more in the company, and also for at least two company’s current directors (and if no majority shareholder, than please provide a document signed by a director certifying that no individual owns 25% or more and leave this field empty){" "}
      </Typography>
      <DynamicInputGroup />
    </Box>
  );
};

export default FileForm;
