import axios from "axios";
export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const END_POINT = {
  ONBOARDING: "/onboarding/",
  ONBOARDINGSIMPLEFORM: "/onboarding",
  EXTERNAL: "/external",
  DOCUMENT: "/document/",
  COUNTRY: "/countries",
  UTILS: "/utils",
  USER: "/user",
  COMPANY_TYPE: "/company_types",
  EXTERNAL_META_DATA: "/external_meta_data",
  GEO_LOCATION: "geo_location",
  API_KEY: "AIzaSyCIUAWPh7gQNZwSg6FnzmyobRzEZyRbLoA",
};

export function setAuthToken(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

export const storageKeys = {
  userToken: "token",
  userContent: "content",
};
