import React, { useEffect } from 'react'
import { CircularProgress, Stepper, Typography } from '@material-ui/core'
import { Step } from '@material-ui/core'
import { StepButton, Grid } from '@material-ui/core'
import PseudoForm from './PseudoForm'
import TermsForm from './TermsForm'
import ProgressBar from './ProgressBar'
import { useParams } from 'react-router'
import StyledButton from './StyledButton'
import { useStyles as useMixins } from '../styles/mixins'
import { useStyles } from '../styles/UiForm'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core'
import MobileStepper from './MobileStepper'
import TradingInfo from './TradingInfo'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthField, updateTermsAsync } from '../redux/slices/authSlice'
import { getOnboardingData } from '../redux/slices/singleOnboardingSlice'
import OwnershipAndManagment from './Section3/OwnershipAndManagment'
import { checkRemainingFields, setFirstContactValidation, setIsFormSubmitted } from '../redux/slices/validationSlice'

const steps = ['Company Info', 'Trading Info', 'Ownership and Management', 'Terms of Use']

const StepperFormComplex = () => {
  const classes = useStyles()
  const mixins = useMixins()
  const params = useParams()
  const theme = useTheme()
  const queryMatch = useMediaQuery('(max-width:800px)')
  const [activeStep, setActiveStep] = React.useState(0)
  const uuidIsValid = useSelector((state) => state.auth.uuidIsValid)
  const metaDataloader = useSelector((state) => state.meta.metaDataloader)
  const loadingErrorMessage = useSelector((state) => state.auth.loadingErrorMessage)
  const companyType = useSelector((state) => state.onboarding.current.client_type_uuid)
  const companyTypeMap = useSelector((state) => state.meta.company_typesMap)
  const AcceptAndSendAgree = useSelector((state) => state.auth.AcceptAndSendAgree)
  const progress = useSelector((state) => state.auth.progress)
  const [completed, setCompleted] = React.useState({})
  const dispatch = useDispatch()

  useEffect(() => {
    if (params.uuid) {
      dispatch(setAuthField({ id: 'uuid', value: params.uuid }))
      if (metaDataloader) {
        dispatch(getOnboardingData())
        // dispatch(setFirstContactValidation())
      }
    }
  }, [metaDataloader])

  const totalSteps = () => {
    return steps.length
  }

  const completedSteps = () => {
    return Object.keys(completed).length
  }

  const isLastStep = () => {
    return activeStep === totalSteps() - 1
  }

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps()
  }

  const handleNext = () => {
    const newActiveStep = isLastStep() && !allStepsCompleted() ? steps.findIndex((step, i) => !(i in completed)) : activeStep + 1
    setActiveStep(newActiveStep)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleStep = (step) => () => {
    setActiveStep(step)
  }

  const handleAccept = () => {
    const fieldToUpdate = {
      accept_and_send: true,
    }
    dispatch(checkRemainingFields())
    dispatch(updateTermsAsync('AcceptAndSendAgree', fieldToUpdate))
    dispatch(setIsFormSubmitted(true))
    dispatch(setAuthField({ id: 'AcceptAndSendFinish', value: true }))
  }
  return uuidIsValid ? (
    <Grid container className={classes.container}>
      {queryMatch ? (
        <Grid item xs={10}>
          <MobileStepper nextStepLabel={steps[activeStep + 1]} stepLabel={steps[activeStep]} activeStep={activeStep} />
        </Grid>
      ) : (
        <Grid xs={12}>
          <Stepper className={classes.stepper} nonLinear activeStep={activeStep}>
            {steps.map((label, i) => (
              <Step
                disabled={i === 2 && (companyTypeMap[companyType] === 'Publicly Listed Company' || companyTypeMap[companyType] === 'State Owned Enterprise' || !companyTypeMap[companyType])}
                key={label}
                completed={completed[i]}
              >
                <StepButton className={classes.Label} color='inherit' onClick={handleStep(i)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </Grid>
      )}
      <Grid item className={classes.BoxContainer} xs={11}>
        <Grid container direction='column'>
          <Grid item>{!queryMatch && <ProgressBar />}</Grid>
          <Grid item xs={12} className={mixins.formBody}>
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
          <Grid item xs={12}>
            <Grid container>
              {activeStep !== 0 && (
                <Grid item>
                  <StyledButton
                    // className={classes.navButton}
                    color='inherit'
                    className={classes.backStepperButtons}
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                    variant='outlined'
                  >
                    Back
                  </StyledButton>
                </Grid>
              )}
              <Grid item className={classes.navButtonRight}>
                {activeStep !== 3 ? (
                  <StyledButton onClick={handleNext} sx={{ mr: 1 }} variant='outlined'>
                    Next
                  </StyledButton>
                ) : (
                  <StyledButton
                    // className={classes.navButton}
                    className={classes.acceptAndSendStepperButtons}
                    onClick={handleAccept}
                    sx={{ mr: 1 }}
                    variant='outlined'
                    // disabled={!AcceptAndSendAgree || progress !== 100}
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
  ) : (
    <Grid
      container
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Grid item>
        <CircularProgress />
      </Grid>
      <Grid item style={{ textAlign: 'center' }}>
        <Typography>{loadingErrorMessage ? loadingErrorMessage : 'Getting data...'}</Typography>
      </Grid>
    </Grid>
  )
}

export default StepperFormComplex
