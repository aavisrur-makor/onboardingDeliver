import React, { useEffect, useContext } from "react";
import { Box, makeStyles, createStyles } from "@material-ui/core";
import { Stepper } from "@material-ui/core";
import { Step } from "@material-ui/core";
import { StepButton } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import PseudoForm from "./PseudoForm";
import FileForm from "./FileForm";
import TermsForm from "./TermsForm";
import ProgressBar from "./ProgressBar";
import { useSelector } from "react-redux";
import axios from "axios";
import FieldContext from "../../context/fields";
import FileContext from "../../context/files";
import AuthContext from "../../context/auth";
import fieldDataActions from "../store/fieldDataSlice";
import fileDataActions from "../store/fileDataSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import auth from "../../context/auth";

const steps = ["Submit Documentation", "Attach Documents", "Terms of Use"];

const useStyles = makeStyles((theme) => ({
  root: {
    gap: "10%",
    "& .MuiPaper-root.MuiStepper-root.MuiStepper-horizontal.MuiPaper-elevation0":
      {},
    "&.MuiSvgIcon-root.MuiStepIcon-root": {
      width: "5rem",
    },
    "& .MuiStepLabel-root.MuiStepLabel-horizontal": {
      display: "flex",
      flexDirection: "column",
    },
    "& .MuiStepLabel-iconContainer": {
      padding: "0",
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
    },
  },
  progressContainer: {
    display: "flex",
    alignItems: "center",
    gap: "30px",
    "& .MuiLinearProgress-root.MuiLinearProgress-colorPrimary.MuiLinearProgress-determinate":
      {
        flex: "1",
      },
  },
  navButton: {
    // boxSizing: "border-box",
    padding: ".35rem 1.65rem",
    borderRadius: "0",
    backgroundSize: "100% 205%",
    backgroundOrigin: "padding",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center 100%",
    backgroundImage: "linear-gradient(to bottom, blue 50%, transparent 50%)",
    border: "3px blue solid",
    transition: ".2s",
    "&:hover": {
      backgroundPosition: "center 0",
      color: "white",
    },
  },
}));

const StepperFormComplex = () => {
  // const uuid = React.useRef(window.search); ///////FIXXXXXXXXXX
  // const fileState = useSelector((state) => state.fileData);
  // const fieldState = useSelector((state) => state.fieldData);
  // const totalNumOfFields = React.useRef(Object.keys(formState).length);
  // const [barValue, setBarValue] = React.useState(0);
  // const [nonEmptyFields, setNonEmptyFields] = React.useState(0);
  // const dispatch = useDispatch();
  const classes = useStyles();

  const { fieldState, setFieldState } = useContext(FieldContext);
  const { fileState, setFileState } = useContext(FileContext);
  const { authState, setAuthState } = useContext(AuthContext);
  const params = useParams();
  const navigate = useNavigate();

  console.log("statetest", authState);

  useEffect(() => {
    if (params.uuid) {
      console.log("uuid useeffect", params.uuid);
      setAuthState((prev) => ({ ...prev, uuid: params.uuid }));
      console.log("uuid useeffect again", params.uuid, authState);

      axios
        .all([
          axios.get(`http://10.0.0.197:3030/api/onboarding/${params.uuid}`),
          axios.get(`http://10.0.0.197:3030/api/file/${params.uuid}`),
        ])
        .then((data) => {
          const [res1, res2] = data;
          console.log(res1.data, "inside Use effect");
          const textFields = res1.data[0];
          const fileFields = {};
          res2.data.forEach((file) => {
            fileFields[file.field_name] = file.file_name;
          });
          console.log("file fields on load", fileFields);
          const fullData = { ...textFields, ...fileFields };
          setFieldState(textFields);
          setFileState(fileFields);
          setAuthState((prev) => ({
            ...authState,
            progress: res1.data[0].progress,
          }));
        })
        .catch((err) => {
          console.log(err);
        });

      //   // dispatch(formDataActions.uploadFields(fullData));
      //   console.log("get state on app load", setFieldState);
      // } catch (err) {
      //   console.log("error in get state on app load", err);
      // }

      // .then(
      //   axios.spread(function (res1, res2) {
      //     const textFields = res1.data[0];
      //     const fileFields = {};
      //     res2.data.forEach((file) => {
      //       fileFields[file.field_name] = file.file_name;
      //     });
      //     const fullData = { ...textFields, ...fileFields };
      //     dispatch(formDataActions.uploadFields(fullData));
      //     console.log("get state on app load", fullData);
      //   })
      // )
      // .catch((err) => console.log(err));
      console.log("úseefect uuid");
    }
  }, [params]);
  //   const fields = {
  //     asd:'asdsad',

  // useEffect(() => {
  //   if (authState.accepted) {
  //     navigate.push("finale");
  //   }
  // }, [authState]);
  //   }
  // const doneFields = React.useState(0);
  //   const totalNumOfFields = Object.keys(fields).length;

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
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
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
    // setAuthState({
    //   accepted: true,
    //   ...authState,
    // });
    if (authState.isAccepted && authState.progress <= 95)
      window.location.pathname = "finale";
    // navigate.push("finale");
  };

  // const handleComplete = () => {
  //   const newCompleted = completed;
  //   newCompleted[activeStep] = true;
  //   setCompleted(newCompleted);
  //   handleNext();
  // };

  // const handleReset = () => {
  //   setActiveStep(0);
  //   setCompleted({});
  // };

  return (
    <Box className={classes.container}>
      <Box sx={{ width: "100%" }}>
        <Stepper className={classes.root} nonLinear activeStep={activeStep}>
          {steps.map((label, i) => (
            <Step key={label} completed={completed[i]}>
              <StepButton
                sx={{ color: "white", width: "5%" }}
                // className={classes.root}
                color="inherit"
                onClick={handleStep(i)}
              >
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <ProgressBar />
        <Box>
          <Typography variant="h4">On-Boarding Documentation</Typography>
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              {activeStep === 0 ? (
                <PseudoForm value={fieldState} />
              ) : activeStep === 1 ? (
                <FileForm />
              ) : (
                <p>
                  <TermsForm />
                </p>
              )}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              {activeStep !== 0 && (
                <Button
                  className={classes.navButton}
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                  variant="outlined"
                >
                  Back
                </Button>
              )}
              <Box sx={{ flex: "1 1 auto" }} />
              {activeStep !== 2 ? (
                <Button
                  className={classes.navButton}
                  onClick={handleNext}
                  sx={{ mr: 1 }}
                  variant="outlined"
                >
                  Next
                </Button>
              ) : (
                <Button
                  className={classes.navButton}
                  onClick={handleAccept}
                  sx={{ mr: 1 }}
                  variant="outlined"
                >
                  ACCEPT AND SEND
                </Button>
              )}
            </Box>
          </React.Fragment>
        </Box>
      </Box>
    </Box>
  );
};

export default StepperFormComplex;
