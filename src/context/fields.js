import { createContext } from "react";

export default createContext();
export const initialState = {
  country: "",
  use_electronic_trading_platform: "",
  website: "",
  registration_number: "",
  description_of_activity: "",
  agreed_ip: "",
  registered_office_address_gapi: "",
  shareholder_names: "",
  principal_business_address_gapi: "",
  directors_names: "",
  company_assets: "",
  company: "",
  client_company_legal_name: "",
  contacts: [{ contact_name: "", dial_code: "", number: "", email: "" }],
  assets: {},
};
