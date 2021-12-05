import { makeStyles, Box, Button, Typography } from "@material-ui/core";

const FinaleBox = () => {
  const classes = useStyles();
  const handleClose = () => {};
  return (
    <Modal open={true} className={classes.container}>
      <Box className={classes.subContainer}>
        <Typography
          style={{ font: "normal normal normal 24px/28px Work Sans" }}
        >
          Your application is successfully sent
        </Typography>
        <Button className={classes.Button} onClick={handleClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default FinaleBox;
