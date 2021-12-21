import React, { useEffect } from 'react';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import { IconButton } from '@material-ui/core';

import { ReactComponent as InfoSvg } from '../assets/circleoutline.svg';

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.1);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: '60%',
  height: '13vh',
  bgcolor: 'rgba(255,255,255,1)',
  boxShadow: '0 4px 15px rgba(0,0,0,.1)',
  border: '2px solid rgba(0,0,0,.1)',
  overflow: 'scroll',
  fontFamily: 'Work Sans',
  fontSize: '14px',
  color: 'rgba(0,0,0,.8)',
  p: 2,
  px: 4,
  pb: 3,
};

const InfoModal = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    console.log('🚀 ~ file: InfoModal.js ~ line 51 ~ useEffect ~ effect');
  }, []);

  return (
    <div>
      <IconButton
        style={{ padding: 0, marginLeft: '10px' }}
        // onMouseEnter={queryMatch ? null : handleClick}
        // onMouseLeave={queryMatch ? null : handleClose}
        onClick={handleOpen}
        // className={anchor ? classes.popover : ""} ///////////////CHECK FURTHER
      >
        <InfoSvg />
      </IconButton>
      <StyledModal
        aria-labelledby='unstyled-modal-title'
        aria-describedby='unstyled-modal-description'
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>{props.info}</Box>
      </StyledModal>
    </div>
  );
};

export default InfoModal;
