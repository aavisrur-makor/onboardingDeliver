import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    flexCell: {
        flexBasis: '50%'
    }
  });

const FlexField = (props) => {
  const classes = useStyles();
  return (
    <TextField className={classes.flexCell} {...props} />
  );
}

export default FlexField;
