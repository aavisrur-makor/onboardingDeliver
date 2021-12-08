import {
  Grid,
  Typography,
  FormControlLabel,
  Box,
  Input,
} from "@material-ui/core";
import { useEffect, useState, memo } from "react";
import { useStyles } from "../styles/UiForm";
import UploaderField from "./UploaderField";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import axios from "axios";
import { useContext } from "react";
import FileContext from "../context/files";
import AuthContext from "../context/auth";
import { IconButton } from "@material-ui/core";
import { ReactComponent as TrashIcon } from "./../assets/icons/trashIcon.svg";
import { withStyles } from "@material-ui/styles";
const DynamicUploaderField = memo((props) => {
  const classes = useStyles();
  const { fileState, setFileState } = useContext(FileContext);
  const { authState, setAuthState } = useContext(AuthContext);
  const supposedFileName = "";
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
            `${process.env.REACT_APP_BASE_URL}file/${authState.uuid}/${target.id}`,
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
  const deleteField = (id) => {
    axios
      .delete("url", {
        fileId: id,
      })
      .then((res) => {
        ////////TAKE CARE OF DELETING LOCALLY
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Grid
      container
      // className={classes.uploader}
      key={props.id}
      alignItems="center"
    >
      <Grid item>
        <Grid container>
          <Grid item>
            <Typography className={classes.proofLabel}>
              Proof of Identity/Address
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <FormControlLabel
          sx={{ color: "white" }}
          label={
            <Box
              sx={{ display: "flex", flexDirection: "row", color: "#3E2F71" }}
            >
              <AttachFileIcon />
              <Typography className={classes.attachFileLabel}>
                Attach File
              </Typography>
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
      </Grid>
      <Grid item>
        <IconButton style={{ marginLeft: "auto" }}>
          <TrashIcon onClick={() => deleteField(supposedFileName)} />
        </IconButton>
      </Grid>
    </Grid>
  );
});

export default DynamicUploaderField;

export const StyledInput = withStyles((theme) => ({
  root: {
    display: "none",
  },
}))(Input);
