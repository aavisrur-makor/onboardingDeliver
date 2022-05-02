import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, IconButton, Typography } from "@material-ui/core";
import Contacts from "./Contacts";
import { useStyles } from "../styles/UiForm";
import { ReactComponent as AddIcon } from "./../assets/icons/Group46.svg";
import { addOnboardingContact } from "../redux/slices/singleOnboardingSlice";

const ContactsForm = () => {
  const contacts = useSelector((state) => state.onboarding.current.contacts);
  const classes = useStyles();
  const handleAdd = () => {
    dispatch(addOnboardingContact("contact"));
  };
  const dispatch = useDispatch();

 

  return (
    <>
      <Grid item>
        {contacts.map((contact, contactIndex) => {
          return contact.section === "contact" ? (
            <Contacts
              arrLength={
                contacts.filter(
                  (singleContact) =>
                    singleContact.section === contact.section
                ).length
              }
              index={contactIndex}
            />
          ) : null;
        })}
      </Grid>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item className={classes.addButtonParent}>
          <IconButton
            className={classes.addButton}
            onClick={handleAdd}
            disableRipple
            disableTouchRipple
            focusRipple={false}
          >
            <AddIcon style={{ marginRight: "20px" }} />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography style={{ cursor: "pointer" }} onClick={handleAdd}>
            Add Contact
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default ContactsForm;
