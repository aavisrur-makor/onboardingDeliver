import { makeStyles, Box, Button, Typography, Modal } from "@material-ui/core";
import { useContext } from "react";
import { useStyles } from "../styles/FinalePage";
import AuthContext from "../context/auth";
const FinaleBox = () => {
  const classes = useStyles();
  const { authState, setAuthState } = useContext(AuthContext);
  const handleClose = () => {
    setAuthState((prev) => ({
      ...prev,
      AcceptAndSendFinish: false,
    }));
  };
  return (
    <Modal open={authState.AcceptAndSendFinish} className={classes.container}>
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
