import { TextField, withStyles, makeStyles } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
  root: {
    gap: '7%',
    '& .MuiPaper-root.MuiStepper-root.MuiStepper-horizontal.MuiPaper-elevation0':
      {},
    '&.MuiSvgIcon-root.MuiStepIcon-root': {
      width: '5rem',
    },
    '& .MuiStepLabel-root.MuiStepLabel-horizontal': {
      display: 'flex',
      flexDirection: 'column',
    },
    '& .MuiStepLabel-iconContainer': {
      padding: '0px',
    },
    '& .MuiSvgIcon-root.MuiStepIcon-root': {
      transform: 'scale(2) translateY(23%)',
    },
    '&. MuiInputBase-input.MuiOutlinedInput-input': {
      borderRadius: '0',
      borderWidth: '3px',
    },
    '& .MuiStepConnector-line.MuiStepConnector-lineHorizontal': {
      borderTopWidth: '2px',
      padding: '10px',
    },
    '& .MuiStepIcon-root': {
      top: '493px',
      left: '615px',
      opacity: '1',
    },
    '& .MuiStepIcon-root.MuiStepIcon-active': {
      color: '#3E2F71',
    },
    '& .MuiStepIcon-text': {
      font: 'normal normal normal 16px/22px Work Sans',
      fontSize: '0.5em',
    },
    '& .MuiTypography-body1': {
      color: 'red',
    },
  },
  progressContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2rem',
    gap: '30px',
    '& .MuiLinearProgress-root': {
      flex: '1',
    },
    '& .MuiLinearProgress-barColorPrimary': {
      backgroundColor: '#3E2F71',
    },
    '& .MuiTypography-h5': {
      color: '#B9C6CD',
      fontSize: '1em',
      font: 'normal normal normal 16px/19px Work Sans',
    },
    '& .MuiLinearProgress-colorPrimary': {
      backgroundColor: '#D6DFE4',
    },
  },
  navButton: {
    // boxSizing: "border-box",
    padding: '.35rem 1.65rem',
    borderRadius: '0',
    backgroundSize: '100% 205%',
    backgroundOrigin: 'padding',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center 100%',
    backgroundImage: 'linear-gradient(to bottom, #3E2F72 50%, transparent 50%)',
    border: '3px #3E2F72 solid',
    transition: '.2s',
    '&:hover': {
      backgroundPosition: 'center 0',
      color: 'white',
    },
  },
  titleText: {
    fontWeight: 'bold',
    font: 'normal normal bold 24px/29px Cormorant Garamond',
    marginBottom: '24px',
  },
  stepper: {
    '& .MuiStepLabel-root.MuiStepLabel-horizontal': {
      display: 'flex',
      flexDirection: 'column',
    },
    '& .MuiStepLabel-iconContainer': {
      padding: '0px',
    },
    '& .MuiSvgIcon-root.MuiStepIcon-root': {
      transform: 'scale(2) translateY(23%)',
    },
    '&. MuiInputBase-input.MuiOutlinedInput-input': {
      borderRadius: '0',
      borderWidth: '3px',
    },
    '& .MuiStepConnector-line.MuiStepConnector-lineHorizontal': {
      borderTopWidth: '2px',
      padding: '10px',
    },
    '& .MuiStepIcon-text': {
      font: 'normal normal normal Work Sans',
    },
    '& .MuiStepIcon-root': {
      color: 'white',
      border: '1px solid #222246',
      borderRadius: '100%',
      transition: '.2s',
    },
    '& .MuiStepIcon-active': {
      color: '#3E2F71',
      border: 'none',
      '& .MuiStepIcon-text': {
        fill: '#fff',
      },
    },
    '& .MuiStepIcon-text': {
      fill: '#000',
    },
    '& .MuiTouchRipple-root.MuiStepButton-touchRipple': { display: 'none' },
    '& .MuiStepLabel-iconContainer > .MuiSvgIcon-root.MuiStepIcon-root.MuiStepIcon-active + .MuiStepLabel-labelContainer>.MuiTypography-root':
      {},
  },
  navButtonRight: {
    marginLeft: 'auto',
  },
  container: {
    // display: 'flex',

    justifyContent: 'center',
    alignItems: 'center',
    background: '0% 0% no-repeat padding-box',
    boxShadow: '0px 5px 15px #4E4E4E29',
    opacity: '1',
    background: '0% 0% no-repeat padding-box',
    boxShadow: '0px 5px 15px #4E4E4E29',
    opacity: '1',

    // height: '1195px',
    padding: '50px',
    // width: "calc(100vw - 1500px)",
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      padding: '2rem 0',
      gap: '1rem',
    },
  },
  progressTitle: {
    color: '#B9C6CD',
  },
  Label: {
    '& .MuiStepLabel-label.MuiStepLabel-active': {
      font: 'normal normal medium 16px/24px Work Sans',
      fontWeight: 'bold',
    },
    '& .MuiStepLabel-label': {
      marginTop: '30px',
      font: 'normal normal medium 16px/24px Work Sans',
      textAlign: 'center',
      fontWeight: 'bold',
    },
  },
  // proofLabel: {
  //   color: "#8A8A8A",
  //   display: "flex",
  //   alignItems: "center",
  //   font: "normal normal normal 16px/19px Work Sans",
  // },
  proofLabel: {
    color: '#8A8A8A',
    display: 'flex',
    alignItems: 'center',
    font: 'normal normal normal 16px/19px Work Sans',
  },
  uploaderAttach: {
    borderTop: '1px solid #D6DFE4',
    borderBottom: '1px solid #D6DFE4',
  },
  // uploader: {
  //   borderTop: "1px solid #D6DFE4",
  //   "&.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12:last-of-type": {
  //     borderBottom: "1px solid #D6DFE4",
  //   },
  //   "& .MuiFormControlLabel-root": {
  //     marginLeft: "auto",
  //   },
  // },

  uploaderAttach: {
    marginLeft: 'auto',
  },
  termButtons: {
    padding: '10px 50px',

    marginRight: '30px',
    borderRadius: '0',
    backgroundSize: '100% 205%',
    backgroundOrigin: 'padding',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center 100%',
    backgroundImage: 'linear-gradient(to bottom, #3E2F72 50%, transparent 50%)',
    border: '2px #222246 solid',
    transition: '.2s',
    '&:hover': {
      backgroundPosition: 'center 0',
      color: 'white',
    },
  },
  acceptLabel: {
    textAlign: 'center',
    font: 'normal normal normal 16px/24px Work Sans',
    letterSpacing: '0px',
    color: '#222246',
    opacity: '1',
    padding: '25px',
  },
  subAcceptLabel: {
    textAlign: 'center',
    font: 'normal normal normal 16px/24px Work Sans',
    letterSpacing: '0px',
    color: '#8A8A8A',
    opacity: '1',
    opacity: '1',
    // width: "108px",
    height: '43px',
  },
  uploader: {
    '& > .MuiBox-root': {
      borderTop: '1px solid rgba(0,0,0,.1)',
      color: '#8A8A8A',
    },
    '& > .MuiBox-root:last-child': {
      borderBottom: '1px solid rgba(0,0,0,.1)',
    },
    [theme.breakpoints.down('sm')]: {
      alignItems: 'start',
    },
  },
  acceptLabel: {
    textAlign: 'center',
    // font: "normal normal normal 16px/24px Work Sans",
    // letterSpacing: "0px",
    // color: "#3E2F71",
    // opacity: "1",
  },
  termFormContainer: {
    gap: '1.5rem',
    [theme.breakpoints.down('sm')]: {
      gap: '1rem',
    },
  },
  termsOfUseLabel: {
    textAlign: 'left',
    font: 'normal normal bold 24px/29px Cormorant Garamond',
    letterSpacing: '0px',
    color: '#222246',
    opacity: '1',
    // padding: "24px 0",
  },
  termsOfUseList: {
    color: '#3E2F71',
    fontFamily: 'Work Sans',
    padding: '20px',
  },
  termOfUseContainer: {
    opacity: '1',
    '&.MuiPaper-root.MuiPaper-elevation1.MuiPaper-rounded::-webkit-scrollbar': {
      width: '60px',
    },
    /* Track */
    '&.MuiPaper-root.MuiPaper-elevation1.MuiPaper-rounded::-webkit-scrollbar-track':
      {
        boxShadow: 'inset 0 0 5px grey',
        borderRadius: '10px',
      },

    /* Handle */
    '&.MuiPaper-root.MuiPaper-elevation1.MuiPaper-rounded-webkit-scrollbar-thumb':
      {
        background: 'red',
        borderRadius: '10px',
      },

    /* Handle on hover */
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#b30000',
    },
  },
  agreeToServiceBox: {
    padding: '2rem 1rem',
    border: '1px solid #B9C6CD ',
    alignItems: 'center',
    rowGap: '1.5rem',
  },
  yesNoContainer: {
    gap: '2rem',
  },
}));
