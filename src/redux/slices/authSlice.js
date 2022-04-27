import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, END_POINT } from "../../constants";

const initialState = {
  uuid: "",
  progress: 0,
  isAgreeElectronic: false,
  AcceptAndSendAgree: false,
  AcceptAndSendFinish: false,
  uuidIsValid: false,
  loadingErrorMessage: "",
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
export const updateTermsAsync = (id, data) => async (dispatch, getState) => {
  try {
    const response = axios.put(
      `${BASE_URL}${END_POINT.EXTERNAL}${END_POINT.ONBOARDING}${
        getState().auth.uuid
      }`,
      data
    );

    if (response.status === 200) {
      dispatch(setAuthField({ id, value: data.isAgreeElectronic }));
    }
  } catch (err) {
    console.log(err);
  }
};
export const { setAuthField, setCurrentAuth } = authSlice.actions;
export default authSlice.reducer;
