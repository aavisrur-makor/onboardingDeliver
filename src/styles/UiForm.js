import { TextField, withStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {},
  stepper: {
    backgroundColor: '#f3f3f3',
    borderRadius: '10px',
    color: 'white',
    '& .MuiStepLabel-label': {
      color: 'black',
    },
  },
  container: {
    backgroundColor: '#f2f1f1',
  },
}));
