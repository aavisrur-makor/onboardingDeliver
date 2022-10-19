import { Grid, TextField, Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDebouncedCallback } from 'use-debounce/lib'
import { setCurrentOnboardingFields, updateFieldOnboarding } from '../../redux/slices/singleOnboardingSlice'
import { useStyles } from '../../styles/TradingInfoStyle'
function WalletList() {
  const currency_wallet = useSelector((state) => state.onboarding.current.currency_wallet)
  const classes = useStyles()
  const dispatch = useDispatch()
  const handleWallet = (e, index, asset) => {
    dispatch(updateFieldOnboarding({ [e.target.id]: { [asset]: e.target.value } }))
  }

  const debounced = useDebouncedCallback(handleWallet, 400)

  return (
    <Grid container direction='column' spacing={2}>
      <Grid item container xs={12}>
        <Grid item>
          <Typography className={classes.titleText}>Wallets</Typography>
        </Grid>
        {Object.entries(currency_wallet)?.length >= 1 && (
          <Grid item xs={12}>
            <Typography>Please provide wallet addresses per asset. Separate multiple wallets with a comma or type TBD if wallets not yet available.</Typography>
          </Grid>
        )}
      </Grid>
      {Object.entries(currency_wallet)?.map(([key, value], index) => {
        return (
          <Grid item md={12} xs={12}>
            <TextField
              required
              variant='outlined'
              id={'currency_wallet'}
              value={value || ''}
              fullWidth
              onChange={(e) => {
                dispatch(
                  setCurrentOnboardingFields({
                    id: e.target.id,
                    value: e.target.value,
                    index: index,
                    asset: key,
                  })
                )
                debounced(e, index, key)
              }}
              type='Text'
              label={`${key} Wallet`}
            />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default WalletList
