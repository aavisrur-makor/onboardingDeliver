import { FormControlLabel, makeStyles, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { Box, Input, Typography, Grid } from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { useContext } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import FileContext from "../context/files";
import AuthContext from "../context/auth";
import InfoPopoverButton from "./InfoPopoverButton";

const useStyles = makeStyles((theme) => ({
  proofLabel: {
    color: "#8A8A8A",
    display: "flex",
    alignItems: "center",
    font: "normal normal normal 16px/19px Work Sans",
    [theme.breakpoints.down("sm")]: { flex: "2 0 0" },
  },
  uploaderAttach: {
    borderTop: "1px solid #D6DFE4",
    borderBottom: "1px solid #D6DFE4",
    [theme.breakpoints.down("sm")]: { flex: "1 0 0" },
  },
  uploader: {
    [theme.breakpoints.down("sm")]: { rowGap: ".5rem" },
    borderTop: "1px solid #D6DFE4",
    "&.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12:last-of-type": {
      borderBottom: "1px solid #D6DFE4",
    },
    "& .MuiFormControlLabel-root": {
      marginLeft: "auto",
    },
    "& .MuiGrid-root.MuiGrid-item:last-child": {
      [theme.breakpoints.down("sm")]: { flexBasis: "100%" },
    },
    "& .MuiGrid-root.MuiGrid-item:first-child": {
      [theme.breakpoints.down("sm")]: { flexBasis: "90%" },
    },
  },
  attachFileIcon: {},
  // attachFileLabel:{[theme.breakpoints.down('sm')]:{}}
}));

const UploaderField = (props) => {
  const classes = useStyles();
  const { fileState, setFileState } = useContext(FileContext);
  const { authState, setAuthState } = useContext(AuthContext);
  const theme = useTheme();
  const queryMatch = useMediaQuery(theme.breakpoints.up("sm"));

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

  return (
    <Grid
      container
      justifyContent="space-between"
      className={classes.uploader}
      style={{ display: "flex", ...props.style, alignItems: "center" }}
      key={props.id}
    >
      <Grid item>
        <Grid item>
          <Typography className={classes.proofLabel}>{props.label}</Typography>
        </Grid>
      </Grid>

      <Grid style={{ marginRight: "auto" }} item>
        {props.info && <InfoPopoverButton info={props.info} />}
        {fileState[props.id] && (
          <Typography>
            <CheckIcon />
            {fileState[props.id]}
          </Typography>
        )}
      </Grid>
      <Grid item>
        <FormControlLabel
          sx={{ color: "white" }}
          label={
            <Box
              sx={{ display: "flex", flexDirection: "row", color: "#3E2F71" }}
            >
              <AttachFileIcon className={classes.attachFileIcon} />
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
    </Grid>
  );
};

export default UploaderField;

export const StyledInput = withStyles((theme) => ({
  root: {
    display: "none",
  },
}))(Input);
