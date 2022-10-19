import { TextField } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import { useDebouncedCallback } from 'use-debounce/lib'
import { setOnboardingContactField } from '../../redux/slices/singleOnboardingSlice'
const useStyles = makeStyles((theme) => ({
  root: {},
  textField: {
    '& > .MuiInputLabel-root': {
      [theme.breakpoints.down('sm')]: { fontSize: '13px' },
    },

    '& input[type=number]': {
      '-moz-appearance': 'textfield',
    },
    '& input[type=number]::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '& input[type=number]::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
  },
}))
function DynamicTextField(props) {
  const classes = useStyles()
  const value = useSelector((state) => state.onboarding.current?.contacts[props.index][props.id])
  const dispatch = useDispatch()
  const debounced = useDebouncedCallback(props.onChange, 400)

  return (
    <TextField
      required={props.required}
      className={classes.textField}
      fullWidth
      onChange={(e) => {
        dispatch(
          setOnboardingContactField({
            id: props.id,
            value: e.target.value,
            contactIndex: props.index,
          })
        )
        debounced(e)
      }}
      value={value ? value : ''}
      label={props.label}
      type={props.type}
      id={props.id}
      variant='outlined'
    />
  )
}

export default DynamicTextField
