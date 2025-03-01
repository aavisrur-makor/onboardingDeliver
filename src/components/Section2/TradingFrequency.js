import React from 'react'
import { Typography, Grid, useMediaQuery, useTheme } from '@material-ui/core'
import CustomSelect from '../CustomSelect'
import DispatcherField from '../DispatcherField'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentOnboardingFields, updateFieldOnboarding } from '../../redux/slices/singleOnboardingSlice'
import { setValidation } from '../../redux/slices/validationSlice'
import { isMandatory } from '../../utils/IsMandatory'
function TradingFrequency() {
  const theme = useTheme()
  const querySelector = useMediaQuery(theme.breakpoints.down('md'))

  const dispatch = useDispatch()
  const trades_per = useSelector((state) => state.meta.trading_count_frequency)
  const handleFreqChange = (e, child) => {
    dispatch(updateFieldOnboarding({ [e.target.name]: e.target.value }))
    dispatch(setCurrentOnboardingFields({ id: e.target.name, value: e.target.value }))
    dispatch(setValidation({ field: e.target.name, value: true }))
  }
  return (
    <Grid container spacing={querySelector ? 4 : 2} alignItems='center'>
      <Grid item xs={12} md={3}>
        <Typography>Trading Frequency *</Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <Grid container spacing={2} alignItems='center'>
          <Grid item xs={3} md={3}>
            <Typography style={{ textAlign: querySelector ? 'center' : '' }}>From</Typography>
          </Grid>
          <Grid item xs={3} md={3}>
            <DispatcherField required={isMandatory('trading_count_from')} id='trading_count_from' type='number' />
          </Grid>
          <Grid item xs={3} md={3}>
            <Typography style={{ textAlign: 'center' }}>To</Typography>
          </Grid>
          <Grid item xs={3} md={3}>
            <DispatcherField required={isMandatory('trading_count_to')} id='trading_count_to' type='number' />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={5}>
        <Grid container spacing={2} alignItems='center'>
          <Grid item xs={4} md={4}>
            <Typography style={{ textAlign: querySelector ? 'center' : '' }}>Trades Per</Typography>
          </Grid>
          <Grid item xs={8} md={8}>
            <CustomSelect required selectData={trades_per} label='Select Period' id={'trading_count_frequency'} handleChange={handleFreqChange} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default TradingFrequency
