import { useEffect, useState, useRef, memo } from 'react';
import {
  Typography,
  Box,
  IconButton,
  Popover,
  makeStyles,
} from '@material-ui/core';
import { ReactComponent as InfoSvg } from '../assets/circleoutline.svg';

const useStyles = makeStyles((theme) => ({
  popoverBox: {
    position: 'relative',

    // transform: "translateY(-2px)",
    [theme.breakpoints.down('md')]: {
      justifyContent: 'end',
    },
    '&:hover > p': {
      opacity: '1',
      visibility: 'visible',
      transform: 'translate(100%, -100%)  rotateZ(.19deg)',
    },
  },
  popover: {
    position: 'absolute',
    top: '0',
    right: '0',
    transition: 'opacity .2s, transform .6s ease-out',
    opacity: '0',
    visibility: 'hidden',
    pointerEvents: 'none',
    width: '20rem',
    fontWeight: '400',
    transform: 'translate(100%, -98%) rotateZ(.19deg)',
    backgroundColor: 'white',
    padding: '.75rem',
    boxShadow: '0 5px 23px rgba(0,0,0,.1)',
    borderRadius: '3px',
    // zIndex: 1301,
  },
  popOverContent: {
    width: '30rem',
    // willChange: 'transform',
    // top: '0px',
    // left: '0px',
    transform: 'translate3d(-20px, 10px, 0px)',
    '& .MuiPopover-paper': {
      // top: "00px",
      // left: "1000px",
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
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box className={classes.popoverBox}>
      <IconButton
        style={{ padding: 0, marginLeft: '10px' }}
        onMouseEnter={handleClick}
        onMouseLeave={handleClose}
        // className={anchor ? classes.popover : ""} ///////////////CHECK FURTHER
      >
        <InfoSvg />
      </IconButton>

      <Typography className={classes.popover}>{props.info}</Typography>

      {/* 
      <Popover
        id='mouse-over-popover'
        sx={{
          pointerEvents: 'none',
        }}
        className={classes.popOverContent}
        open={open}
        anchorEl={anchor}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      > 
        <Typography sx={{ pt: 2 }}>{props.info}</Typography>
      </Popover>*/}
    </Box>
  );
};

export default InfoPopoverButton;
