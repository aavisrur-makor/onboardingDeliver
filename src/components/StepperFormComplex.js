import React, { useEffect, useContext } from "react";
import { Box } from "@material-ui/core";
import { Stepper } from "@material-ui/core";
import { Step } from "@material-ui/core";
import { StepButton, Grid } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Typography, makeStyles } from "@material-ui/core";
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

const steps = ["Submit Documentation", "Attach Documents", "Terms of Use"];

const useStyles = makeStyles({
  root: {
    gap: "7%",
    paddingBottom: "1rem",
    "&.MuiSvgIcon-root.MuiStepIcon-root": {
      width: "5rem",
    },
    "& .MuiStepLabel-root.MuiStepLabel-horizontal": {
      display: "flex",
      flexDirection: "column",
    },
    "& .MuiStepLabel-iconContainer": {
      padding: "0px",
    },
    "& .MuiSvgIcon-root.MuiStepIcon-root": {
      transform: "scale(2) translateY(23%)",
    },
    "&. MuiInputBase-input.MuiOutlinedInput-input": {
      borderRadius: "0",
      borderWidth: "3px",
    },
    "& .MuiStepConnector-line.MuiStepConnector-lineHorizontal": {
      borderTopWidth: "2px",
      padding: "10px",
    },
    "& .MuiStepIcon-root": {
      top: "493px",
      left: "615px",
      opacity: "1",
    },
    "& .MuiStepIcon-root.MuiStepIcon-active": {
      color: "#3E2F71",
    },
    "& .MuiStepIcon-text": {
      font: "normal normal normal 16px/22px Work Sans",
      fontSize: "0.5em",
    },
    "& .MuiTypography-body1": {
      color: "red",
    },
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    background: "0% 0% no-repeat padding-box",
    boxShadow: "0px 5px 15px #4E4E4E29",
    opacity: "1",
    background: "0% 0% no-repeat padding-box",
    boxShadow: "0px 5px 15px #4E4E4E29",
    padding: "2rem 2rem 4rem",
  },
  label: {
    "& .MuiStepLabel-label.MuiStepLabel-active": {
      font: "normal normal medium 16px/24px Work Sans",
      fontWeight: "bold",
    },
    "& .MuiStepLabel-label": {
      marginTop: "30px",
      font: "normal normal medium 16px/24px Work Sans",
      textAlign: "center",
      fontWeight: "bold",
    },
  },
  navButtonRight: {
    marginLeft: "auto",
  },
});

const StepperFormComplex = () => {
  const classes = useStyles();
  const mixins = useMixins();

  const { fieldState, setFieldState } = useContext(FieldContext);
  const { fileState, setFileState } = useContext(FileContext);
  const { authState, setAuthState } = useContext(AuthContext);
  const params = useParams();

  console.log("statetest", authState);

  useEffect(() => {
    console.log("uuid useeffect", authState, params.uuid);
    setAuthState((prev) => ({ ...prev, uuid: params.uuid }));
    if (!authState.isNewUser && params.uuid) {
      const fieldCall = axios.get(
          `${process.env.REACT_APP_BASE_URL}onboarding/${params.uuid}`
        ),
        fileCall = axios.get(
          `${process.env.REACT_APP_BASE_URL}file/${params.uuid}`
        );

      axios
        .all([fieldCall, fileCall])
        .then(
          axios.spread((res1, res2) => {
            const textFields = res1.data;
            const fileFields = {};

            res2.data.forEach((file) => {
              fileFields[file.field_name] = file.file_name;
            });

            const fullData = { ...textFields, ...fileFields };
            setFieldState((prev) => ({ ...prev, ...textFields }));
            setFileState((prev) => ({ ...prev, ...fileFields }));
            setAuthState((prev) => ({
              ...prev,
              progress: res1.data.progress,
            }));
          })
        )
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {}, [authState]);

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

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
    if (authState.isAccepted) window.location.pathname = "finale";
  };

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12}>
        <Stepper className={classes.root} nonLinear activeStep={activeStep}>
          {steps.map((label, i) => (
            <Step key={label} completed={completed[i]}>
              <StepButton
                className={classes.label}
                color="inherit"
                onClick={handleStep(i)}
              >
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </Grid>
      <Grid item className={classes.BoxContainer} xs={10}>
        <Grid container direction="column">
          <Grid item>
            <ProgressBar />
          </Grid>
          <Grid item className={mixins.formBody}>
            {activeStep === 0 ? (
              <PseudoForm value={fieldState} />
            ) : activeStep === 1 ? (
              <FileForm />
            ) : (
              <TermsForm />
            )}
          </Grid>
          <Grid item>
            <Grid container>
              {activeStep !== 0 && (
                <Grid item>
                  <StyledButton
                    // className={classes.navButton}
                    color="inherit"
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
                {activeStep !== 2 ? (
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
                    onClick={handleAccept}
                    sx={{ mr: 1 }}
                    variant="outlined"
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
