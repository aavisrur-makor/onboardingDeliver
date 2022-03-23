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

const Contacts = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const querySelector = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      {querySelector && (
        <Divider style={{ marginTop: "10px", marginBottom: "10px" }}></Divider>
      )}
      <Grid container spacing={querySelector ? 2 : 5} alignItems="center">
        <Grid item xs={11} md={3}>
          <DispatcherField label="Name" required />
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container direction="row">
            <Grid item xs={3} md={4}>
              <DialPhoneAutoComplete className={classes.contactDialCode} />
            </Grid>
            <Grid item xs={8} lg={8} md={8}>
              <DispatcherField label="Phone Number" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={11} md={4}>
          <DispatcherField label="email" />
        </Grid>
        <Grid item justifyContent="center" xs={1} md={1}>
          {props.index > 0 && (
            <IconButton
              onClick={(e) => props.handleDeleteContact(e, props.index)}
            >
              {props.index ? <TrashIcon /> : null}
            </IconButton>
          )}
        </Grid>
      </Grid>
    </>
  );
};
export default Contacts;
