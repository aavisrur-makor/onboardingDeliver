import { createSlice } from "@reduxjs/toolkit";

const fieldIDs = [
  "uuid",
  "cname",
  "oaddress",
  "paddress",
  "url",
  "description",
  "directors",
  "regNumber",
  "country",
  "holders",
];

export const authDataSlice = createSlice({
  name: "authData",
  initialState: {
    uuid: "",
  },
  reducers: {
    // updateState: (state, action) => {
    //   state[action.payload.id] = action.payload.value;
    // },
    saveUuid(state, action) {
      state.uuid = action.payload;
    },
  },
});

export default authDataSlice;
