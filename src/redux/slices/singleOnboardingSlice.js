import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { object } from "yup";
import { BASE_URL, END_POINT } from "../../constants";
import { setAuthField, setCurrentAuth } from "./authSlice";

const initialState = {
  current: {
    country: "",
    use_electronic_trading_platform: "",
    website: "",
    registration_number: "",
    description_of_activity: "",
    agreed_ip: "",
    source_of_funds: "",
    registered_office_address_gapi: "",
    shareholder_names: "",
    principal_business_address_gapi: "",
    directors_names: "",
    currency_wallet: [],
    company_uuid: "",
    client_company_legal_name: "",
    trading_name: "",
    company_type_uuid: "",
    type_of_business_uuid: "",
    contacts: [
      {
        contact_name: "",
        contact_phone: [{ number: "", dialing_code: "" }],
        contact_email: [""],
        contact_position_uuid: "",
        contact_uuid: "",
      },
    ],
    source_of_funds: "",
    has_regulation_required: false,
    regulator_uuid: "",
    trading_frequency_from: 0,
    trading_frequency_to: 0,
    trades_per: "",
    trading_volume_up_to: "",
  },
  files: {
    certificate_of_incorporation: "",
    articles_of_association: "",
    proof_of_business_address: "",
    directors_list: "",
    shareholders_list: "",
    source_of_funds: "",
    chart_of_organisation: "",
    aml_policy: "",
    financial_statement: "",
    proof_of_identity_or_address: [],
  },
};

export const singleOnboardingSlice = createSlice({
  name: "onboarding",
  initialState: initialState,
  reducers: {
    setCurrentOnboardingFields: (state, action) => {
      const { id, value } = action.payload;
      if (id === "currency_wallet") {
        const { index, asset } = action.payload;
        state.current.currency_wallet[asset] = value;
      } else {
        state.current[id] = value;
      }
    },
    setCurrentOnboarding: (state, action) => {
      console.log("action", action.payload);
      state.current = action.payload;
    },
    setCurrentOnboardingFiles: (state, action) => {
      state.files = action.payload;
    },
    addOnboardingContact: (state, action) => {
      state.current.contacts.push({
        contact_position_uuid: "",
        contact_name: "",
        contact_email: [""],
        contact_phone: [{ number: "", dialing_code: "" }],
        contact_uuid: "",
      });
    },
    removeOnboardingContact: (state, action) => {
      const contactIndex = action.payload;
      state.current.contacts = state.current.contacts.filter(
        (contact, index) => index !== contactIndex
      );
    },
    setOnboardingContactField: (state, action) => {
      const { id, value, contactIndex, objectField } = action.payload;
      console.log("FYI", action.payload);
      if (id === "contact_phone") {
        if (objectField) {
          state.current.contacts[contactIndex][id][0][objectField] = value;
        }
      } else if (id === "contact_email") {
        console.log("inside the contact email if");
        state.current.contacts[contactIndex][id][0] = value;
      } else {
        state.current.contacts[contactIndex][id] = value;
      }
    },
    setOnboardingAssets: (state, action) => {
      const { id, value, checkStatus } = action.payload;
      if (checkStatus) {
        state.current.currency_wallet = {
          ...state.current.currency_wallet,
          [value]: null,
        };
      } else {
        delete state.current.currency_wallet[value];
      }
    },
  },
});
//Thunk

export const updateFieldOnboarding =
  (data, uuid) => async (dispatch, getState) => {
    try {
      const response = await axios.put(
        `${BASE_URL}${END_POINT.EXTERNAL}${END_POINT.ONBOARDING}${
          getState().auth.uuid
        }`,
        data
      );

      if (response.status === 200) {
        dispatch(
          setAuthField({ id: "progress", value: response.data.progress })
        );
      }

      //     if (res.status === 200) {
      //       setAuthState((prev) => ({
      //         ...authState,
      //         progress: res.data.progress,
      //       }));
      //     }
      //   })
    } catch (err) {
      console.log(err);
    }
  };
export const updateContactFieldOnboarding =
  (contactIndex) => async (dispatch, getState) => {
    console.log(
      "blbablabla",
      getState().onboarding.current.contacts[contactIndex]
    );
    if (
      getState().onboarding.current.contacts[contactIndex].contact_name ||
      getState().onboarding.current.contacts[contactIndex].contact_email[0] ||
      (getState().onboarding.current.contacts[contactIndex].contact_phone[0]
        .number &&
        getState().onboarding.current.contacts[contactIndex].contact_phone[0]
          .dialing_code) ||
      getState().onboarding.current.contacts[contactIndex].contact_uuid
    ) {
      try {
        const response = await axios.put(
          `${BASE_URL}${END_POINT.EXTERNAL}${END_POINT.ONBOARDING}${
            getState().auth.uuid
          }`,
          getState().onboarding.current.contacts[contactIndex]
        );

        if (response.status === 200) {
          dispatch(
            setAuthField({ id: "progress", value: response.data.progress })
          );
          if (response.data.contact_uuid) {
            dispatch(
              setOnboardingContactField({
                id: "contact_uuid",
                value: response.data.contact_uuid,
                contactIndex,
              })
            );
          }
        }

        //     if (res.status === 200) {
        //       setAuthState((prev) => ({
        //         ...authState,
        //         progress: res.data.progress,
        //       }));
        //     }
        //   })
      } catch (err) {
        console.log(err);
      }
    }
  };
export const getOnboardingData = () => async (dispatch, getState) => {
  const fieldCall = axios.get(
      `${BASE_URL}${END_POINT.EXTERNAL}${END_POINT.ONBOARDING}${
        getState().auth.uuid
      }`
    ),
    fileCall = axios.get(
      `${BASE_URL}${END_POINT.EXTERNAL}${END_POINT.DOCUMENT}${
        getState().auth.uuid
      }`
    );

  axios.all([fieldCall, fileCall]).then(
    axios.spread((res1, res2) => {
      const textFields = res1.data;
      let fileFields = { proof_of_identity_or_address: [] };

      console.log("FILES ON STEPPER", res2.data);

      res2.data.forEach((file) => {
        console.log("FILE FIELDS", file);

        if (file.field === "proof_of_identity_or_address") {
          fileFields.proof_of_identity_or_address.push({
            fileName: `${file.name}.${file.extension}`,
            document_uuid: file.uuid,
            state: "occupied",
          });
        } else {
          fileFields[file.field] = `${file.name}.${file.extension}`;
        }
      });
      dispatch(setCurrentOnboarding(textFields));
      dispatch(
        setCurrentAuth({
          progress: res1.data.progress,
          isAgreeElectronic: res1.data.use_electronic_trading_platform,
          AcceptAndSendAgree: res1.data.accept_and_send,
        })
      );
      dispatch(setCurrentOnboardingFiles(fileFields));
    })
  );
};

export const {
  setCurrentOnboardingFields,
  setCurrentOnboarding,
  setCurrentOnboardingFiles,
  addOnboardingContact,
  removeOnboardingContact,
  setOnboardingContactField,
  setOnboardingAssets,
} = singleOnboardingSlice.actions;
export default singleOnboardingSlice.reducer;
