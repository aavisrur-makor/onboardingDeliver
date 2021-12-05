import { FormControlLabel, makeStyles } from "@material-ui/core";
import { Box, Input, Typography } from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { useContext } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import FileContext from "../context/files";
import AuthContext from "../context/auth";
import InfoPopoverButton from "./InfoPopoverButton";

const useStyles = makeStyles({
  uploaderAttach: {
    marginLeft: "auto",
  },
});

const UploaderField = (props) => {
  const classes = useStyles();
  const { fileState, setFileState } = useContext(FileContext);
  const { authState, setAuthState } = useContext(AuthContext);

  const handleChange = async ({ target }) => {
    if (target.files[0]) {
      const formData = new FormData().append("file", target.files[0]);
      const fileType = target.files[0].type;

      if (
        fileType.includes("image") ||
        fileType.includes("text") ||
        fileType.includes("pdf")
      ) {
        console.log(target.id);
        await axios
          .post(
            `http://10.0.0.197:3030/api/file/${authState.uuid}/${target.id}`,
            formData
          )
          .then((res) => {
            if (res.status === 200) {
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
    <Box
      style={{ display: "flex", ...props.style, alignItems: "center" }}
      key={props.id}
    >
      <Typography className={classes.proofLabel}>{props.label}</Typography>
      {props.info && <InfoPopoverButton info={props.info} />}
      {fileState[props.id] && (
        <Typography>
          <CheckIcon />
          {fileState[props.id]}
        </Typography>
      )}
      <FormControlLabel
        className={classes.uploaderAttach}
        sx={{ color: "white" }}
        label={
          <Box sx={{ display: "flex" }}>
            <AttachFileIcon />
            <Typography>Attach File</Typography>
          </Box>
        }
        control={
          <StyledInput
            type="file"
            id={props.id}
            inputProps={{
              accept: "application/pdf, application/doc, application/docx",
            }}
            onChange={handleChange}
          />
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
