import { Box, Button, Typography, Modal } from "@material-ui/core";
import { useStyles } from "../styles/FinalePage";
import { useDispatch, useSelector } from "react-redux";
import { setAuthField } from "../redux/slices/authSlice";

const FinaleBox = () => {
  const classes = useStyles();
  const AcceptAndSendFinish = useSelector(
    (state) => state.auth.AcceptAndSendFinish
  );
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setAuthField({ id: "AcceptAndSendFinish", value: false }));
    window.location.href = "https://enigma-securities.io/";
  };
  return (
    <Modal open={AcceptAndSendFinish} className={classes.container}>
      <Box className={classes.subContainer}>
        <Typography
          style={{ font: "normal normal normal 24px/28px Work Sans" }}
        >
          Your application has been successfully sent
        </Typography>
        <Button className={classes.Button} onClick={handleClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default FinaleBox;
