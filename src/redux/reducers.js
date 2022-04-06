import { combineReducers } from "@reduxjs/toolkit";
import onboardingReducer from "./slices/singleOnboardingSlice";
import authReducer from "./slices/authSlice";
import formReducer from "./slices/smallFormSlice";
import metaDataReducer from "./slices/metaDataSlice";
const createRootReducer = () =>
  combineReducers({
    onboarding: onboardingReducer,
    auth: authReducer,
    form: formReducer,
    meta: metaDataReducer,
  });

export default createRootReducer;
