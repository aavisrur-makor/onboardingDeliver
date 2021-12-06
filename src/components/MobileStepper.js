import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  circularProgress: {
    position: 'relative',
  },
  circularBG: {
    color: '#F3F3F3',
    position: 'absolute',
    lefT: '0',
  },
  circularMain: {
    color: '#3E2F71',
  },
  nextPageLabel: {
    // '&.customPatch': {
    //   [theme.breakpoints.down('sm')]: {
    //     visibility: 'hidden',
    //   },
    // },
  },
}));

const MobileStepper = (props) => {
  const classes = useStyles();
  return (
    <Box style={{ display: 'flex', gap: '5%', alignItems: 'center' }}>
      <Box
        position='relative'
        display='inline-flex'
        className={classes.circularProgress}
      >
        <CircularProgress
          variant='determinate'
          value={100}
          size='70px'
          className={classes.circularBG}
        />
        <CircularProgress
          className={classes.circularMain}
          variant='determinate'
          value={(props.steps + 1) * 33.3}
          size='70px'
        />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position='absolute'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Typography>{props.steps + 1} of 3</Typography>
        </Box>
      </Box>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
        }}
      >
        <Typography style={{ font: 'normal normal medium Work Sans' }}>
          {props.stepLabel}
        </Typography>
        <Typography
          style={{ color: '#B9C6CD' }}
          className={classes.nextPageLabel}
        >
          Next: {props.nextStepLabel}
        </Typography>
      </Box>
    </Box>
  );
};

export default MobileStepper;

// export default function CircularStatic() {
//   const [progress, setProgress] = React.useState(10);

//   React.useEffect(() => {
//     const timer = setInterval(() => {
//       setProgress((prevProgress) =>
//         prevProgress >= 100 ? 0 : prevProgress + 10
//       );
//     }, 800);
//     return () => {
//       clearInterval(timer);
//     };
//   }, []);

//   return <CircularProgressWithLabel value={progress} />;
// }
