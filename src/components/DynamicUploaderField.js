import {
  Grid,
  Typography,
  FormControlLabel,
  Box,
  Input,
  useMediaQuery,
} from '@material-ui/core';
import { useEffect, useState, memo } from 'react';
import { useStyles } from '../styles/UiForm';
import UploaderField from './UploaderField';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import axios from 'axios';
import { useContext } from 'react';
import FileContext from '../context/files';
import AuthContext from '../context/auth';
import { IconButton } from '@material-ui/core';
import { ReactComponent as TrashIcon } from './../assets/icons/trashIcon.svg';
import { withStyles } from '@material-ui/styles';
const DynamicUploaderField = memo((props) => {
  const classes = useStyles();
  const { fileState, setFileState } = useContext(FileContext);
  const { authState, setAuthState } = useContext(AuthContext);
  const query = useMediaQuery('(max-width:600px)');

  const { f_proofs, extraProofs } = fileState;

  const handleChange = async ({ target }) => {
    if (target.files[0]) {
      const formData = new FormData().append('file', target.files[0]);
      const fileType = target.files[0].type;

      if (
        fileType.includes('image') ||
        fileType.includes('text') ||
        fileType.includes('pdf')
      ) {
        console.log(target.id);
        await axios
          .post(
            `${process.env.REACT_APP_BASE_URL}file/${authState.uuid}/${target.id}`,
            formData
          )
          .then((res) => {
            if (res.status === 200) {
              setAuthState((prev) => ({
                ...authState,
                progress: res.data.progress,
              }));

              setFileState({
                ...fileState,
                [target.id]: target.files[0].name,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  const handleDelete = (id) => {
    console.log('f_proofs', f_proofs);
    if (f_proofs.filter((proof) => proof === id).length !== 0) {
      axios
        .delete('url', {
          fileId: id,
        })
        .then((res) => {
          ////////TAKE CARE OF DELETING LOCALLY
          setFileState((prev) => ({
            ...prev,
            f_proofs: prev.f_proofs.filter((proof) => proof !== id), ///////////////////////   ~~~~~~~this is where the fix comes!!~~~~~
          }));
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setFileState((prev) => ({
        ...prev,
        extraProofs: prev.extraProofs.filter((proof) => proof.id !== id), ///////////////////////   ~~~~~~~this is where the fix comes!!~~~~~
      }));
    }
  };

  return (
    <Grid
      container
      // className={classes.uploader}
      alignItems='center'
    >
      <Grid item>
        <Grid item x>
          <Typography className={classes.proofLabel}>
            Proof of Identity/Address {props.id}
          </Typography>
        </Grid>
      </Grid>

      <Grid item>
        <FormControlLabel
          style={{ color: 'white' }}
          label={
            <Box
              sx={{ display: 'flex', flexDirection: 'row', color: '#3E2F71' }}
            >
              <AttachFileIcon />
              <Typography className={classes.attachFileLabel}>
                Attach File
              </Typography>
            </Box>
          }
          control={
            <StyledInput
              type='file'
              id={props.id}
              inputProps={{
                accept: 'application/pdf, application/doc, application/docx',
              }}
              onChange={handleChange}
            />
          }
        />
        ``
      </Grid>
      <Grid item className={classes.trashIcon} style={{ textAlign: 'right' }}>
        <IconButton>
          <TrashIcon onClick={() => handleDelete(props.id)} />
        </IconButton>
      </Grid>
    </Grid>
  );
});

export default DynamicUploaderField;

export const StyledInput = withStyles((theme) => ({
  root: {
    display: 'none',
  },
}))(Input);
