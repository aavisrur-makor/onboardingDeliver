import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOnboardingContactField } from '../../redux/slices/singleOnboardingSlice'
import { setOnboardingContactValidationField } from '../../redux/slices/validationSlice'

const RoleSelectBox = (props) => {
  const dataList = useSelector((state) => (props.data ? state.meta[props.data] : state.meta.positions))
  const value = useSelector((state) => state.onboarding.current.contacts[props.index][props.id])
  const positionMap = useSelector((state) => state.meta.positionsMap)
  const contactFieldValidation = useSelector((state) => state.validation.validationState.contacts[props.index][props.id])
  const isFormSubmitted = useSelector((state) => state.validation.isFormSubmitted)
  const dispatch = useDispatch()

  const handleChangeRole = (e, child) => {
    dispatch(
      setOnboardingContactField({
        id: props.id,
        value: child.props.id,
        contactIndex: props.index,
      })
    )
    dispatch(
      setOnboardingContactValidationField({
        contactIndex: props.index,
        field: props.id,
        value: true,
      })
    )
    props.handleSelect(props.index)
  }
  return (
    <FormControl error={!contactFieldValidation && isFormSubmitted && props.required} variant='outlined' fullWidth>
      <InputLabel required={props.required}>Roles</InputLabel>
      <Select
        label='Roles'
        onChange={(e, child) => {
          handleChangeRole(e, child)
        }}
        style={{ textTransform: 'capitalize' }}
        value={value ? positionMap[value] : ''}
      >
        {dataList.map((data) => {
          return (
            <MenuItem id={data.uuid} value={data.name}>
              {data.name}
            </MenuItem>
          )
        })}
      </Select>
      {!contactFieldValidation && isFormSubmitted && props.required && <FormHelperText>This field is required</FormHelperText>}
    </FormControl>
  )
}

export default RoleSelectBox
