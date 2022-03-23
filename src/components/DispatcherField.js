import { useState, useContext } from 'react';
import axios from 'axios';
import { makeStyles, TextField } from '@material-ui/core';
import FieldContext from '../context/fields';
import AuthContext from '../context/auth';
import { BASE_URL, END_POINT } from '../constants';
import validate from '../utils/validate';

import { useDebouncedCallback } from 'use-debounce';

const useStyles = makeStyles((theme) => ({
  root: {
    border: '0px',
    '& .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-fullWidth.MuiInputBase-formControl':
      {
        border: '0px',
      },
    '& .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-fullWidth.MuiInputBase-formControl':
      {
        borderRadius: '0',
      },
    '& .MuiInputLabel-outlined': {
      textAlign: 'center',

      letterSpacing: '0px',
      color: '#8A8A8A',
      opacity: '1',
    },
  },
  textField: {
    '& > .MuiInputLabel-root': {
      [theme.breakpoints.down('sm')]: { fontSize: '13px' },
    },
    "& .MuiOutlinedInput-root": {
      padding: "18.5px 14px",
    },
    "& input[type=number]": {
      "-moz-appearance": "textfield",
    },
    "& input[type=number]::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "& input[type=number]::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
  },
}));
// {"name":"11 Derech Menachem Begin","location":{"lat":100.123456,"lon":-90.987654}}

const DispatcherField = (props) => {
  const { fieldState, setFieldState } = useContext(FieldContext);
  const { authState, setAuthState } = useContext(AuthContext);
  const [error, setError] = useState('');
  const classes = useStyles();

  const handleChange = async (e) => {
    console.log(
      '🚀 ~ file: DispatcherField.js ~ line 65 ~ handleChange ~ props.isRequired',
      props.isRequired
    );
    if (props.isRequired) {
      console.log(
        '🚀 ~ file: DispatcherField.js ~ line 65 ~ handleChange ~ props.isRequired',
        props.isRequired
      );

      validate(null, fieldState[e.target.id], setError);
    }

    let fieldToUpdate = {
      [e.target.id]: fieldState[e.target.id],
    };

    if (e.target.id.substr(-4) === 'gapi') {
      fieldToUpdate = {
        [e.target.id]: {
          name: fieldState[e.target.id],
          address: fieldState[e.target.id],
        },
      };
    }
    console.log(
      '🚀 ~ file: DispatcherField.js ~ line 90 ~ handleChange ~ fieldToUpdate',
      fieldToUpdate
    );

    axios
      .put(
        `${BASE_URL}${END_POINT.EXTERNAL}${END_POINT.ONBOARDING}${authState.uuid}`,
        fieldToUpdate
      )
      .then((res) => {
        console.log(
          '🚀 ~ file: DispatcherField.js ~ line 75 ~ .then ~ res',
          res
        );
        if (res.status === 200) {
          setAuthState((prev) => ({
            ...authState,
            progress: res.data.progress,
          }));
        }
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const debounced = useDebouncedCallback(handleChange, 400);

  return (
    <TextField
      className={classes.textField}
      id={props.id}
      size="medium"
      type={props.type}
      fullWidth
      required={props.required}
      onChange={(e) => {
        setFieldState((prev) => {
          console.log(
            '🚀 ~ file: DispatcherField.js ~ line 114 ~ setFieldState ~ props.id',
            props.id,
            fieldState[props.id]
          );

          return {
            ...prev,
            [props.id]: e.target.value,
          };
        });
        debounced(e);
      }}
      inputProps={{ style: { padding: 2 } }}
      label={props.label}
      value={fieldState[props.id]}
      variant="outlined"
      rows={props.rows}
      multiline={props.multiline && props.multiline}
    />
  );
};

export default DispatcherField;
