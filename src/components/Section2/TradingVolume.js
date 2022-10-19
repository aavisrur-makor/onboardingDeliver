import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import CustomSelect from '../CustomSelect'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentOnboardingFields, updateFieldOnboarding } from '../../redux/slices/singleOnboardingSlice'
import { setValidation } from '../../redux/slices/validationSlice'

function TradingVolume() {
  const dispatch = useDispatch()
  const trading_volume = useSelector((state) => state.meta.trading_volume)
  const trading_volume_frequency = useSelector((state) => state.meta.trading_volume_frequency)
  const handleFreqChange = (e, child) => {
    dispatch(setCurrentOnboardingFields({ id: e.target.name, value: e.target.value }))
    dispatch(updateFieldOnboarding({ [e.target.name]: e.target.value }))
    dispatch(setValidation({ field: e.target.name, value: true }))
  }
  return (
    <Grid container alignItems='center'>
      <Grid item xs={12} md={3}>
        <Typography>Trading Volume *</Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <Grid container alignItems='center'>
          <Grid item xs={12} md={3}>
            <Typography>Up to</Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <CustomSelect required label='Select Amount' id={'trading_volume'} selectData={trading_volume} handleChange={handleFreqChange} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={5} container alignItems='center'>
        <Grid item md={4} xs={12}>
          <Typography>Per</Typography>
        </Grid>
        <Grid item md={8} xs={12}>
          <CustomSelect required label='Select Period' id={'trading_volume_frequency'} selectData={trading_volume_frequency} handleChange={handleFreqChange} />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default TradingVolume
