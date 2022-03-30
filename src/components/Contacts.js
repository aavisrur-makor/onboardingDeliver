import {
  Divider,
  Grid,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import DispatcherField from "./DispatcherField";
import DialPhoneAutoComplete from "./DialPhoneAutoComplete";
import { useStyles } from "../styles/UiForm";
import { ReactComponent as TrashIcon } from "./../assets/icons/trashIcon.svg";
import ContactsDispatcherField from "./ContactsDispatcherField";
import { useSelector } from "react-redux";
import CustomSelect from "./CustomSelect";
import ContactCustomSelect from "./ContactCustomSelect";

const Contacts = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const querySelector = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      {querySelector && (
        <Divider style={{ marginTop: "10px", marginBottom: "10px" }}></Divider>
      )}
      <Grid container alignItems="center" spacing={querySelector ? 2 : 5}>
        <Grid item xs={12} md={5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <ContactCustomSelect
                stateData={"positions"}
                stateDataMap={"positionsMap"}
                label={"Position"}
                handleChange={props.handlePositionChange}
                id={"contact_position_uuid"}
                index={props.index}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container direction="row">
                <Grid item xs={3} md={4}>
                  <DialPhoneAutoComplete
                    handleChange={props.handleDialCodeChange}
                    index={props.index}
                    id="contact_phone"
                    objectField="dialing_code"
                    className={classes.contactDialCode}
                    subIndex={0}
                  />
                </Grid>
                <Grid item xs={9} lg={8} md={8}>
                  <ContactsDispatcherField
                    handleChange={props.handleChange}
                    index={props.index}
                    id="contact_phone"
                    objectField="number"
                    label="Phone Number"
                    subIndex={0}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <ContactsDispatcherField
                handleChange={props.handleChange}
                id="contact_name"
                label="Name"
                index={props.index}
                required
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <ContactsDispatcherField
                handleChange={props.handleChange}
                index={props.index}
                id="contact_email"
                label="email"
                subIndex={0}
              />
            </Grid>
          </Grid>
        </Grid>
        {props.index > 0 && (
          <Grid item justifyContent="center" xs={12} md={1}>
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
