import { useEffect, useState, useRef, memo } from "react";
import {
  Typography,
  Box,
  IconButton,
  Popover,
  makeStyles,
} from "@material-ui/core";
import { ReactComponent as InfoSvg } from "../assets/circleoutline.svg";

const useStyles = makeStyles((theme) => ({
  popoverBox: {
    position: "relative",

    // transform: "translateY(-2px)",
    [theme.breakpoints.down("md")]: {
      justifyContent: "end",
    },
  },
  popover: {
    zIndex: 1301,
  },
  popOverContent: {
    width: "60vw",
    willChange: "transform",
    top: "0px",
    left: "0px",
    transform: "translate3d(-20px, 10px, 0px)",
    "& .MuiPopover-paper": {
      top: "00px",
      left: "1000px",
    },
  },
}));

const InfoPopoverButton = (props) => {
  const infoRef = useRef();
  const [anchor, setAnchor] = useState(null);
  const classes = useStyles();

  const handleOpen = (e) => {
    setAnchor(e.currentTarget);
  };

  const handleClick = () => {
    setAnchor((prev) => !prev);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const open = !!anchor;
  const id = open ? "simple-popover" : undefined;

  return (
    <Box className={classes.popoverBox}>
      <IconButton
        style={{ padding: 0, marginLeft: "10px" }}
        onMouseEnter={handleClick}
        // className={anchor ? classes.popover : ""} ///////////////CHECK FURTHER
      >
        <InfoSvg />
      </IconButton>

      <Popover
        id={id}
        className={classes.popOverContent}
        open={open}
        anchorEl={anchor}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography sx={{ p: 2 }}>{props.info}</Typography>
      </Popover>
    </Box>
  );
};

export default InfoPopoverButton;
