import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import validator from "validator";
import StyledButton from "../components/StyledButton";
import { Typography, Snackbar } from "@material-ui/core";
import { useStyles } from "../styles/SmallForm";
import { useDispatch } from "react-redux";
import {
  sendContactAsync,
  setFormFields,
} from "../redux/slices/smallFormSlice";
import SmallFormDialngCode from "./SmallForm/SmallFormDialingCode";

const SimpleForm = () => {
  

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
                <Grid
                  item
                  container
                  xs={12}
                  md={6}
                  className={classes.gridItemContainer}
                >
                  <Grid item md={6} xs={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      onChange={handleChange}
                      id="first_name"
                      label="First Name"
                      
                      className={classes.inputFields}
                      error={!!errors.name}
                      helperText={errors.name}
                    />
                  </Grid>
                  <Grid item md={6} xs={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      onChange={handleChange}
                      id="last_name"
                      label="Last Name"
                     
                      className={classes.inputFields}
                      error={!!errors.name}
                      helperText={errors.name}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6} className={classes.gridItemContainer}>
                  <TextField
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
                      
                      />
                    </Grid>
                    <Grid item className={classes.dialAutoCompleteNumber}>
                      <TextField
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
      </Grid>
    </Box>
  );
};
export default SimpleForm;
