import { makeStyles } from "@material-ui/core";

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
  },
  selectIcon: {
    "& .MuiSelect-icon": {
      color: "#3E2F71",
    },
  },
  toggleButtonColor: {
    "& .css-17ndd9v-MuiButtonBase-root-MuiToggleButton-root.Mui-selected": {
      backgroundColor: "#E7E6ED",
      border: "1px solid #3E2F71",
    },
    "& .css-mgs850-MuiToggleButtonGroup-root .MuiToggleButtonGroup-grouped": {
      border: "1px solid #B9C6CD ",
      backgroundColor: "#FCFCFC",
    },
    "&.css-mgs850-MuiToggleButtonGroup-root .MuiToggleButtonGroup-grouped:not(:first-of-type)":
      {
        borderLeft: "1px solid #3E2F71",
      },
  },
  calenderIcon: {
    "& .MuiIconButton-root:hover": {
      backgroundColor: "transparent",
    },
    "& .css-1yq5fb3-MuiButtonBase-root-MuiIconButton-root:hover": {
      backgroundColor: "transparent",
    },
  },

  progressContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "2rem",
    gap: "30px",
    "& .MuiLinearProgress-root": {
      borderRadius: "10px",
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
    [theme.breakpoints.down("md")]: {
      "& .MuiButtonBase-root": { padding: "25px" },
    },
  },
  titleText: {
    fontWeight: "bold",
    font: "normal normal bold 24px/29px Cormorant Garamond",
    marginBottom: "24px",
  },
  stepper: {
    gap: "2rem",
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
      borderTopWidth: "1px",
      padding: "10px",
    },
    "& .MuiStepIcon-text": {
      font: "normal normal normal Work Sans",
    },
    "& .MuiStepIcon-root": {
      color: "white",
      border: "1px solid #222246",
      borderRadius: "100%",
      transition: ".2s",
    },
    "& .MuiStepIcon-active": {
      color: "#3E2F71",
      border: "none",
      "& .MuiStepIcon-text": {
        fill: "#fff",
      },
    },
    "& .MuiStepIcon-text": {
      fill: "#000",
    },
    "& .MuiTouchRipple-root.MuiStepButton-touchRipple": { display: "none" },
    "& .MuiStepLabel-iconContainer > .MuiSvgIcon-root.MuiStepIcon-root.MuiStepIcon-active + .MuiStepLabel-labelContainer>.MuiTypography-root":
      {},
  },
  navButtonRight: {
    marginLeft: "auto",
  },
  container: {
    // display: 'flex',

    justifyContent: "center",
    alignItems: "center",

    opacity: "1",
    background: "0% 0% no-repeat padding-box",
    boxShadow: "0px 5px 15px #4E4E4E29",

    // height: '1195px',
    padding: "50px 0px",
    // width: "calc(100vw - 1500px)",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: "2rem 2px",
      gap: "1rem",
    },
  },
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
  // proofLabel: {
  //   color: "#8A8A8A",
  //   display: "flex",
  //   alignItems: "center",
  //
  // },
  proofLabel: {
    color: "#8A8A8A",
    display: "flex",
    alignItems: "center",
    padding: "0",
  },
  uploaderAttach: {
    borderTop: "1px solid #D6DFE4",
    borderBottom: "1px solid #D6DFE4",
    marginLeft: "auto",
  },

  filesParagraph: {
    backgroundColor: "#D6DFE4",
    marginTop: "32px",
    padding: "16px",
    [theme.breakpoints.down("sm")]: {
      textAlign: "justify",
      marginTop: "32px",
      padding: "25px",
      fontSize: ".95rem",
    },
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

  attachFileIcon: {
    [theme.breakpoints.down("sm")]: { transform: "scale(.9)" },
  },
  attachFileGrid: {
    transform: "translateX(5px)",

    [theme.breakpoints.up("md")]: {
      order: 1,
    },
  },
  attachFileLabel: {
    [theme.breakpoints.down("sm")]: {
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
      width: "150px",
    },
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
  acceptAndSendStepperButtons: {
    [theme.breakpoints.down("md")]: {
      "& .MuiButtonBase-root": { padding: "25px" },
    },
  },
  subAcceptLabel: {
    font: "normal normal normal 16px/24px Work Sans",
    letterSpacing: "0px",
    color: "#8A8A8A",
    opacity: "1",

    "& .MuiTypography-root.MuiTypography-body1": {
      textAlign: "center",
      [theme.breakpoints.up("md")]: {
        padding: "0 10%",
      },
      [theme.breakpoints.down("md")]: {
        fontSize: "12px",
      },
    },
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

  termFormContainer: {
    gap: "1.5rem",
    [theme.breakpoints.down("sm")]: {
      gap: "1rem",
    },
  },
  termsOfUseLabel: {
    textAlign: "left",
    font: "normal normal bold 24px/29px Cormorant Garamond",
    letterSpacing: "0px",
    color: "#222246",
    opacity: "1",
    // padding: "24px 0",
  },
  termsOfUseList: {
    color: "#3E2F71",
    fontFamily: "Work Sans",
    padding: "20px",
  },
  termOfUseContainer: {
    position: "relative",
    opacity: "1",
    border: "1px solid #B9C6CD",
    maxHeight: "80vh",
    overflow: "auto",
    padding: "2rem",
    [theme.breakpoints.down("sm")]: {
      padding: "2rem 1rem",
      textAlign: "justify",
    },
    "&::-webkit-scrollbar": {
      width: "9px",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.0)",
      backgroundColor: "rgba(0,0,0, .04)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.0)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.15)",
      // outline: "1px solid slategrey",
      borderRadius: "17px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "rgba(62,47,113, .7)",
      // boxShadow: '0 0 45px rgba(0,0,0,.5)',
    },
    // "&::before": {
    //   position: "absolute",
    //   content: "''",
    //   top: "0",
    //   left: "0",                                                                       white fade for the terms of use container
    //   width: "100%",
    //   height: "3rem",
    //   backgroundImage: "linear-gradient(to bottom, white, transparent)",
    // },
  },
  termsOfUseSectionTitle: {
    color: "#3E2F71",
    fontWeight: "700",
  },
  termsOfUseSection: {
    padding: "0 1.5rem",
    [theme.breakpoints.down("sm")]: {
      padding: "0 .7rem",
    },
  },
  termsOfUseSectionNum: {
    color: "#8A8A8A",
    fontWeight: "600",
  },
  termsOfUseIndentedSection: { marginLeft: "5px" },
  agreeToServiceBox: {
    padding: "2rem 1rem",
    border: "1px solid #B9C6CD ",
    alignItems: "center",
    rowGap: "1.5rem",
    [theme.breakpoints.down("md")]: {
      padding: "2rem 1rem",
    },
  },
  yesNoContainer: {
    gap: "2rem",
    [theme.breakpoints.down("md")]: {
      gap: "4rem",
    },
  },
  frozenYesNoButton: {
    "& .MuiButtonBase-root": {
      backgroundPosition: "center 0",
    },
  },
  formLabelTermOfUse: {
    "& .MuiCheckbox-colorSecondary.Mui-checked": {
      color: "#3E2F71",
    },
    "& .MuiIconButton-colorSecondary": {
      color: "#3E2F71",
    },
  },
  contactDialCode: {
    "& .MuiInput-root": {
      padding: "8.5px 14px",
    },
  },
  dynamicUploaderContainer: {
    // gap:
  },
  dynamicFieldProofContainer: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexBasis: "100%",
      "&:nth-child(2)": {
        marginBottom: "6px",
      },
    },

    "& .MuiGrid-item:last-child": {
      [theme.breakpoints.down("sm")]: {
        flex: 1,
        textAlign: "right",
      },
    },
    "& .MuiButtonBase-root": {
      [theme.breakpoints.up("sm")]: {
        transform: "translateY(5px)",
      },
    },
  },

  dynamicTrashIcon: {
    flex: 1,
    textAlign: "right",

    [theme.breakpoints.up("md")]: {
      order: 0,
    },
  },
  formControl: {
    "& .MuiFormControl-root": {
      background: "0% 0% no-repeat padding-box",
      border: "none",
      opacity: "1",
    },
  },
  titleText: {
    fontWeight: "bold",
    font: "normal normal bold 24px/29px Cormorant Garamond",
  },
  countryAutoComplete: {
    display: "flex",
    marginTop: "0 !important",
    padding: "1rem 0 0 1rem",

    "& .MuiOutlinedInput-root": {
      padding: "2px",
    },
    "& .MuiAutocomplete-popupIndicator": {
      transform: "translateX(-10px)",
    },
    "& .MuiInputBase-root": {
      marginTop: "0",

      // boxShadow: "inset 0 0 0 1px #B9C6CD",
    },
    "& .MuiInputBase-root::before,& .MuiInputBase-root.Mui-focused::before ": {
      content: "none",
    },
    "& .MuiFormLabel-root": {
      fontSize: "16px",
      paddingLeft: "4px",
    },
    "& .MuiButtonBase-root.MuiIconButton-root.MuiAutocomplete-clearIndicator.MuiAutocomplete-clearIndicatorDirty":
      { display: "none" },
  },
  activitiesRequireBox: {
    padding: "1rem 1rem",
    border: "1px solid #B9C6CD ",
    alignItems: "center",
    rowGap: "1.5rem",
    [theme.breakpoints.down("md")]: {
      padding: "2rem 1rem",
    },
  },
  addButton: {
    [theme.breakpoints.down("sm")]: {
      transform: "translate(10px,0px)",
    },
  },
  addButtonParent: {
    display: "flex",
    alignItems: "center",
    "& .MuiIconButton-root:hover": {
      backgroundColor: "transparent",
    },
  },
  paperMenu: {
    maxHeight: 300,
  },
}));
