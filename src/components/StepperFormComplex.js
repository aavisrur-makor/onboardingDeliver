import React, { useEffect, useContext } from 'react';
import { Box, Grid } from '@material-ui/core';
import { Stepper } from '@material-ui/core';
import { Step } from '@material-ui/core';
import { StepButton } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import PseudoForm from './PseudoForm';
import FileForm from './FileForm';
import TermsForm from './TermsForm';
import ProgressBar from './ProgressBar';
import axios from 'axios';
import FieldContext from '../context/fields';
import FileContext from '../context/files';
import AuthContext from '../context/auth';

import { useParams } from 'react-router';
import { useStyles } from '../styles/UiForm';

const steps = ['Submit Documentation', 'Attach Documents', 'Terms of Use'];

const StepperFormComplex = () => {
  const classes = useStyles();

  const { fieldState, setFieldState } = useContext(FieldContext);
  const { fileState, setFileState } = useContext(FileContext);
  const { authState, setAuthState } = useContext(AuthContext);
  const params = useParams();

  console.log('statetest', authState);

  useEffect(() => {
    console.log('uuid useeffect', authState, params.uuid);
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
    if (authState.isAccepted) window.location.pathname = 'finale';
  };

  return (
    <Grid container className={classes.container} ref={null} justify='center'>
      <Grid item xs={12} className={classes.BoxContainer}>
        <Stepper className={classes.root} nonLinear activeStep={activeStep}>
          {steps.map((label, i) => (
            <Step key={label} completed={completed[i]}>
              <StepButton
                className={classes.Label}
                color='inherit'
                onClick={handleStep(i)}
              >
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </Grid>
      <Grid item>
        <Grid container md={10} justify='center'>
          <Grid item xs={12} sx={{ padding: '0 4rem' }}>
            <ProgressBar />
          </Grid>
          <Grid item>
            {activeStep === 0 ? (
              <PseudoForm value={fieldState} />
            ) : activeStep === 1 ? (
              <FileForm />
            ) : (
              <TermsForm />
            )}
          </Grid>
          <Grid item sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Grid container>
              <Grid item>
                {activeStep !== 0 && (
                  <Button
                    className={classes.navButton}
                    color='inherit'
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                    variant='outlined'
                  >
                    Back
                  </Button>
                )}
              </Grid>
              <Grid
                item
                // sx={{ flex: '1 1 auto' }}
                xs={12}
                // sx={{ flex: '1 1 auto', justifyContent: 'space-between' }}
              >
                {activeStep !== 2 ? (
                  <Button
                    className={classes.navButton}
                    onClick={handleNext}
                    sx={{ mr: 1 }}
                    variant='outlined'
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    className={classes.navButton}
                    onClick={handleAccept}
                    sx={{ mr: 1 }}
                    variant='outlined'
                  >
                    Accept and Send
                  </Button>
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
