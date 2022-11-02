import { Typography, Grid } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useStyles } from '../styles/TradingInfoStyle'
import DispatcherField from './DispatcherField'
import AssetTable from './Section2/AssetTable'
import TradingFrequency from './Section2/TradingFrequency'
import TradingVolume from './Section2/TradingVolume'
import WalletList from './Section2/WalletList'
const TradingInfo = () => {
  const classes = useStyles()
  const isAssetValid = useSelector((state) => state.validation.validationState.currency_wallet)
  const isFormSubmitted = useSelector((state) => state.validation.isFormSubmitted)
  return (
    <Grid container spacing={3} direction='column'>
      <Grid item>
        <Typography variant='body1' className={classes.titleText}>
          Activity Details
        </Typography>
      </Grid>
      <Grid item container>
        <Grid item xs={12}>
          <Typography className={classes.subTitle}>Please detail where funds for trading with Enigma are from, both cryptoasset and fiat</Typography>
        </Grid>
        <Grid item xs={12}>
          <DispatcherField id={'funds_source'} label='Source of Funds' required />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TradingFrequency />
      </Grid>
      <Grid item xs={12}>
        <TradingVolume />
      </Grid>
      <Grid item>
        <Grid container spacing={2}>
          <Grid item container>
            <Grid item>
              <Typography variant='body1' className={classes.titleText}>
                Asset Details *
              </Typography>
              {!isAssetValid && isFormSubmitted && <Typography style={{ color: 'red' }}>Please pick 1 asset and fill the wallet</Typography>}
            </Grid>
            <Grid item xs={12}>
              <Typography>Please indicate the cryptoassets you wish to trade.</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <AssetTable />
          </Grid>
          <Grid item xs={12}>
            <WalletList />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default TradingInfo
