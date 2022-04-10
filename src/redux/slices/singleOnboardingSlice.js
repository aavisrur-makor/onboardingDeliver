import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { object } from "yup";
import { BASE_URL, END_POINT } from "../../constants";
import { setAuthField, setCurrentAuth } from "./authSlice";
import { setRolesData } from "./metaDataSlice";

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
    managment_list: [],
    currency_wallet: [],
    company_uuid: "",
    risk_category: "",
    client_company_legal_name: "",
    trading_name: "",
    company_type_uuid: "",
    type_of_business_uuid: "",
    contacts: [
      {
        first_name: "",
        last_name: "",
        address: "",
        birthday_at: {},
        partner_type: "",
        phone: [{ number: "", dialing_code: "" }],
        email: [""],
        position_uuid: "",
        company_name: "",
        company_number: "",
        contact_type: "contact",
        uuid: "",
        country: "",
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

    shareholders_list: "",
    source_of_funds: "",
    chart_of_organisation: "",
    aml_policy: "",
    financial_statement: "",
    proof_of_identity_or_address: [],
  },
};
const newContact = {
  first_name: "",
  last_name: "",
  address: "",
  birthday_at: "",
  partner_type: "",
  phone: [{ number: "", dialing_code: "" }],
  email: [""],
  position_uuid: "",
  company_name: "",
  company_number: "",
  contact_type: "",
  uuid: "",
  country: "",
};

export const singleOnboardingSlice = createSlice({
  name: "onboarding",
  initialState: initialState,
  reducers: {
    setCurrentOnboardingFields: (state, action) => {
      const { id, value } = action.payload;
      console.log("INSIDE THE REDUX FIELDS", id, value);
      if (id === "currency_wallet") {
        const { index, asset } = action.payload;
        state.current.currency_wallet[asset] = value;
      } else {
        state.current[id] = value;
        //`${road} ${town} ${state} ${country}`;
      }
    },
    setCurrentOnboarding: (state, action) => {
      console.log("action", action.payload);
      state.current = action.payload;
      if (state.current.registered_office_address_gapi === null) {
        state.current.registered_office_address_gapi = {};
      }
    },
    setAutoGapiLocation: (state, action) => {
      state.current.registered_office_address_gapi = action.payload;
      state.current.principal_business_address_gapi = action.payload;
    },
    setCurrentOnboardingFiles: (state, action) => {
      state.files = action.payload;
    },
    addManagmentContant: (state, action) => {
      state.current.managment_list.push({
        first_name: "",
        last_name: "",
        birthday_at: "",
        address: "",
        position_uuid: "",
        company_name: "",
        company_number: "",
        country: "",
      });
    },
    deleteManagmentContact: (state, action) => {
      const managmentIndex = action.payload;
      console.log("MANAGMENT INDEX", managmentIndex);
      if (state.current.managment_list.length > 1) {
        state.current.managment_list = state.current.managment_list.filter(
          (contact, index) => index !== managmentIndex
        );
      }
    },
    setManagmentList: (state, action) => {
      console.log("action.payload", action.payload);
      const { name, minFields } = action.payload;

      let countedArray = [];
      let shareHolderArray = [];
      if (
        name === "Company Limited by Shares" ||
        name === "Partnership" ||
        name === "Limited Liability Partnership"
      ) {
        countedArray = state.current.contacts.filter(
          (contact) => contact.contact_type === "ownership"
        );
        shareHolderArray = state.current.contacts.filter(
          (contact) => contact.contact_type === "shareholder"
        );
        if (countedArray.length < 2) {
          if (
            name === "Partnership" ||
            name === "Limited Liability Partnership"
          ) {
            for (let i = 0; i < minFields - countedArray.length; i++) {
              let partnerContact = { ...newContact };
              partnerContact.partner_type = "individual";
              state.current.contacts.push(partnerContact);
            }
          }
        }
        if (shareHolderArray < 1) {
          for (let i = 0; i < 1 - shareHolderArray; i++) {
            let partnerContact = { ...newContact };
            partnerContact.contact_type = "shareholder";
            partnerContact.partner_type = "individual";

            state.current.contacts.push(partnerContact);
          }
        }
        // check count in the array
        // if less than 2, complete to 2 with the function
        // function contract_add(contact_type) { return { contact_type: contact_type, first_name:'', last_name:'',};}
      } else if (
        name === "Charity" ||
        name === "Trust" ||
        name === "Non profit / Foundation"
      ) {
        countedArray = state.current.contacts.filter(
          (contact) => contact.contact_type === "ownership"
        );
        shareHolderArray = state.current.contacts.filter(
          (contact) => contact.contact_type === "shareholder"
        );
        if (countedArray.length < 1) {
          for (let i = 0; i < minFields - countedArray.length; i++) {
            console.log("checking the for loop");
            state.current.contacts.push(newContact);
          }
        }
        if (shareHolderArray < 1) {
          for (let i = 0; i < 1 - shareHolderArray; i++) {
            let partnerContact = { ...newContact };
            partnerContact.contact_type = "shareholder";
            partnerContact.partner_type = "individual";

            state.current.contacts.push(partnerContact);
          }
        }
      }
    },
    addOnboardingContact: (state, action) => {
      if (action.payload === "contact") {
        state.current.contacts.push({ ...newContact, contact_type: "contact" });
      }
      if (action.payload === "ownership") {
        state.current.contacts.push({
          ...newContact,
          contact_type: "ownership",
          partner_type: "individual",
        });
      }
      if (action.payload === "shareholder") {
        state.current.contacts.push({
          ...newContact,
          contact_type: "shareholder",
          partner_type: "individual",
        });
      }
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

      if (id === "phone") {
        if (objectField) {
          state.current.contacts[contactIndex][id][0][objectField] = value;
        }
      } else if (id === "email") {
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
        if (response.data.roles) {
          console.log("response.data", response.data);
          dispatch(setRolesData(response.data.roles));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
export const updateContactFieldOnboarding =
  (contactIndex) => async (dispatch, getState) => {
    if (
      getState().onboarding.current.contacts[contactIndex].contact_type ===
      "contact"
    ) {
      if (
        getState().onboarding.current.contacts[contactIndex].first_name ||
        getState().onboarding.current.contacts[contactIndex].last_name ||
        getState().onboarding.current.contacts[contactIndex].email[0] ||
        (getState().onboarding.current.contacts[contactIndex].phone[0].number &&
          getState().onboarding.current.contacts[contactIndex].phone[0]
            .dialing_code)
      ) {
        try {
          let onboardingToSend =
            getState().onboarding.current.contacts[contactIndex];
          !onboardingToSend.uuid && delete onboardingToSend.uuid;
          const response = await axios.put(
            `${BASE_URL}${END_POINT.EXTERNAL}${END_POINT.ONBOARDING}${
              getState().auth.uuid
            }`,
            onboardingToSend
          );

          if (response.status === 200) {
            dispatch(
              setAuthField({ id: "progress", value: response.data.progress })
            );
            if (response.data.contact_uuid) {
              dispatch(
                setOnboardingContactField({
                  id: "uuid",
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
    } else {
      try {
        let contact = {
          contact: JSON.parse(
            JSON.stringify(getState().onboarding.current.contacts[contactIndex])
          ),
        };
        if (!contact.contact.uuid) {
          delete contact.contact.uuid;
        }
        if (!contact.contact.position_uuid) {
          delete contact.contact.position_uuid;
        }
        if (!contact.contact.birthday_at) {
          delete contact.contact.birthday_at;
        }
        if(!contact.contact.email){
          delete contact.contact.email
        }
        if(!contact.contact.phone){
          delete contact.contact.phone
        }
        const response = await axios.put(
          `${BASE_URL}${END_POINT.EXTERNAL}${END_POINT.ONBOARDING}${
            getState().auth.uuid
          }`,
          contact
        );
        if (response.status === 200) {
          dispatch(
            setAuthField({ id: "progress", value: response.data.progress })
          );
          if (response.data.contact_uuid) {
            dispatch(
              setOnboardingContactField({
                id: "uuid",
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
      if (textFields.roles) {
        dispatch(setRolesData(textFields.roles));
      }
      if (textFields.company_type_uuid) {
        console.log(
          "COMPANY TYPE UUID",
          getState().meta.company_typesMap,
          textFields.company_type_uuid
        );
        dispatch(
          setManagmentList({
            name: getState().meta.company_typesMap[
              textFields.company_type_uuid
            ],
            minFields:
              getState().meta.companyMinIndividual[
                textFields.company_type_uuid
              ],
          })
        );
      }
      if (
        !textFields.registered_office_address_gapi ||
        !textFields.principal_business_address_gapi
      ) {
        var options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        };

        function success(pos) {
          console.log("POS", pos);
          var crd = pos.coords;

          console.log("Your current position is:");
          console.log(`Latitude : ${crd.latitude}`);
          console.log(`Longitude: ${crd.longitude}`);

          dispatch(
            sendGeoLocation(crd.latitude, crd.longitude, getState().auth.uuid)
          );
        }

        function error(err) {
          console.log("blabla2", err);
          console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        navigator.geolocation.getCurrentPosition(success, error, options);
      }
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
export const sendGeoLocation = (location, id) => async (dispatch, getState) => {
  console.log("HERE DISPATCHING THE GAPI LOCATION");
  try {
    const response = await axios.get(
      `${BASE_URL}${END_POINT.EXTERNAL}${END_POINT.ONBOARDING}${
        END_POINT.GEO_LOCATION
      }/${getState().auth.uuid}`,
      { params: { location } }
    );
    if (response.data.status === 200) {
      dispatch(setAutoGapiLocation(response.data.full_address));
    }
  } catch (err) {
    console.log("Error1", err);
  }
};

export const {
  setCurrentOnboardingFields,
  setCurrentOnboarding,
  setAutoGapiLocation,
  addManagmentContant,
  deleteManagmentContact,
  setManagmentList,
  setCurrentOnboardingFiles,
  addOnboardingContact,
  removeOnboardingContact,
  setOnboardingContactField,
  setOnboardingAssets,
} = singleOnboardingSlice.actions;
export default singleOnboardingSlice.reducer;
