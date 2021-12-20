import React, { useContext, useEffect, useMemo, useState } from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import validator from 'validator';
import StyledButton from '../components/StyledButton';
import axios from 'axios';
import {
  Modal,
  Typography,
  Snackbar,
  makeStyles,
  FormControl,
} from '@material-ui/core';
import AuthContext from '../context/auth';
import { useStyles } from '../styles/SmallForm';
// import { Autocomplete } from "@mui/material";
import CountryAutoComplete from './CountryAutoComplete';
import DialPhoneAutoComplete from './DialPhoneAutoComplete';
// import { isEmail, isNumeric, isEmpty } from 'validator/es/lib';
import useValidate from '../hooks/useValidate';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  company: yup.string().required('Field is empty.'),
  name: yup.string().required('Field is empty.'),
  email: yup
    .string()
    .required('Field is empty.')
    .matches(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/),
  phone: yup.number('Not a valid number.').required('Field is empty.'),
});

const SimpleForm = () => {
  const [info, setInfo] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    dialCode: '',
  });
  // const [name, setName] = useState();
  // const [email, setEmail] = useState();
  // const [phone, setPhone] = useState();
  // const [dialCode, setDialCode] = useState();
  // const [company, setCompany] = useState();
  const [errors, setErrors] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
  });
  // const { isValid, errors } = useValidate([name, email, phone, company]);
  const { authState, setAuthState } = useContext(AuthContext);
  const classes = useStyles();
  const [isSubmitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: info.name,
      email: [info.email],
      phone: [
        {
          dialing_code: info.dialCode,
          number: info.phone,
        },
      ],
      company: info.company,
    };

    console.log('data', data);
    setSubmitted(true);
    axios
      .post(`http://10.0.0.191:3030/api/onboarding`, data)
      .then((res) => {
        if (res.status === 200) {
          const isNewUser = res.data.isNewUser;
          if (isNewUser) setAuthState((prev) => ({ ...prev, isNewUser }));
          ////////////////save uuid in redux
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const { value, id } = e.target;

    const truncId = id.substr(7);
    setInfo((prev) => ({
      ...prev,
      [truncId]: value,
    }));
    // switch (id) {
    //   case 'client_name':
    //     setName(value);
    //     setInfo((prev) => ({
    //       ...prev,
    //       name: 'Field is empty',
    //     }));
    //     break;
    //   case 'client_email':
    //     setEmail(value);
    //     break;
    //   case 'client_phone':
    //     setPhone(value);
    //     break;
    //   case 'client_company':
    //     setCompany(value);
    //     break;
    //   default:
    //     return null;
    // }
  };

  const handleBlur = (e) => {
    const truncId = e.target.id.substr(7);
    console.log(
      '🚀 ~ file: SimpleForm.js ~ line 106 ~ handleBlur ~ value',
      errors
    );

    if (validator.isEmpty(info[truncId])) {
      setErrors((prev) => ({
        ...prev,
        [truncId]: 'Field is empty',
      }));

      return;
    }

    switch (truncId) {
      case 'name':
        if (!validator.isAlpha(info[truncId])) {
          setErrors((prev) => ({
            ...prev,
            [truncId]: 'Must contain only letters.',
          }));

          return;
        }
        break;
      case 'email':
        if (!validator.isEmail(info[truncId])) {
          setErrors((prev) => ({
            ...prev,
            [truncId]: 'Is not a valid email address.',
          }));

          return;
        }
        break;
      case 'phone':
        if (validator.isAlpha(info[truncId])) {
          setErrors((prev) => ({
            ...prev,
            [truncId]: 'Is not a valid phone number.',
          }));

          return;
        }
        break;

        break;
      default:
        return null;
    }
    setErrors((prev) => ({
      ...prev,
      [info[truncId]]: '',
    }));

    // validationSchema
    //   .validate({
    //     [id]: toBeValidated,
    //   })
    //   .then((isValid, key) => {
    //     console.log(
    //       '🚀 ~ file: SimpleForm.js ~ line 117 ~ .then ~ isValid, key',
    //       isValid,
    //       key
    //     );
    //     setErrors((prev) => ({
    //       ...prev,
    //       [id]: '',
    //     }));
    //   })
    //   .catch((error) => {
    //     console.log(
    //       '🚀 ~ file: SimpleForm.js ~ line 117 ~ .then ~ isValid, key',
    //       error.path,
    //       error.message
    //     );
    //     setErrors((prev) => ({
    //       ...prev,
    //       [error.path]: error.error,
    //     }));
    // });

    // switch (id) {
    //   case 'client_name':
    //     setName(value);
    //     break;
    //   case 'client_email':
    //     setEmail(value);
    //     break;
    //   case 'client_phone':
    //     setPhone(value);
    //     break;
    //   case 'client_company':
    //     setCompany(value);
    //     break;
    //   default:
    //     return null;
    // }
  };

  const handleCloseSnackbar = () => {
    setSubmitted(false);
  };
  const handleDialCode = (e) => {
    setInfo((prev) => ({
      ...prev,
      dialingCode: e.dialing_code,
    }));
  };

  return (
    <Box component='form' onSubmit={handleSubmit}>
      <Grid container className={classes.simpleForm}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <Typography className={classes.clientInformation}>
                Client Information
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container style={{ marginTop: '20px' }} spacing={2}>
                <Grid item xs={12} md={6} className={classes.gridItemContainer}>
                  <TextField
                    onBlur={handleBlur}
                    variant='outlined'
                    fullWidth
                    required
                    onChange={handleChange}
                    id='client_company'
                    label='Company Legal Name'
                    className={classes.inputFields}
                    error={!!errors.company}
                    helperText={errors.company}
                  />
                </Grid>
                <Grid item xs={12} md={6} className={classes.gridItemContainer}>
                  <TextField
                    onBlur={handleBlur}
                    variant='outlined'
                    required
                    fullWidth
                    onChange={handleChange}
                    id='client_name'
                    label='Name'
                    // multiline
                    // maxRows={9}
                    // rows='9'
                    className={classes.inputFields}
                    error={!!errors.name}
                    helperText={errors.name}
                  />
                </Grid>
                <Grid item xs={12} md={6} className={classes.gridItemContainer}>
                  <TextField
                    onBlur={handleBlur}
                    type='email'
                    variant='outlined'
                    required
                    fullWidth
                    onChange={handleChange}
                    id='client_email'
                    label='Email'
                    className={classes.inputFields}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Grid container className={classes.dialAutoCompleteContainer}>
                    <Grid className={classes.dialAutoComplete} item>
                      <DialPhoneAutoComplete
                        handleChange={handleDialCode}
                        // loggedUserCountry={userCountry}
                      />
                    </Grid>
                    <Grid item className={classes.dialAutoCompleteNumber}>
                      <TextField
                        onBlur={handleBlur}
                        variant='outlined'
                        required
                        fullWidth
                        onChange={handleChange}
                        id='client_phone'
                        label='Phone'
                        color={errors.phone ? 'error' : 'primary'}
                        className={classes.inputFields}
                        error={!!errors.phone}
                        helperText={errors.phone}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} className={classes.gridItemButtonContainer}>
                  <StyledButton
                    // type="submit"
                    className={classes.sendButton}
                    type='submit'
                  >
                    Send
                  </StyledButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={isSubmitted}
          onClose={handleCloseSnackbar}
          message='Please proceed via the link sent to your email address.'
          key={'snackbarKey'}
          autoHideDuration={5000}
        />

        {/* <Modal className={classes.ModalContainer} open={isLogged}>
          <Box className={classes.ModalBoxContainer}>
            <Typography
              className={classes.modalTextFontTitle}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Success!
            </Typography>

            <Typography
              className={classes.modalTextFont}
              id="modal-modal-description"
              sx={{ mt: 2 }}
            >
              You can now proceed to the link sent to you the phone number you
              provided
            </Typography>
            <StyledButton
              onClick={() => {
                setLogged(false);
              }}
              className={classes.modalButton}
            >
              Close
            </StyledButton>
          </Box>
        </Modal> */}
      </Grid>
    </Box>
  );
};
export default SimpleForm;
