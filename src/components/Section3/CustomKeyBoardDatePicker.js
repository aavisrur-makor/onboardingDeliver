import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOnboardingContactField } from '../../redux/slices/singleOnboardingSlice'
import moment from 'moment'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { ReactComponent as CalenderIcon } from '../../assets/icons/calender.svg'

import { TextField } from '@material-ui/core'
import { SvgIcon } from '@mui/material'
import { useStyles } from '../../styles/UiForm'
import { setOnboardingContactValidationField } from '../../redux/slices/validationSlice'

const CustomKeyBoardDatePicker = (props) => {
  const classes = useStyles()
  const contactFieldValidation = useSelector((state) => state.validation.validationState.contacts[props.index][props.id])
  const isFormSubmitted = useSelector((state) => state.validation.isFormSubmitted)
  const dispatch = useDispatch()
  const value = useSelector((state) => state.onboarding.current.contacts[props.index][props.id])

  const handleChangeDate = (date) => {
    dispatch(
      setOnboardingContactField({
        id: 'birthday_at',
        value: moment(date).isValid() ? moment(date) : '',
        contactIndex: props.index,
      })
    )
    dispatch(
      setOnboardingContactValidationField({
        contactIndex: props.index,
        field: 'birthday_at',
        value: true,
      })
    )
    props.handleDynamicListChange(props.index)
  }
  function DateIcon(props) {
    return (
      <SvgIcon {...props}>
        <CalenderIcon />
      </SvgIcon>
    )
  }

  return (
    <DatePicker
      id={props.id}
      disableFuture
      onAccept={handleChangeDate}
      openTo='year'
      label={!value ? 'Date of Birth' : ''}
      views={['year', 'month', 'day']}
      inputVariant='outlined'
      inputFormat='dd MMMM yyyy'
      value={value ? value : null}
      components={{ OpenPickerIcon: DateIcon }}
      onChange={(date, value) => {}}
      renderInput={(params) => (
        <TextField
          required={props.required}
          className={classes.calenderIcon}
          variant='outlined'
          fullWidth
          {...params}
          error={!contactFieldValidation && isFormSubmitted && props.required}
          helperText={!contactFieldValidation && isFormSubmitted && props.required && 'This field is required'}
        />
      )}
    />
  )
}

export default CustomKeyBoardDatePicker
