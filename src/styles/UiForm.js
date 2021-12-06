import { TextField, withStyles, makeStyles } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) => ({
  root: {
    gap: "7%",
    "& .MuiPaper-root.MuiStepper-root.MuiStepper-horizontal.MuiPaper-elevation0":
      {},
    "&.MuiSvgIcon-root.MuiStepIcon-root": {
      width: "5rem",
    },
    "& .MuiStepLabel-root.MuiStepLabel-horizontal": {
      display: "flex",
      flexDirection: "column",
    },
    "& .MuiStepLabel-iconContainer": {
      padding: "0px",
    },
    "& .MuiSvgIcon-root.MuiStepIcon-root": {
      transform: "scale(2) translateY(23%)",
    },
    "&. MuiInputBase-input.MuiOutlinedInput-input": {
      borderRadius: "0",
      borderWidth: "3px",
    },
    "& .MuiStepConnector-line.MuiStepConnector-lineHorizontal": {
      borderTopWidth: "2px",
      padding: "10px",
    },
    "& .MuiStepIcon-root": {
      top: "493px",
      left: "615px",
      opacity: "1",
    },
    "& .MuiStepIcon-root.MuiStepIcon-active": {
      color: "#3E2F71",
    },
    "& .MuiStepIcon-text": {
      font: "normal normal normal 16px/22px Work Sans",
      fontSize: "0.5em",
    },
    "& .MuiTypography-body1": {
      color: "red",
    },
  },
  progressContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
    gap: "30px",
    "& .MuiLinearProgress-root": {
      flex: "1",
    },
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: "#3E2F71",
    },
    "& .MuiTypography-h5": {
      color: "#B9C6CD",
      fontSize: "1em",
    },
    "& .MuiLinearProgress-colorPrimary": {
      backgroundColor: "#D6DFE4",
    },
    "& .MuiLinearProgress-bar MuiLinearProgress-barColorPrimary MuiLinearProgress-bar1Determinate fill":
      {},
  },
  navButton: {
    // boxSizing: "border-box",
    padding: ".35rem 1.65rem",
    borderRadius: "0",
    backgroundSize: "100% 205%",
    backgroundOrigin: "padding",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center 100%",
    backgroundImage: "linear-gradient(to bottom, #3E2F72 50%, transparent 50%)",
    border: "3px #3E2F72 solid",
    transition: ".2s",
    "&:hover": {
      backgroundPosition: "center 0",
      color: "white",
    },
  },
  titleText: {
    fontWeight: "bold",
    font: "normal normal bold 24px/29px Cormorant Garamond",
  },
  stepper: {
    backgroundColor: "#f3f3f3",
    borderRadius: "10px",
    color: "white",
    "& .MuiStepLabel-label": {
      color: "black",
    },
    "& .MuiStepIcon-text": {
      font: "Work Sans",
    },
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "0% 0% no-repeat padding-box",
    boxShadow: "0px 5px 15px #4E4E4E29",
    opacity: "1",
    background: "0% 0% no-repeat padding-box",
    boxShadow: "0px 5px 15px #4E4E4E29",
    opacity: "1",
    top: "435px",
    left: "483px",
    width: "958px",
    // height: '1195px',
    padding: "50px",
  },
  onBoardingTitle: {},
  progressTitle: {
    color: "#B9C6CD",
  },
  Label: {
    "& .MuiStepLabel-label.MuiStepLabel-active": {
      font: "normal normal medium 16px/24px Work Sans",
      fontWeight: "bold",
    },
    "& .MuiStepLabel-label": {
      marginTop: "30px",
      font: "normal normal medium 16px/24px Work Sans",
      textAlign: "center",
      fontWeight: "bold",
    },
  },
  proofLabel: {
    color: "#8A8A8A",
    display: "flex",
    alignItems: "center",
    font: "normal normal normal 16px/19px Work Sans",
  },
  uploaderAttach: {
    marginLeft: "auto",
  },
  termButtons: {
    padding: "10px 50px",

    marginRight: "30px",
    borderRadius: "0",
    backgroundSize: "100% 205%",
    backgroundOrigin: "padding",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center 100%",
    backgroundImage: "linear-gradient(to bottom, #3E2F72 50%, transparent 50%)",
    border: "2px #222246 solid",
    transition: ".2s",
    "&:hover": {
      backgroundPosition: "center 0",
      color: "white",
    },
  },
  acceptLabel: {
    textAlign: "center",
    font: "normal normal normal 16px/24px Work Sans",
    letterSpacing: "0px",
    color: "#222246",
    opacity: "1",
    padding: "25px",
  },
  subAcceptLabel: {
    textAlign: "center",
    font: "normal normal normal 16px/24px Work Sans",
    letterSpacing: "0px",
    color: "#8A8A8A",
    opacity: "1",
    border: " 2px solid #222246",
    opacity: "1",
    // width: "108px",
    height: "43px",
  },
  uploader: {
    "& > .MuiBox-root": {
      borderTop: "1px solid rgba(0,0,0,.1)",
      color: "#8A8A8A",
    },
    "& > .MuiBox-root:last-child": {
      borderBottom: "1px solid rgba(0,0,0,.1)",
    },
  },
  acceptLabel: {
    textAlign: "center",
    font: "normal normal normal 16px/24px Work Sans",
    letterSpacing: "0px",
    color: "#3E2F71",
    opacity: "1",
  },
  termsOfUseLabel: {
    textAlign: "left",
    font: "normal normal bold 24px/29px Cormorant Garamond",
    letterSpacing: "0px",
    color: "#222246",
    opacity: "1",
    padding: "24px 0",
  },
  termsOfUseList: {
    color: "#3E2F71",
    fontFamily: "Work Sans",
    padding: "20px",
  },
  termOfUseContainer: {
    background: "#FCFCFC 0% 0% no-repeat padding-box",
    border: "1px solid #B9C6CD",
    opacity: "1",
    "&.MuiPaper-root.MuiPaper-elevation1.MuiPaper-rounded::-webkit-scrollbar": {
      width: "60px",
    },
    /* Track */
    "&.MuiPaper-root.MuiPaper-elevation1.MuiPaper-rounded::-webkit-scrollbar-track":
      {
        boxShadow: "inset 0 0 5px grey",
        borderRadius: "10px",
      },

    /* Handle */
    "&.MuiPaper-root.MuiPaper-elevation1.MuiPaper-rounded-webkit-scrollbar-thumb":
      {
        background: "red",
        borderRadius: "10px",
      },

    /* Handle on hover */
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#b30000",
    },
  },
}));
