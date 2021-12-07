import { Box, Checkbox, FormControlLabel, makeStyles } from '@material-ui/core';
import { Grid, Typography, Paper, List } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/auth';
import CheckBoxOutlineBlankSharpIcon from '@material-ui/icons/CheckBoxOutlineBlankSharp';
import StyledButton from '../components/StyledButton';
import { useStyles } from '../styles/UiForm';
import { terms, appendix } from '../data/content';
import {
  createTermsAppendixContent,
  createTermsContent,
  handleAppendixSubSection,
  handleEntireSection,
  handleSubSection,
} from '../utils';

const TermsForm = (props) => {
  const classes = useStyles();
  const { authState, setAuthState } = useContext(AuthContext);

  const handleApprove = () => {
    setApproved(true);
  };
  const handleReject = () => {
    setApproved(false);
  };

  const toggleAgree = (e) => {
    const isAgree = e.target.checked;
    console.log('accepting ', isAgree);
    setAuthState((prev) => ({ ...prev, isAgree }));

    //////////////////PROBABLY NEEDS TO CALL THE SERVER NOW
  };

  useEffect(() => {
    console.log('authState', authState);
  }, [authState]);
  const [isApproved, setApproved] = useState(false);
  return (
    <Grid container className={classes.termFormContainer}>
      <Grid item>
        {!props.query && (
          <Typography className={classes.termsOfUseLabel} variant='h4'>
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
          direction='column'
          className={classes.agreeToServiceBox}
        >
          <Grid item>
            <Typography style={{ color: '#3E2F71' }} variant='h6'>
              Would you like to use our electronic trading platform and
              services?
            </Typography>
          </Grid>
          <Grid item>
            <Grid container className={classes.yesNoContainer}>
              <Grid item>
                <StyledButton onClick={handleApprove}>Yes</StyledButton>
              </Grid>
              <Grid item>
                <StyledButton onClick={handleReject}>No</StyledButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item hidden={isApproved ? false : true}>
            <Grid container spacing={3}>
              {createTermsAppendixContent(appendix, classes)}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.acceptLabel} xs={12}>
        <FormControlLabel
          sx={{ color: 'white' }}
          control={
            <Checkbox
              onChange={toggleAgree}
              style={{ color: '#271E49' }}
              icon={<CheckBoxOutlineBlankSharpIcon />}
              checked={authState.isAgree}
            />
          }
          label={
            <Typography>
              Before you can submit application, you must aggree with Terms of
              Use
            </Typography>
          }
        />
      </Grid>
      <Grid item className={classes.subAcceptLabel} xs={12}>
        <Grid>
          <Typography>
            The sumitted documentation will be rewviwews bby the Cinokuance
            deoartment.
          </Typography>
        </Grid>
        <Grid>
          <Typography>
            This process might take up to 14 business days.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default TermsForm;
