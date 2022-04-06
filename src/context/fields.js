import { createContext } from "react";

export default createContext();
export const initialState = {
  country: "",
  use_electronic_trading_platform: "",
  website: "",
  registration_number: "",
  description_of_activity: "",
  agreed_ip: "",
  source_of_funds: "",
  registered_office_address_gapi: "",
  shareholder_names: "",
  principal_business_address_gapi: "",
  directors_names: "",
  company_assets: "",
  company: "",
  client_company_legal_name: "",
  trading_name: "",
  company_type: "",
  type_of_activity: "",
  contacts: [
    {
      contact_name: "",
      dialing_code: "",
      number: "",
      email: "",
    },
  ],
  assets: {},
  has_regulation_require: false,
  regulation_require: "",
  trading_frequency_from: 0,
  trading_frequency_to: 0,
  trade_per: "",
  trading_volume_up_to: "",
  wallets: [],
  name_of_regulator: "",
};
