import { makeStyles, Box, Button, Typography } from "@material-ui/core";

const FinaleBox = () => {
  const handleClose = () => {};
  return (
    <Box>
      <Typography>Your application is successfully sent</Typography>
      <Button onClick={handleClose}>Close</Button>
    </Box>
  );
};

export default FinaleBox;
