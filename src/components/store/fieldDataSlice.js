import { createSlice } from "@reduxjs/toolkit";

// const fieldIDs = [
//   "uuid",
//   "cname",
//   "oaddress",
//   "paddress",
//   "url",
//   "description",
//   "directors",
//   "regNumber",
//   "country",
//   "holders",
// ];

export const fieldDataSlice = createSlice({
  name: "fieldData",
  initialState: {
    cname: "",
    oaddress: "",
    paddress: "",
    url: "",
    description: "",
    directors: "",
    regNumber: "",
    country: "",
    holders: "",
  },
  reducers: {
    // updateState: (state, action) => {
    //   state[action.payload.id] = action.payload.value;
    // },
    putField(state, action) {
      console.log("in put field action");
      state[action.payload.id] = action.payload.value;
    },
    getFields(state, action) {
      state = action.payload;
    },
  },
});

export default fieldDataSlice;
