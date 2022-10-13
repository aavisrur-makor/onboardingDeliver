import { createSlice } from "@reduxjs/toolkit";

const contactValidation = (type, contact = {}) => {
  switch (type) {
    case "contacts":
      return {
        position_uuid: contact.position_uuid ? true : false,
        first_name: !!contact.first_name,
        last_name: !!contact.last_name,
        email: contact.email ? contact.email.every((email) => email) : false,
        number: contact.phone
          ? contact.phone.every((phone) => phone.number)
          : false,
        dialing_code: contact.phone
          ? contact.phone.every((phone) => phone.dialing_code)
          : false,
      };
    case "share-holder-individual":
      return {
        first_name: !!contact.first_name,
        last_name: !!contact.last_name,
        birthday_at: !!contact.birthday_at,
        address: !!contact.address,
        entity_ownership_percentage: !!contact.entity_ownership_percentage,
      };
    case "share-holder-entity":
      return {
        entity_name: !!contact.entity_name,
        entity_registration_number: !!contact.entity_registration_number,
        country: !!contact.country,
        client_type_uuid: !!contact.client_type_uuid,
        entity_ownership_percentage: !!contact.entity_ownership_percentage,
      };

    case "director":
    case "partner-individual":
    case "trustee":
      return {
        first_name: !!contact.first_name,
        last_name: !!contact.last_name,
        birthday_at: !!contact.birthday_at,
        address: !!contact.address,
        position_uuid: !!contact.position_uuid,
      };
    case "partner-entity":
      return {
        entity_name: !!contact.entity_name,
        entity_registration_number: !!contact.entity_registration_number,
        country: !!contact.country,
        client_type_uuid: !!contact.client_type_uuid,
      };

    default:
      return null;
  }
};

const validationState = {
  client_company_legal_name: false,
  registration_number: false,
  client_type_uuid: false,
  registered_office_address_gapi: false,
  country: false,
  business_type_uuid: false,
  description_of_activity: false,
  funds_source: false,
  trading_count_from: false,
  trading_count_to: false,
  trading_count_frequency: false,
  trading_volume: false,
  trading_volume_frequency: false,
  asset: false,
  currency_wallet: false,
  contacts: [],
};
export const validationSlice = createSlice({
  name: "validation",
  initialState: validationState,
  reducers: {
    setContactValidation: (state, action) => {
      const { type } = action.payload;
      console.log(action.payload);
      if (type === "contacts") {
        state.contacts.push(contactValidation(type));
      } else if (type === "Company Limited by Shares") {
        state.contacts.push(contactValidation("director"));
        state.contacts.push(contactValidation("share-holder-individual"));
      } else if (
        type === "Partnership" ||
        type === "Limited Liability Partnership"
      ) {
        state.contacts.push(contactValidation("partner-individual"));
        state.contacts.push(contactValidation("share-holder-individual"));
      } else if (
        type === "Charity" ||
        type === "Trust" ||
        type === "Non profit / Foundation"
      ) {
        state.contacts.push(contactValidation("trustee"));
        state.contacts.push(contactValidation("share-holder-individual"));
      }
    },
    setFirstContactValidation: (state, action) => {
      state.contacts[0] = contactValidation("contacts");
    },
    setCurrentOnboardingValidation: (state, action) => {
      const requiredFields = Object.keys(validationState);
      console.log(requiredFields, "requiredFields");
      console.log(action.payload, "data from server");
      Object.entries(action.payload).forEach(([key, value]) => {
        if (requiredFields.includes(key) && key !== "contacts" && value) {
          state[key] = true;
        } else if (key === "company_assets" && value[0]) {
          state.asset = true;
        } else if (key === "currency_wallet") {
          const currencyWallets = Object.entries(
            action.payload.currency_wallet
          );
          state.currency_wallet = currencyWallets.every((key, value) => value);
        }
      });
      action.payload.contacts.forEach((contact) => {
        //consider to switch case
        const { type, section } = contact;
        switch (section) {
          case "contact":
            state.contacts.push(contactValidation("contacts", contact));
            break;
          case "ownership":
            type === "individual"
              ? state.contacts.push(
                  contactValidation("partner-individual", contact)
                )
              : state.contacts.push(
                  contactValidation("partner-entity", contact)
                );
            break;
          case "shareholder":
            contact.type === "individual"
              ? state.contacts.push(
                  contactValidation("share-holder-individual", contact)
                )
              : state.contacts.push(
                  contactValidation("share-holder-entity", contact)
                );
            break;
          default:
            break;
        }
      });
    },
    setValidation: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    setOnboardingContactValidationField: (state, action) => {
      const { contactIndex, field, value } = action.payload;
      state.contacts[contactIndex][field] = value;
    },
    setShareHolderToggle: (state, action) => {
      const { contactIndex, alignment } = action.payload;
      state.contacts[contactIndex] =
        alignment === "entity"
          ? contactValidation("share-holder-entity")
          : contactValidation("share-holder-individual");
    },
    setOwnerShipToggle: (state, action) => {
      const { contactIndex, alignment } = action.payload;
      state.contacts[contactIndex] =
        alignment === "entity"
          ? contactValidation("partner-entity")
          : contactValidation("partner-individual");
    },
    deleteContactValidation: (state, action) => {
      const { contactIndex } = action.payload;
      state.contacts = state.contacts.filter(
        (contact, index) => index !== contactIndex
      );
    },
  },
});

export const {
  setContactValidation,
  setFirstContactValidation,
  setCurrentOnboardingValidation,
  setValidation,
  setOnboardingContactValidationField,
  setShareHolderToggle,
  setOwnerShipToggle,
  deleteContactValidation,
} = validationSlice.actions;
export default validationSlice.reducer;
