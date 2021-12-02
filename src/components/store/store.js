import { configureStore, combineReducers, createStore } from "@reduxjs/toolkit";
import fileDataSlice from "./fileDataSlice";
import fieldDataSlice from "./fieldDataSlice";
import authDataSlice from "./authDataSlice";

const rootReducer = combineReducers({
  fileReducer: fileDataSlice.reducer,
  fieldReducer: fieldDataSlice.reducer,
  authReducer: authDataSlice.reducer,
});
const store = configureStore({ reducer: rootReducer });

export default store;
