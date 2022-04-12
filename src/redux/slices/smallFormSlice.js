import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, END_POINT } from "../../constants";

const initialState = {
  client_company_legal_name: "",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  dialing_code: "",
};

export const smallFormSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormFields: (state, action) => {
      const { id, value } = action.payload;
      state[id] = value;
    },
  },
});
export const sendContactAsync = () => (dispatch, getState) => {
  const data = {
    contact: {
      first_name: getState().form.first_name,
      last_name: getState().form.last_name,
      email: [getState().form.email],
      phone: [
        {
          dialing_code: getState().form.dialing_code,
          number: getState().form.phone,
        },
      ],
    },
    client_company_legal_name: getState().form.client_company_legal_name,
  };
  axios.post(
    `${BASE_URL}${END_POINT.EXTERNAL}${END_POINT.ONBOARDINGSIMPLEFORM}`,
    data
  );
};
export const { setFormFields } = smallFormSlice.actions;
export default smallFormSlice.reducer;
