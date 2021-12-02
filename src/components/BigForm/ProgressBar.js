import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth";
import { Box, Typography, LinearProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  progressContainer: {
    display: "flex",
    alignItems: "center",
    gap: "30px",
    "& .MuiLinearProgress-root.MuiLinearProgress-colorPrimary.MuiLinearProgress-determinate":
      {
        flex: "1",
      },
  },
}));

const ProgressBar = () => {
  const { authState } = useContext(AuthContext);
  const { progress } = authState;
  const classes = useStyles();

  useEffect(() => {
    console.log("progress progresss", progress);
  }, []);

  return (
    <Box className={classes.progressContainer}>
      <Typography variant="h4" component="p">
        Progress
      </Typography>
      <LinearProgress variant="determinate" value={progress} />
      <Typography variant="h4" component="p">
        {progress}%
      </Typography>
    </Box>
  );
};

export default ProgressBar;
