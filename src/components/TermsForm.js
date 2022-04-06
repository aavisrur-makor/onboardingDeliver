import {
  Box,
  Checkbox,
  FormControlLabel,
  makeStyles,
  useMediaQuery,
} from "@material-ui/core";
import { Grid, Typography, Paper, List } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { useState, useLayoutEffect, useContext, useEffect } from "react";
import AuthContext from "../context/auth";
import CheckBoxOutlineBlankSharpIcon from "@material-ui/icons/CheckBoxOutlineBlankSharp";
import StyledButton from "../components/StyledButton";
import { useStyles } from "../styles/UiForm";
import { terms, appendix } from "../data/content";
import { createTermsAppendixContent, createTermsContent } from "../utils";
import { useTheme } from "@material-ui/styles";
import axios from "axios";
import FieldContext from "../context/fields";
import { END_POINT, BASE_URL } from "../constants";

const TermsForm = (props) => {
  const classes = useStyles();
  const [checkBox, setCheckBox] = useState(false);
  const { authState, setAuthState } = useContext(AuthContext);
  const { fieldState } = useContext(FieldContext);
  const theme = useTheme();
  const queryMatch = useMediaQuery(theme.breakpoints.down("md"));

  useLayoutEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const toggleUseETP = (isAgree) => {
    const data = { use_electronic_trading_platform: isAgree };
    console.log(
      "🚀 ~ file: TermsForm.js ~ line 46 ~ toggleUseETP ~ isAgree",
      data
    );
    axios
      .put(
        `${BASE_URL}${END_POINT.EXTERNAL}${END_POINT.ONBOARDING}${authState.uuid}`,
        data
      )
      .then((res) => {
        setAuthState((prev) => ({ ...prev, isAgreeElectronic: isAgree }));
      })
      .catch((err) => {
        console.log(
          "🚀 ~ file: TermsForm.js ~ line 40 ~ toggleUseETP ~ err",
          err
        );
      });
  };

  const toggleAgree = (e) => {
    setAuthState((prev) => ({
      ...prev,
      AcceptAndSendAgree: e.target.checked,
    }));
    // const data = { accept_and_send: e.target.checked };
    // axios;
    // .put(`http://${BASE_URL}/onboarding/${authState.uuid}`, {
    //   field: "agreed_at",
    //   value: checked,
    // })
    // .then((res) => {
    //   setAuthState((prev) => ({ ...prev, isAgree: checked }));
    //   console.log(res);
    // })
    // .catch((err) => console.log(err));
    //////////////////PROBABLY NEEDS TO CALL THE SERVER NOW
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
                  style={{
                    background: authState.isAgreeElectronic
                      ? "#222246"
                      : "#ffffff",
                    color: authState.isAgreeElectronic ? "#ffffff" : "#222246",
                  }}
                  onClick={() => toggleUseETP(true)}
                >
                  Yes
                </StyledButton>
              </Grid>
              <Grid item>
                <StyledButton
                  style={{
                    background: !authState.isAgreeElectronic
                      ? "#222246"
                      : "#ffffff",
                    color: !authState.isAgreeElectronic ? "#ffffff" : "#222246",
                  }}
                  onClick={() => toggleUseETP(false)}
                >
                  No
                </StyledButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item hidden={!authState.isAgreeElectronic}>
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
              // defaultChecked={false}
              onClick={toggleAgree}
              icon={<CheckBoxOutlineBlankSharpIcon />}
              checked={authState.AcceptAndSendAgree}
            />
          }
          label={
            <Typography
              style={{
                fontSize: queryMatch ? "14px" : "16px",
                textAlign: "center",
              }}
            >
              Before you can submit application, you must aggree with Terms of
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
