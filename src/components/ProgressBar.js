import React, { useContext, useEffect } from "react";
import AuthContext from "../context/auth";
import { Box, Typography, LinearProgress } from "@material-ui/core";
import { useStyles } from "../styles/UiForm";
import { useSelector } from "react-redux";

const ProgressBar = () => {
  const progress = useSelector((state) => state.auth.progress);
  const classes = useStyles();

  useEffect(() => {}, []);

  return (
    <Box className={classes.progressContainer}>
      <Typography className={classes.progressTitle} component="p">
        Progress
      </Typography>
      <LinearProgress
        variant="determinate"
        className={classes.progressBar}
        value={progress}
      />
      <Typography className={classes.barValue} variant="h5" component="p">
        {progress}%
      </Typography>
    </Box>
  );
};

export default ProgressBar;
