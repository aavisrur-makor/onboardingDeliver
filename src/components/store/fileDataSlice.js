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

export const fileDataSlice = createSlice({
  name: "fileData",
  initialState: {
    f_certificate: "",
    f_articles: "",
    f_proof: "",
    f_directos: "",
    f_shareholders: "",
    f_source: "",
    f_ownership: "",
    f_compliance: "",
    f_statment: "",
    f_proof: "",
  },
  reducers: {
    // updateState: (state, action) => {
    //   state[action.payload.id] = action.payload.value;
    // },
    putFile(state, action) {
      state[action.payload.id] = action.payload.value;
    },
    getFiles(state, action) {
      state = action.payload;
    },
  },
});

export default fileDataSlice;
