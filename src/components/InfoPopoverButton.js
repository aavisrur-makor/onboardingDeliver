import { useEffect, useState, useRef, memo } from "react";
import {
  Typography,
  Box,
  IconButton,
  Popover,
  makeStyles,
  useTheme,
  useMediaQuery,
  Portal,
} from "@material-ui/core";
import { ReactComponent as InfoSvg } from "../assets/circleoutline.svg";

const useStyles = makeStyles((theme) => ({
  popoverBox: {
    [theme.breakpoints.up("sm")]: {
      position: "relative",
    },

    [theme.breakpoints.down("md")]: {
      justifyContent: "end",
    },

    "& > p": {
      position: "absolute",
      top: "0",
      right: "0",
      transition: "opacity .2s, transform .6s ease-out",
      opacity: "0",
      visibility: "hidden",
      pointerEvents: "none",
      fontWeight: "400",
      transform: "translate(100%, -98%) rotateZ(.19deg)",
      backgroundColor: "white",
      padding: ".65rem .75rem",
      boxShadow: "0 5px 23px rgba(0,0,0,.1)",
      borderRadius: "3px",
      fontSize: "15px",
      width: "20rem",
    },
    "&:hover > p": {
      opacity: "1",
      visibility: "visible",
      transform: "translate(100%, -100%)  rotateZ(.19deg)",
      [theme.breakpoints.down("sm")]: {
        position: "relative",
        transform: "translate(10px, -10px)  rotateZ(.19deg)",
      },
    },
  },
  mobilePopover: {
    opacity: "1",
    visibility: "visible",
   
  },
  popover: {
    position: "absolute",
    top: "0",
    right: "0",
    transition: "opacity .2s, transform .6s ease-out",
    opacity: "0",
    visibility: "hidden",
    pointerEvents: "none",
    width: "20rem",
    color: "rgba(62,47,113, .8)",
    fontWeight: "400",
    transform: "translate(100%, -98%) rotateZ(.19deg)",
    backgroundColor: "white",
    padding: ".65rem .75rem",
    boxShadow: "0 5px 23px rgba(0,0,0,.2)",
    borderRadius: "4px",
    fontSize: "15px",

    [theme.breakpoints.down("sm")]: {
      top: "0",
      left: "0",
      transform: "translate(10px, 10px)",
    },
  },
 
}));

const InfoPopoverButton = (props) => {
  const [anchor, setAnchor] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const queryMatch = useMediaQuery(theme.breakpoints.down("md"));

  const handleOpen = (e) => {
    setAnchor(e.currentTarget);
  };

  const handleClick = () => {
    if (queryMatch) {
      setOpen((prev) => !prev);
    }
  };

  const handleClose = () => {
    setAnchor(null);
  };

 

  return (
    <Box className={classes.popoverBox}>
      <IconButton
        style={{ padding: 0, marginLeft: "10px" }}
     
        onClick={handleClick}
      >
        <InfoSvg />
      </IconButton>
      <Typography className={classes.popover}>{props.info}</Typography>
    </Box>
  );
};

export default InfoPopoverButton;
