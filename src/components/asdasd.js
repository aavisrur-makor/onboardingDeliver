<StyledAutoComplete
defaultValue={user.phone.dialing_code.inputValue}
id="dialing_code"
options={countries && countries}
autoComplete='off'
value={user.phone.dialing_code.value}
inputValue={user.phone.dialing_code.inputValue}
getOptionLabel={(option) => option.dialing_code ? option.dialing_code : ""}
getOptionSelected={(option, value) =>
  option.dialing_code === value
}
onBlur={(e) => handleBlur(e)}
onChange={(e, newValue) => handleSelect(newValue, 'dialing_code', index)}
onInputChange={(e, newInputValue, reason) => handleSelectInput(e, newInputValue, reason, 'dialing_code', index)}
renderOption={(option, props) => {
  return (
    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
      <img
        loading="eager"
        width="20"
        src={`https://flagcdn.com/w20/${option.country_code.toLowerCase()}.png`}
        srcSet={`https://flagcdn.com/w40/${option.country_code.toLowerCase()}.png 2x`}
        alt=""
      />
      <span style={{ marginLeft: '12px' }}>+{option.dialing_code} {option.country_code}</span>
    </Box>
  )
}}
renderInput={(params) => {
  return (
    <CustomTextField
      placeholder="Code"
      autoComplete='off'
      {...params}
      inputProps={{
        ...params.inputProps,
        autoComplete: 'new-password',
      }}
      fontSize='14px'
    />
  )
}}
/>