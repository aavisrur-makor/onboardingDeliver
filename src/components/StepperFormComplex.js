import React, { useEffect, useContext, useState } from "react";
import { Stepper } from "@material-ui/core";
import { Step } from "@material-ui/core";
import { StepButton, Grid } from "@material-ui/core";
import PseudoForm from "./PseudoForm";
import FileForm from "./FileForm";
import TermsForm from "./TermsForm";
import ProgressBar from "./ProgressBar";
import axios from "axios";
import FieldContext from "../context/fields";
import FileContext from "../context/files";
import AuthContext from "../context/auth";

import { useParams } from "react-router";
import StyledButton from "./StyledButton";
import { useStyles as useMixins } from "../styles/mixins";
import { useStyles } from "../styles/UiForm";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core";
import MobileStepper from "./MobileStepper";
import { END_POINT, BASE_URL } from "../constants";
import TradingInfo from "./TradingInfo";
import { useDispatch, useSelector } from "react-redux";
import { setAuthField, setCurrentAuth } from "../redux/slices/authSlice";
import {
  getOnboardingData,
 
} from "../redux/slices/singleOnboardingSlice";

import OwnershipAndManagment from "./Section3/OwnershipAndManagment";

const steps = [
  "Company Info",
  "Trading Info",
  "Ownership and Managment",
  "Terms of Use",
];

const StepperFormComplex = () => {
  const classes = useStyles();
  const mixins = useMixins();

  const { authState, setAuthState } = useContext(AuthContext);
  const params = useParams();
  const theme = useTheme();
  const queryMatch = useMediaQuery("(max-width:800px)");
  const [activeStep, setActiveStep] = React.useState(0);
  

  const [completed, setCompleted] = React.useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("running THE STEPPER");
    if (params.uuid) {
      dispatch(setAuthField({ id: "uuid", value: params.uuid }));
      dispatch(getOnboardingData());
    }
  }, []);

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleAccept = () => {
    const fieldToUpdate = {
      accept_and_send: authState.AcceptAndSendAgree,
    };
    axios
      .put(
        `${BASE_URL}${END_POINT.EXTERNAL}${END_POINT.ONBOARDING}${authState.uuid}`,
        fieldToUpdate
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setAuthState((prev) => ({
      ...prev,
      AcceptAndSendFinish: true,
    }));
  };
  console.log("STEPPER FORM RENDER");
  return (
    <Grid container className={classes.container} sm={12}>
      {queryMatch ? (
        <Grid item xs={10}>
          <MobileStepper
            nextStepLabel={steps[activeStep + 1]}
            stepLabel={steps[activeStep]}
            activeStep={activeStep}
          />
        </Grid>
      ) : (
        <Grid xs={12}>
          <Stepper
            className={classes.stepper}
            nonLinear
            activeStep={activeStep}
          >
            {steps.map((label, i) => (
              <Step key={label} completed={completed[i]}>
                <StepButton
                  className={classes.Label}
                  color="inherit"
                  onClick={handleStep(i)}
                >
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </Grid>
      )}
      <Grid item className={classes.BoxContainer} xs={11}>
        <Grid container direction="column">
          <Grid item>{!queryMatch && <ProgressBar />}</Grid>
          <Grid item className={mixins.formBody}>
            {activeStep === 0 ? (
              <PseudoForm query={queryMatch} />
            ) : activeStep === 1 ? (
              <TradingInfo />
            ) : activeStep === 2 ? (
              <OwnershipAndManagment query={queryMatch} />
            ) : (
              <TermsForm query={queryMatch} />
            )}
          </Grid>
          <Grid item>
            <Grid container>
              {activeStep !== 0 && (
                <Grid item>
                  <StyledButton
                    // className={classes.navButton}
                    color="inherit"
                    className={classes.backStepperButtons}
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                    variant="outlined"
                  >
                    Back
                  </StyledButton>
                </Grid>
              )}
              <Grid item className={classes.navButtonRight}>
                {activeStep !== 3 ? (
                  <StyledButton
                    onClick={handleNext}
                    sx={{ mr: 1 }}
                    variant="outlined"
                  >
                    Next
                  </StyledButton>
                ) : (
                  <StyledButton
                    // className={classes.navButton}
                    className={classes.acceptAndSendStepperButtons}
                    onClick={handleAccept}
                    sx={{ mr: 1 }}
                    variant="outlined"
                    disabled={!authState.AcceptAndSendAgree}
                  >
                    Accept and Send
                  </StyledButton>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StepperFormComplex;
