import { FormControlLabel, makeStyles } from "@material-ui/core";
import { Box, Input, Typography } from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { useContext, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import fileDataSlice from "../store/fileDataSlice";
import { withStyles } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import InfoIcon from "@material-ui/icons/Info";
import FileContext from "../../context/files";
import AuthContext from "../../context/auth";

const useStyles = makeStyles({
  uploaderAttach: {
    marginLeft: "auto",
  },
});
const UploaderField = (props) => {
  // const state = useSelector((state) => state.fileData);
  // const dispatch = useDispatch();
  // const [isUploaded, setUploaded] = useState(false);
  // const [fileName, setFileName] = useState("");
  const classes = useStyles();
  const { fileState, setFileState } = useContext(FileContext);
  const { authState, setAuthState } = useContext(AuthContext);
  const { uuid } = authState;

  const handleChange = async ({ target }) => {
    if (target.files[0]) {
      const formData = new FormData();
      formData.append("file", target.files[0]);
      const fileType = target.files[0].type;
      // console.log(target.files[0]);
      // console.log(fileType);
      if (
        fileType.includes("image") ||
        fileType.includes("text") ||
        fileType.includes("pdf")
      ) {
        console.log(target.id);
        await axios
          .post(
            `http://10.0.0.197:3030/api/file/6ba26ce7-536b-11ec-be49-d08e7912923c/${target.id}`,
            formData
          )
          .then((res) => {
            if (res.status === 200) {
              console.log("200 in files", res.data.progress);
              setAuthState((prev) => ({
                ...authState,
                progress: res.data.progress,
              }));

              setFileState({
                ...fileState,
                [target.id]: target.files[0].name,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  return (
    <Box style={{ display: "flex", ...props.style }}>
      <Typography>
        {/* {isUploaded && <span>v</span>}  */}
        {props.label}
      </Typography>
      {props.info && <InfoIcon />}
      {fileState[props.id] && (
        <Typography>
          <CheckIcon />
          {fileState[props.id]}
        </Typography>
      )}
      <FormControlLabel
        className={classes.uploaderAttach}
        sx={{ color: "white" }}
        control={
          <StyledInput
            type="file"
            id={props.id}
            inputProps={{
              accept: "application/pdf, application/doc, application/docx",
            }}
            onChange={handleChange}
          >
            {fileState[props.id] && <span>v</span>}
            {props.label}
          </StyledInput>
        }
        label={
          <Box sx={{ display: "flex" }}>
            <AttachFileIcon />
            <Typography>Attach File</Typography>
          </Box>
        }
      />
    </Box>
  );
};

export default UploaderField;

export const StyledInput = withStyles((theme) => ({
  root: {
    display: "none",
  },
}))(Input);
