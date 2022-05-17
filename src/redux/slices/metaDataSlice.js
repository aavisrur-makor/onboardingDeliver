import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, END_POINT } from "../../constants";

const initialState = {
  metaDataloader: false,
  countries: [],
  countriesMap: {},
  company_types: [],
  company_typesMap: {},
  companyMinIndividual: {},
  currencies: [],
  currenciesMap: {},
  dialCodes: [],
  dialCodesMap: {},
  positions: [],
  positionsMap: {},
  regulators: [],
  regulatorsMap: {},
  trading_count_frequency: [],
  trading_volume: [],
  type_of_business: [],
  TypeOfBusinessMap: {},
  trading_volume_frequency: [],
  roles: [],
};

export const metaDataSlice = createSlice({
  name: "meta",
  initialState,
  reducers: {
    setMetaData: (state, action) => {
      const {
        company_types,
        countries,
        currencies,
        positions,
        regulators,
        trading_count_frequency,
        trading_volume,
        type_of_business,
        trading_volume_frequency,
      } = action.payload;

      state.countries = countries;
      state.company_types = company_types;
      state.currencies = currencies;
      state.positions = positions;
      state.trading_count_frequency = trading_count_frequency;
      state.trading_volume = trading_volume;
      state.type_of_business = type_of_business;
      state.trading_volume_frequency = trading_volume_frequency;
      state.regulators = regulators;
      state.dialCodes = countries.map((country) => country.dialing_code);

      for (const country of countries) {
        state.countriesMap[country.iso_code_2] = country;
        state.dialCodesMap[country.dialing_code] = country;
      }
      for (const companyType of company_types) {
        state.company_typesMap[companyType.uuid] = companyType.name;
        state.companyMinIndividual[companyType.uuid] =
          companyType.individual_min_count;
      }
      for (const position of positions) {
        state.positionsMap[position.uuid] = position.name;
      }
      for (const regulator of regulators) {
        state.regulatorsMap[regulator.uuid] = regulator.name;
      }
      for (const tob of type_of_business) {
        state.TypeOfBusinessMap[tob.uuid] = tob.name;
      }
    },
    setMetaDataLoader: (state, action) => {
      state.metaDataloader = action.payload;
    },
    setRolesData: (state, action) => {
      state.roles = action.payload;
    },
  },
});

export const getMetaDataAsync = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(
      `${BASE_URL}${END_POINT.UTILS}${END_POINT.EXTERNAL_META_DATA}`
    );

    dispatch(setMetaData(response.data));
    dispatch(setMetaDataLoader(true));
  } catch (err) {
    console.log(err);
    dispatch(setMetaDataLoader(false));
  }
};

export const { setMetaData, setRolesData, setMetaDataLoader } =
  metaDataSlice.actions;
export default metaDataSlice.reducer;
