import {
  Box,
  Checkbox,
  FormControlLabel,
  makeStyles,
  useMediaQuery,
} from "@material-ui/core";
import { Grid, Typography, Paper, List } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { useLayoutEffect, useContext, useEffect } from "react";
import CheckBoxOutlineBlankSharpIcon from "@material-ui/icons/CheckBoxOutlineBlankSharp";
import StyledButton from "../components/StyledButton";
import { useStyles } from "../styles/UiForm";
import { terms, appendix } from "../data/content";
import { createTermsAppendixContent, createTermsContent } from "../utils";
import { useTheme } from "@material-ui/styles";
import FieldContext from "../context/fields";
import { useDispatch, useSelector } from "react-redux";
import { setAuthField, updateTermsAsync } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const TermsForm = (props) => {
  const classes = useStyles();
  const isAgreeElectronic = useSelector(
    (state) => state.auth.isAgreeElectronic
  );
  const AcceptAndSendAgree = useSelector(
    (state) => state.auth.AcceptAndSendAgree
  );
  const theme = useTheme();
  const queryMatch = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const toggleUseETP = (isAgree) => {
    const data = { use_electronic_trading_platform: isAgree };
    dispatch(setAuthField({ id: "isAgreeElectronic", value: isAgree }));

    dispatch(updateTermsAsync("isAgreeElectronic", data));
  };

  const toggleAgree = (e) => {
    dispatch(
      setAuthField({ id: "AcceptAndSendAgree", value: e.target.checked })
    );
  };

  return (
    <Grid container className={classes.termFormContainer}>
      <Grid item>
        {!props.query && (
          <Typography className={classes.termsOfUseLabel} variant="h4">
            Terms of Use
          </Typography>
        )}
      </Grid>
      <Grid item className={classes.termOfUseContainer}>
        <Grid container spacing={2}>
          {createTermsContent(terms, classes)}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid
          container
          direction="column"
          className={classes.agreeToServiceBox}
        >
          <Grid item>
            <Typography
              style={{
                color: "#3E2F71",
                textAlign: "center",
                fontSize: "16px",
              }}
              variant="h6"
            >
              Would you like to use our electronic trading platform and
              services?
            </Typography>
          </Grid>
          <Grid item>
            <Grid container className={classes.yesNoContainer}>
              <Grid item>
                <StyledButton
                  id="isAgreeElectronic"
                  style={{
                    background: isAgreeElectronic ? "#222246" : "#ffffff",
                    color: isAgreeElectronic ? "#ffffff" : "#222246",
                  }}
                  onClick={() => toggleUseETP(true)}
                >
                  Yes
                </StyledButton>
              </Grid>
              <Grid item>
                <StyledButton
                  style={{
                    background: !isAgreeElectronic ? "#222246" : "#ffffff",
                    color: !isAgreeElectronic ? "#ffffff" : "#222246",
                  }}
                  onClick={() => toggleUseETP(false)}
                >
                  No
                </StyledButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item hidden={!isAgreeElectronic}>
            <Grid className={classes.termOfUseContainer} container spacing={3}>
              {createTermsAppendixContent(appendix, classes)}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.acceptLabel} xs={12}>
        <FormControlLabel
          className={classes.formLabelTermOfUse}
          sx={{ color: "white" }}
          control={
            <Checkbox
              onClick={toggleAgree}
              icon={<CheckBoxOutlineBlankSharpIcon />}
              checked={AcceptAndSendAgree}
            />
          }
          label={
            <Typography
              style={{
                fontSize: queryMatch ? "14px" : "16px",
                textAlign: "center",
              }}
            >
              Before you can submit application, you must agree with Terms of
              Use
            </Typography>
          }
        />
      </Grid>
      <Grid item className={classes.subAcceptLabel} xs={12}>
        <Grid>
          <Typography>
            The submitted documentation will be reviewed by the Compliance
            department. This process might take up to 14 business days.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default TermsForm;
