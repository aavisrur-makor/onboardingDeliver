import { FormControlLabel, makeStyles, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Box, Input, Typography, Grid } from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { useContext } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import FileContext from '../context/files';
import AuthContext from '../context/auth';
import InfoPopoverButton from './InfoPopoverButton';
import InfoModal from './InfoModal';
import { END_POINT, BASE_URL } from '../constants';

const useStyles = makeStyles((theme) => ({
  proofLabel: {
    color: '#8A8A8A',
    display: 'flex',
    alignItems: 'center',

    [theme.breakpoints.down('sm')]: {
      fontSize: '13px',
      flex: '2 0 0',
    },
  },
  uploaderAttach: {
    [theme.breakpoints.down('sm')]: { transform: 'translateX(-5px) ' },

    // borderTop: '1px solid #D6DFE4',
    // borderBottom: '1px solid #D6DFE4',
    // [theme.breakpoints.down('sm')]: { flex: '1 0 0' },
  },
  uploader: {
    [theme.breakpoints.down('sm')]: { rowGap: '.5rem', alignItems: 'start' },
    borderTop: '1px solid #D6DFE4',
    '&.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12:last-of-type': {
      borderBottom: '1px solid #D6DFE4',
    },
    '& .MuiFormControlLabel-root': {
      marginLeft: 'auto',
    },
    '& .MuiGrid-root.MuiGrid-item:last-child': {
      [theme.breakpoints.down('sm')]: { flexBasis: '100%' },
    },
    '& .MuiGrid-root.MuiGrid-item:first-child': {
      [theme.breakpoints.down('sm')]: { flexBasis: '90%' },
    },
  },
  attachFileIcon: {
    [theme.breakpoints.down('sm')]: { transform: 'scale(.9)' },
  },
}));

const UploaderField = (props) => {
  const classes = useStyles();

  const { fileState, setFileState } = useContext(FileContext);
  const { authState, setAuthState } = useContext(AuthContext);
  const theme = useTheme();
  const queryMatch = useMediaQuery(theme.breakpoints.up('md'));

  const handleChange = async ({ target }) => {
    if (target.files[0]) {
      const formData = new FormData();
      const fileType = target.files[0].type;
      formData.append('field', target.id);
      formData.append('file', target.files[0]);

      if (fileType.includes('image') || fileType.includes('pdf')) {
        await axios
          .post(`${BASE_URL}${END_POINT.DOCUMENT}${authState.uuid}`, formData)
          .then((res) => {
            if (res.status === 200) {
              console.log(
                '🚀 ~ file: UploaderField.js ~ line 78 ~ .then ~ res',
                res
              );
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

  return (
    <Grid
      container
      justifyContent='space-between'
      className={classes.uploader}
      style={{ ...props.style }}
      key={props.id}
    >
      <Grid item>
        <Typography className={classes.proofLabel}>
          {queryMatch && fileState[props.id] && (
            <CheckIcon style={{ color: '#3E2F71' }} />
          )}
          {props.label}
        </Typography>
      </Grid>

      <Grid
        style={{
          marginRight: 'auto',
        }}
        item
      >
        {props.info ? (
          queryMatch ? (
            <InfoPopoverButton info={props.labelInfo} />
          ) : (
            <InfoModal info={props.labelInfo} />
          )
        ) : null}
        <Typography>*</Typography>
      </Grid>
      <Grid item md={12} className={classes.uploaderAttach}>
        <FormControlLabel
          sx={{ color: 'white' }}
          label={
            <Box
              sx={{ display: 'flex', flexDirection: 'row', color: '#3E2F71' }}
            >
              <AttachFileIcon className={classes.attachFileIcon} />
              <Typography
                style={{ fontWeight: fileState[props.id] ? 'bold' : '400' }}
              >
                {fileState[props.id] ? fileState[props.id] : 'Attach File'}
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
      </Grid>
    </Grid>
  );
};

export default UploaderField;

export const StyledInput = withStyles((theme) => ({
  root: {
    display: 'none',
  },
}))(Input);
