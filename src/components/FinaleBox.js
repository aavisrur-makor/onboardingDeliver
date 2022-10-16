import { Grid, Button, Typography, Modal } from "@material-ui/core";
import { useStyles } from "../styles/FinalePage";
import { useDispatch, useSelector } from "react-redux";
import { setAuthField } from "../redux/slices/authSlice";

const FinaleBox = () => {
  const classes = useStyles();
  const AcceptAndSendFinish = useSelector(
    (state) => state.auth.AcceptAndSendFinish
  );
  const remainingFields = useSelector(
    (state) => state.validation.remainingFields
  );
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setAuthField({ id: "AcceptAndSendFinish", value: false }));
    if (!remainingFields.length) {
      window.location.href = "https://enigma-securities.io/";
    }
  };

  const handleRemainingFields = () => {
    return remainingFields.map((field) => (
      <Typography
        style={{
          textAlign: "center",
          font: "normal normal normal 24px/28px Work Sans",
          color: "red",
        }}
      >
        {field.split("_").join(" ")}
      </Typography>
    ));
  };

  return (
    <Modal open={AcceptAndSendFinish} className={classes.container}>
      <Grid
        justifyContent="center"
        alignItems="center"
        direction="column"
        container
        item
        className={classes.subContainer}
      >
        {remainingFields.length ? (
          <>
            <Grid item md={12}>
              <Typography
                style={{
                  padding: "20px",
                  textAlign: "center",
                  font: "normal normal normal 24px/28px Work Sans",
                }}
              >
                The Fields Below are required :
              </Typography>
            </Grid>
            {handleRemainingFields()}
          </>
        ) : (
          <Typography
            style={{ font: "normal normal normal 24px/28px Work Sans" }}
          >
            Your application has been successfully sent
          </Typography>
        )}
        <Button className={classes.Button} onClick={handleClose}>
          Close
        </Button>
      </Grid>
    </Modal>
  );
};

export default FinaleBox;
