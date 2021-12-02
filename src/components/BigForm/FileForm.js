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
    },
    "& > .MuiBox-root:last-child": {
      borderBottom: "1px solid rgba(0,0,0,.1)",
    },
  },
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
            style={{ padding: ".5rem 0" }}
            id={id}
            label={label}
            info={i !== 1 && i !== formData.form2.length ? true : false}
          />
        ))}
      </Box>
      <Typography style={{ backgroundColor: "#D6DFE4", padding: "1rem" }}>
        lorem3skldfjksdf sdf sdf sd fsd f sdf sdawdasf afafjksdf sdf sdf sd fsd
        f sdf sdawdasf afafjksdf sdf sdf sd fsd f sdf sdawdasf afafjksdf sdf sdf
        sd fsd f sdf sdawdasf afafjksdf sdf sdf sd fsd f sdf sdawdasf afafjksdf
        sdf sdf sd fsd f sdf sdawdasf afafjksdf sdf sdf sd fsd f sdf sdawdasf
        afafjksdf sdf sdf sd fsd f sdf sdawdasf afasfasfa sfsa sad sad{" "}
      </Typography>
      <DynamicInputGroup />
    </Box>
  );
};

export default FileForm;
