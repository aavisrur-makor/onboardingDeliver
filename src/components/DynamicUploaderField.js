import {
  Grid,
  Typography,
  FormControlLabel,
  Box,
  Input,
  useMediaQuery,
} from "@material-ui/core";
import {  memo } from "react";
import { useStyles } from "../styles/UiForm";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import CheckIcon from "@material-ui/icons/Check";
import { useContext } from "react";
import FileContext from "../context/files";
import AuthContext from "../context/auth";
import { IconButton } from "@material-ui/core";
import { ReactComponent as TrashIcon } from "./../assets/icons/trashIcon.svg";
import { withStyles } from "@material-ui/styles";
import InfoPopoverButton from "./InfoPopoverButton";
import InfoModal from "./InfoModal";

const DynamicUploaderField = memo((props) => {
  const classes = useStyles();
  const queryMatch = useMediaQuery("(max-width:600px)");


  return (
    <Grid
      container
      className={classes.dynamicUploaderContainer}
      spacing={!queryMatch ? 1 : 0}
    >
      <Grid item className={classes.dynamicFieldProofContainer}>
        <Grid container>
          <Grid item className={classes.dynamicPopoverButton}>
            <Typography direction="row" className={classes.proofLabel}>
              {props.proofItem.state === "occupied" && !queryMatch && (
                <CheckIcon style={{ color: "#3E2F71" }} />
              )}
              Proof of Identity
            </Typography>
          </Grid>
          <Grid item>
            {props.info ? (
              !queryMatch ? (
                <InfoPopoverButton info={props.labelInfo} />
              ) : (
                <InfoModal info={props.labelInfo} />
              )
            ) : null}
          </Grid>
        </Grid>
      </Grid>
      {!queryMatch && (
        <Grid item>
          <Typography direction="row" className={classes.proofLabel}>
            /
          </Typography>
        </Grid>
      )}

      <Grid item className={classes.dynamicFieldProofContainer}>
        <Grid container>
          <Grid item>
            <Typography direction="row" className={classes.proofLabel}>
              Proof of Address
            </Typography>
          </Grid>
          <Grid item className={classes.dynamicPopoverButton}>
            {props.info ? (
              !queryMatch ? (
                <InfoPopoverButton info={props.labelInfo} />
              ) : (
                <InfoModal info={props.labelInfo} />
              )
            ) : null}
          </Grid>
        </Grid>
      </Grid>

      <Grid item className={classes.attachFileGrid} md={12}>
        <FormControlLabel
          style={{ color: "white" }}
          label={
            <Box
              sx={{ display: "flex", flexDirection: "row", color: "#3E2F71" }}
            >
              <AttachFileIcon className={classes.attachFileIcon} />
              <Typography
                style={{
                  fontWeight:
                    props.proofItem.state === "occupied" ? "bold" : "400",
                }}
                className={classes.attachFileLabel}
              >
                {props.proofItem.state === "occupied"
                  ? props.proofItem.fileName
                  : "Attach File"}
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
              onChange={props.onUploadFile}
            />
          }
        />
      </Grid>
      {props.showTrash ? (
        <Grid item className={classes.dynamicTrashIcon}>
          <IconButton>
            <TrashIcon onClick={props.onDelete} />
          </IconButton>
        </Grid>
      ) : null}
    </Grid>
  );
});

export default DynamicUploaderField;

export const StyledInput = withStyles((theme) => ({
  root: {
    display: "none",
  },
}))(Input);
