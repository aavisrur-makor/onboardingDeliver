import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uuid: "",
  progress: 0,
  isAgreeElectronic: false,
  AcceptAndSendAgree: false,
  AcceptAndSendFinish: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthField: (state, action) => {
      const { id, value } = action.payload;
      state[id] = value;
    },
    setCurrentAuth: (state, action) => {
      const {
        progress,
        isAgreeElectronic,
        AcceptAndSendAgree,
        AcceptAndSendFinish,
      } = action.payload;

      state.progress = progress;
      state.isAgreeElectronic = isAgreeElectronic;
      state.AcceptAndSendAgree = AcceptAndSendAgree;
      state.AcceptAndSendFinish = AcceptAndSendFinish;
    },
  },
});
export const { setAuthField, setCurrentAuth } = authSlice.actions;
export default authSlice.reducer;
