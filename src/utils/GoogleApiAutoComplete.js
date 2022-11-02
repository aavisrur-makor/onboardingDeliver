import { Box, Paper, TextField, Typography } from '@material-ui/core'
import { useState } from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentOnboardingFields, setOnboardingContactField, updateFieldOnboarding, updateSection3Contact } from '../redux/slices/singleOnboardingSlice'
import { setValidation, setOnboardingContactValidationField } from '../redux/slices/validationSlice'

const GoogleApiAutoComplete = (props) => {
  const dispatch = useDispatch()
  const [isChanged, setIsChanged] = useState(null)
  const [isBlur, setIsBlur] = useState(null)
  const requiredField = useSelector((state) => state.validation.validationState[props.id])
  const isFormSubmitted = useSelector((state) => state.validation.isFormSubmitted)
  const value = useSelector((state) => (props.id === 'address' ? state.onboarding.current.contacts[props.index][props.id] : state.onboarding.current[props.id]))

  const handleChange = (e) => {
    if (props.id === 'address') {
      dispatch(
        setOnboardingContactField({
          id: props.id,
          value: e,
          contactIndex: props.index,
        })
      )

      if (!e)
        dispatch(
          setOnboardingContactValidationField({
            contactIndex: props.index,
            field: props.id,
            value: false,
          })
        )
    } else {
      dispatch(setCurrentOnboardingFields({ id: props.id, value: e }))
      if (!e) dispatch(setValidation({ field: props.id, value: false }))
    }
  }

  const handleSelect = async (value) => {
    let fieldToUpdate = { [props.id]: value }
    if (props.id === 'address') {
      props.handleSelect(props.index)
    } else {
      dispatch(setCurrentOnboardingFields({ id: props.id, value }))
      dispatch(updateFieldOnboarding(fieldToUpdate))
      dispatch(setValidation({ field: props.id, value: true }))
    }
  }

  const handleSection3Select = async (value) => {
    dispatch(
      setOnboardingContactField({
        id: props.id,
        value,
        contactIndex: props.index,
      })
    )
    dispatch(updateSection3Contact(props.index))
    dispatch(
      setOnboardingContactValidationField({
        contactIndex: props.index,
        field: props.id,
        value: true,
      })
    )
  }
  return (
    <div>
      <PlacesAutocomplete style={{ zIndex: 10000 }} value={value ? value : ''} onChange={handleChange} onSelect={props.id === 'address' ? handleSection3Select : handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
          return (
            <Box style={{ position: 'relative' }}>
              <TextField
                error={!requiredField && isFormSubmitted && props.required}
                helperText={!requiredField && isFormSubmitted && props.required && 'This field is required!'}
                required={props.required}
                fullWidth
                label={props.label}
                variant='outlined'
                {...getInputProps()}
              />
              <Paper style={{ position: 'absolute', zIndex: 300 }}>
                {loading ? <Box>Loading...</Box> : null}
                {suggestions.map((suggestion) => {
                  const style = {
                    backgroundColor: suggestion.active ? '#F7F7F7' : '#ffffff',
                    padding: '10px',
                  }
                  return (
                    <Typography style={{ marginRight: '10px' }} {...getSuggestionItemProps(suggestion, { style })} key={props.id}>
                      {suggestion.description}
                    </Typography>
                  )
                })}
              </Paper>
            </Box>
          )
        }}
      </PlacesAutocomplete>
    </div>
  )
}
export default GoogleApiAutoComplete
