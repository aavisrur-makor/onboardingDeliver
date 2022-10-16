import {
  Divider,
  Grid,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import DialPhoneAutoComplete from "./DialPhoneAutoComplete";
import { useStyles } from "../styles/UiForm";
import { ReactComponent as TrashIcon } from "./../assets/icons/trashIcon.svg";
import ContactsDispatcherField from "./ContactsDispatcherField";
import {
  deleteContactAsync,
  setOnboardingContactField,
  updateContactFieldOnboarding,
} from "../redux/slices/singleOnboardingSlice";
import ContactCustomSelect from "./ContactCustomSelect";
import { useDispatch } from "react-redux";
import { useState } from "react";
import validator from "validator";
import {
  deleteContactValidation,
  setContactValidation,
  setOnboardingContactValidationField,
} from "../redux/slices/validationSlice";

const Contacts = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [error, setError] = useState("");
  const querySelector = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const [validatedEmail, setValidatedEmail] = useState(true);
  const handleDeleteContact = (e, index) => {
    dispatch(deleteContactAsync(index));
    dispatch(deleteContactValidation({ contactIndex: index }));
  };
  const handleContactChange = (e, contactIndex, objectField) => {
    const fieldName = e.target.id.split("-")[0];
    if (fieldName === "email") {
      setValidatedEmail(validator.isEmail(e.target.value));
    }
   
    dispatch(
      setOnboardingContactField({
        id: fieldName,
        value: e.target.value,
        contactIndex,
        objectField,
      })
    );

    dispatch(updateContactFieldOnboarding(contactIndex));
  };
  const handleContactDialCodeChange = (
    e,
    countryDialCodeInput,
    contactIndex,
    objectField
  ) => {
    const fieldName = e.target.id.split("-")[0];
    
    dispatch(
      setOnboardingContactField({
        id: fieldName,
        value: countryDialCodeInput,
        contactIndex,
        objectField,
      })
    );
    dispatch(updateContactFieldOnboarding(contactIndex));
    dispatch(setOnboardingContactValidationField({contactIndex,field:objectField,value:true}))
  };

  const handleContactPositionChange = (e, child, contactIndex) => {
    dispatch(
      setOnboardingContactField({
        id: e.target.name,
        value: child.props.id,
        contactIndex,
      })
    );
    dispatch(updateContactFieldOnboarding(contactIndex));
    dispatch(setOnboardingContactValidationField({contactIndex,field:e.target.name,value:true}))
  };
  return (
    <>
      {querySelector && (
        <Divider style={{ marginTop: "10px", marginBottom: "10px" }}></Divider>
      )}
      <Grid container spacing={querySelector ? 2 : 1}>
        <Grid item xs={12} md={2}>
          <ContactCustomSelect
            stateData={"positions"}
            stateDataMap={"positionsMap"}
            label={"Position"}
            handleChange={handleContactPositionChange}
            id={"position_uuid"}
            index={props.index}
            required
          />
        </Grid>
        <Grid item container md={3} justifyContent="center">
          <Grid item xs={6} md={4}>
            <DialPhoneAutoComplete
              required
              label={"Code"}
              handleContactDialCodeChange={handleContactDialCodeChange}
              index={props.index}
              id="phone"
              objectField="dialing_code"
              className={classes.contactDialCode}
              subIndex={0}
              type={props.type}
            />
          </Grid>
          <Grid item xs={6} md={7}>
            <ContactsDispatcherField
              handleChange={handleContactChange}
              index={props.index}
              id="phone"
              objectField="number"
              label="Phone Number"
              subIndex={0}
              required
            />
          </Grid>
        </Grid>
        <Grid item container md={3} justifyContent="center">
          <Grid item xs={6} md={6}>
            <ContactsDispatcherField
              handleChange={handleContactChange}
              id="first_name"
              label="First Name"
              index={props.index}
              required
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <ContactsDispatcherField
              handleChange={handleContactChange}
              id="last_name"
              label="Last Name"
              index={props.index}
              required
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <ContactsDispatcherField
            handleChange={handleContactChange}
            index={props.index}
            id="email"
            label="Email"
            subIndex={0}
            required
            error={validatedEmail}
            helperText={"Email is not valid!"}
          />
        </Grid>
        {props.arrLength > 1 && (
          <Grid
            item
            container
            justifyContent="center"
            xs={12}
            md={1}
            alignItems="center"
          >
            <IconButton onClick={(e) => handleDeleteContact(e, props.index)}>
              {props.arrLength > 1 ? <TrashIcon /> : null}
            </IconButton>
          </Grid>
        )}
      </Grid>
    </>
  );
};
export default Contacts;
