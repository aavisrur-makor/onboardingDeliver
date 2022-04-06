import { createStore, configureStore, applyMiddleware } from "@reduxjs/toolkit";

import createRootReducer from "./reducers";

const rootReducer = createRootReducer();
const store = configureStore({
  reducer: rootReducer,
});

export default store;
