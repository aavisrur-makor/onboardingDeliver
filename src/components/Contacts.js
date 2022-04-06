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

import ContactCustomSelect from "./ContactCustomSelect";

const Contacts = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const querySelector = useMediaQuery(theme.breakpoints.down("md"));
  console.log("CONTACT INDEX", props.index);
  return (
    <>
      {querySelector && (
        <Divider style={{ marginTop: "10px", marginBottom: "10px" }}></Divider>
      )}
      <Grid
        container
        spacing={querySelector ? 2 : 5}
        style={{ paddingTop: 10 }}
      >
        <Grid item xs={12} md={2}>
          <ContactCustomSelect
            stateData={"positions"}
            stateDataMap={"positionsMap"}
            label={"Position"}
            handleChange={props.handlePositionChange}
            id={"position_uuid"}
            index={props.index}
          />
        </Grid>
        <Grid item container md={3} justifyContent="center">
          <Grid item xs={6} md={4}>
            <DialPhoneAutoComplete
              handleChange={props.handleDialCodeChange}
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
              handleChange={props.handleChange}
              index={props.index}
              id="phone"
              objectField="number"
              label="Phone Number"
              subIndex={0}
            />
          </Grid>
        </Grid>
        <Grid item container md={3} justifyContent="center">
          <Grid item xs={6} md={6}>
            <ContactsDispatcherField
              handleChange={props.handleChange}
              id="first_name"
              label="First Name"
              index={props.index}
              required
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <ContactsDispatcherField
              handleChange={props.handleChange}
              id="last_name"
              label="Last Name"
              index={props.index}
              required
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <ContactsDispatcherField
            handleChange={props.handleChange}
            index={props.index}
            id="email"
            label="Email"
            subIndex={0}
          />
        </Grid>
        {props.index > 0 && (
          <Grid
            item
            container
            justifyContent="center"
            xs={12}
            md={1}
            alignItems="center"
          >
            <IconButton
              onClick={(e) => props.handleDeleteContact(e, props.index)}
            >
              {props.index ? <TrashIcon /> : null}
            </IconButton>
          </Grid>
        )}
      </Grid>
    </>
  );
};
export default Contacts;
