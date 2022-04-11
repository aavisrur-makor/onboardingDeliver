import React, { useContext, useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import validator from "validator";
import StyledButton from "../components/StyledButton";
import axios from "axios";
import { Typography, Snackbar } from "@material-ui/core";
import AuthContext from "../context/auth";
import { useStyles } from "../styles/SmallForm";
import DialPhoneAutoComplete from "./DialPhoneAutoComplete";
import FormContext from "../context/form";
import { END_POINT, BASE_URL } from "../constants";
import { useDispatch } from "react-redux";
import {
  sendContactAsync,
  setFormFields,
} from "../redux/slices/smallFormSlice";
import SmallFormDialngCode from "./SmallForm/SmallFormDialingCode";

const SimpleForm = () => {
  // const [info, setInfo] = useState({
  //   company: "",
  //   name: "",
  //   email: "",
  //   phone: "",
  //   dialCode: "",
  // });

  const [errors, setErrors] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    dialCode: "",
  });

  const classes = useStyles();
  const [isSubmitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    dispatch(sendContactAsync());
  };

  const handleChange = (e) => {
    const { value, id } = e.target;

    const truncId = id.substr(7);

    dispatch(setFormFields({ id: e.target.id, value: e.target.value }));
    if (validator.isEmpty(value)) {
      setErrors((prev) => ({
        ...prev,
        [truncId]: "Field is empty",
      }));

      return;
    }

    switch (truncId) {
      case "name":
        if (!validator.isAlpha(value)) {
          setErrors((prev) => ({
            ...prev,
            [truncId]: "Must contain only letters.",
          }));

          return;
        }
        break;
      case "email":
        if (!validator.isEmail(value)) {
          setErrors((prev) => ({
            ...prev,
            [truncId]: "Not a valid email address.",
          }));

          return;
        }
        break;
      case "phone":
        if (validator.isAlpha(value)) {
          setErrors((prev) => ({
            ...prev,
            [truncId]: "Not a valid phone number.",
          }));

          return;
        }
        break;
      default:
        break;
    }
    setErrors((prev) => ({
      ...prev,
      [truncId]: "",
    }));
  };

  const handleCloseSnackbar = () => {
    setSubmitted(false);
  };
  const handleDialCode = (e, newValue) => {
    if (validator.isAlpha(newValue)) {
      setErrors({
        dialCode: "Is not a valid number.",
      });
      return;
    } else if (validator.isEmpty(newValue)) {
      setErrors({
        dialCode: "Field is empty.",
      });
      return;
    }
    setErrors({
      dialCode: "",
    });
  };
  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container className={classes.simpleForm}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <Typography className={classes.clientInformation}>
                Client Information
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container style={{ marginTop: "20px" }} spacing={2}>
                <Grid item xs={12} md={6} className={classes.gridItemContainer}>
                  <TextField
                    // onBlur={handleCh}
                    variant="outlined"
                    fullWidth
                    required
                    onChange={handleChange}
                    id="client_company_legal_name"
                    label="Company Legal Name"
                    className={classes.inputFields}
                    error={!!errors.company}
                    helperText={errors.company}
                  />
                </Grid>
                <Grid item xs={12} md={6} className={classes.gridItemContainer}>
                  <TextField
                    // onBlur={handleCh}
                    variant="outlined"
                    required
                    fullWidth
                    onChange={handleChange}
                    id="name"
                    label="Name"
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
                    // onBlur={handleCh}
                    type="email"
                    variant="outlined"
                    required
                    fullWidth
                    onChange={handleChange}
                    id="email"
                    label="Email"
                    className={classes.inputFields}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Grid container className={classes.dialAutoCompleteContainer}>
                    <Grid className={classes.dialAutoComplete} item>
                      <SmallFormDialngCode
                        handleChange={handleDialCode}
                        smallForm
                        // handleBlur={handleCh}
                        // loggedUserCountry={userCountry}
                      />
                    </Grid>
                    <Grid item className={classes.dialAutoCompleteNumber}>
                      <TextField
                        // onBlur={handleCh}
                        variant="outlined"
                        required
                        fullWidth
                        onChange={handleChange}
                        id="phone"
                        label="Phone"
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
                    type="submit"
                  >
                    Send
                  </StyledButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={isSubmitted}
          onClose={handleCloseSnackbar}
          message="Please proceed via the link sent to your email address."
          key={"snackbarKey"}
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
