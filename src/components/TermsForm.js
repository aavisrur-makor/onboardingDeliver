import { Box, Checkbox, FormControlLabel, makeStyles } from '@material-ui/core';
import { Grid, Typography, Paper, List } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/auth';
import CheckBoxOutlineBlankSharpIcon from '@material-ui/icons/CheckBoxOutlineBlankSharp';
// import { useStyles } from "../styles/UiForm";
import { terms } from '../data/content';
import StyledButton from '../components/StyledButton';
import { useStyles } from '../styles/UiForm';

const createContentRecursively = (obj) => {
  Object.entries(obj).map(([key, value]) => {
    if (key === 'title') {
      return <Typography variant='h3'>{}</Typography>;
    } else if (key === 'title') {
      return <Typography variant='h3'>{}</Typography>;
    }
  });
};
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
        <Box>
          <Typography className={classes.termsOfUseList}>
            1.Acceptance of the Terms
          </Typography>
          <Box className={classes.termsOfUseList}>
            <Typography className={classes.termsOfUseList}>1.1</Typography>{' '}
            These Terms of Use (the “Terms”) set out the terms and conditions
            under which you (“You” or “Your” as appropriate) can trade
            cryptocurrencies, for example Bitcoin or Ethereum (“Crypto” or
            “Cryptocurrency”) using Enigma Securities Limited as a broker (the
            “Service”). Enigma Securities Ltd (“Enigma”, “Us”, “We” or “Our” as
            appropriate) is a company registered in England and Wales with
            company number 11114339 and registered office located at Gossard
            House, 7/8 Saville Row, London, W1S 3PE, United Kingdom. Enigma is
            an Appointed Representative of Makor Securities London Ltd which is
            authorised and regulated (Reference No: 625054) by the Financial
            Conduct Authority (the “FCA”).
          </Box>
        </Box>
        <Box>
          <Box className={classes.termsOfUseList}>
            <Typography className={classes.termsOfUseList}>1.2</Typography> You
            acknowledge and agree that by engaging with Enigma, placing any
            funds with us to execute transactions or generally using the Service
            in any way, You will be deemed to have accepted these Terms. You
            understand that each order submitted to Enigma (whether by voice
            broking, email or via any other electronic interface that We may
            provide and/or accept) may result in Your entry into one or more
            binding transactions (a “Transaction”). You assume full financial
            and performance responsibility for all such Transactions created as
            a result of the process set out in these Terms.
          </Box>
        </Box>
        <Box>
          <Typography className={classes.termsOfUseList}>
            2.Amendment to the Terms
          </Typography>
          <Box className={classes.termsOfUseList}>
            Unless We consider any amendment to be a material change to the
            Terms (in which case we will provide You with not less than 7
            (seven) days’ prior notice (a “Notice”)), We reserve the right to
            amend the Terms at any time without prior notice to You. All changes
            shall take effect immediately and an updated version of the Terms
            shall be published on Our website. If You do not agree to any
            amendment then You should stop using the Service immediately.
          </Box>
        </Box>
        {/* </List> */}
        {/* </Paper> */}
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
          <Grid hidden={isApproved ? false : true}>
            <Typography variant='h3'>AML Terms Appendix</Typography>
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
