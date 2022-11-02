import { NightsStay } from '@material-ui/icons'
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { object } from 'yup'
import { BASE_URL, END_POINT } from '../../constants'
import { setAuthField, setCurrentAuth } from './authSlice'
import { getMetaDataAsync, setRolesData } from './metaDataSlice'
import { addOpositeContact, addSingleContact, setContactValidation, setCurrentOnboardingValidation } from './validationSlice'

const initialState = {
  current: {
    country: null,
    use_electronic_trading_platform: null,
    website: null,
    registration_number: null,
    description_of_activity: null,
    agreed_ip: null,
    source_of_funds: null,
    registered_office_address_gapi: null,
    shareholder_names: '',
    principal_business_address_gapi: null,
    managment_list: [],
    currency_wallet: [],
    company_uuid: null,
    risk_category: null,
    LEI: null,
    license_number: null,
    client_company_legal_name: null,
    trading_name: null,
    client_type_uuid: null,
    type_of_business_uuid: null,
    contacts: [
      {
        first_name: null,
        last_name: null,
        address: null,
        birthday_at: {},
        type: null,
        phone: [{ number: '', dialing_code: '' }],
        email: [''],
        position_uuid: null,
        company_name: null,
        company_number: null,
        section: 'contact',
        uuid: null,
        percentage_ownership: null,
        country: null,
      },
    ],
    funds_source: null,
    has_regulation_required: false,
    regulator_uuid: null,
    regulator_name: null,
    trading_count_from: 0,
    trading_count_to: 0,
    trading_count_frequency: null,
    trading_volume: null,
    trading_volume_frequency: null,
  },
  files: {
    certificate_of_incorporation: '',
    articles_of_association: '',
    proof_of_business_address: '',

    shareholders_list: '',
    source_of_funds: '',
    chart_of_organisation: '',
    aml_policy: '',
    financial_statement: '',
    proof_of_identity_or_address: [],
  },
}
const newContact = {
  first_name: null,
  last_name: null,
  address: null,
  birthday_at: null,
  type: null,
  phone: [{ number: '', dialing_code: '' }],
  email: [''],
  position_uuid: null,
  company_name: null,
  company_number: null,
  section: null,
  uuid: null,
  country: null,
  client_type_uuid: null,
  percentage_ownership: null,
}

export const singleOnboardingSlice = createSlice({
  name: 'onboarding',
  initialState: initialState,
  reducers: {
    setCurrentOnboardingFields: (state, action) => {
      const { id, value } = action.payload
      if (id === 'currency_wallet') {
        const { index, asset } = action.payload
        state.current.currency_wallet[asset] = value
      } else {
        state.current[id] = value
      }
    },
    setCurrentRegulatorField: (state, action) => {
      const { id, value } = action.payload
      state.current[id] = value
      if (id === 'regulator_uuid') {
        state.current.regulator_name = null
      } else {
        state.current.regulator_uuid = null
      }
    },
    setCurrentOnboarding: (state, action) => {
      state.current = action.payload
    },
    setAutoGapiLocation: (state, action) => {
      state.current.registered_office_address_gapi = action.payload.full_address
      state.current.country = action.payload.iso_code_2
    },
    setCurrentOnboardingFiles: (state, action) => {
      state.files = action.payload
    },
    addManagmentContant: (state, action) => {
      state.current.managment_list.push({
        first_name: null,
        last_name: null,
        birthday_at: null,
        address: null,
        position_uuid: null,
        company_name: null,
        company_number: null,
        country: null,
      })
    },
    deleteContact: (state, action) => {
      const managmentIndex = action.payload
      if (state.current.contacts.length > 1) {
        state.current.contacts = state.current.contacts.filter((contact, index) => index !== managmentIndex)
      }
    },
    setManagmentList: (state, action) => {
      const { name, minFields } = action.payload

      let countedArray = []
      let shareHolderArray = []
      if (name === 'Company Limited by Shares' || name === 'Partnership' || name === 'Limited Liability Partnership') {
        countedArray = state.current.contacts.filter((contact) => contact.section === 'ownership')
        shareHolderArray = state.current.contacts.filter((contact) => contact.section === 'shareholder')
        if (countedArray.length < 2) {
          if (name === 'Partnership' || name === 'Limited Liability Partnership' || name === 'Company Limited by Shares') {
            for (let i = 0; i < minFields - countedArray.length; i++) {
              let partnerContact = { ...newContact }
              partnerContact.type = 'individual'
              partnerContact.section = 'ownership'

              state.current.contacts.push(partnerContact)
            }
          }
        }
        if (shareHolderArray.length < 1) {
          for (let i = 0; i < 1 - shareHolderArray; i++) {
            let partnerContact = { ...newContact }
            partnerContact.section = 'shareholder'
            partnerContact.type = 'individual'

            state.current.contacts.push(partnerContact)
          }
        }
      } else if (name === 'Charity' || name === 'Trust' || name === 'Non profit / Foundation') {
        countedArray = state.current.contacts.filter((contact) => contact.section === 'ownership')
        shareHolderArray = state.current.contacts.filter((contact) => contact.section === 'shareholder')
        if (countedArray.length < 1) {
          for (let i = 0; i < minFields - countedArray.length; i++) {
            let partnerContact = newContact
            partnerContact.section = 'ownership'
            partnerContact.type = 'individual'
            state.current.contacts.push(newContact)
          }
        }
        if (shareHolderArray.length < 1) {
          for (let i = 0; i < 1 - shareHolderArray; i++) {
            let partnerContact = { ...newContact }
            partnerContact.section = 'shareholder'
            partnerContact.type = 'individual'

            state.current.contacts.push(partnerContact)
          }
        }
      }
    },
    addOnboardingContact: (state, action) => {
      if (action.payload === 'contact') {
        state.current.contacts.push({ ...newContact, section: 'contact' })
      }
      if (action.payload === 'ownership') {
        state.current.contacts.push({
          ...newContact,
          section: 'ownership',
          type: 'individual',
        })
      }
      if (action.payload === 'shareholder') {
        state.current.contacts.push({
          ...newContact,
          section: 'shareholder',
          type: 'individual',
        })
      }
    },
    removeOnboardingContact: (state, action) => {
      const contactIndex = action.payload
      state.current.contacts = state.current.contacts.filter((contact, index) => index !== contactIndex)
    },
    setOnboardingContactField: (state, action) => {
      const { id, value, contactIndex, objectField } = action.payload

      if (id === 'phone') {
        if (objectField) {
          state.current.contacts[contactIndex].phone[0][objectField] = value
        }
      } else if (id === 'email') {
        state.current.contacts[contactIndex][id][0] = value
      } else {
        state.current.contacts[contactIndex][id] = value
      }
    },
    setOnboardingAssets: (state, action) => {
      const { id, value, checkStatus } = action.payload
      if (checkStatus) {
        state.current.currency_wallet = {
          ...state.current.currency_wallet,
          [value]: null,
        }
      } else {
        delete state.current.currency_wallet[value]
      }
    },
  },
})
//Thunk

export const updateFieldOnboarding = (data, uuid) => async (dispatch, getState) => {
  try {
    const response = await axios.put(`${BASE_URL}${END_POINT.EXTERNAL}${END_POINT.ONBOARDING}${getState().auth.uuid}`, data)

    if (response.status === 200) {
      dispatch(setAuthField({ id: 'progress', value: response.data.progress }))
      if (response.data.risk_category) {
        dispatch(
          setCurrentOnboardingFields({
            id: 'risk_category',
            value: response.data.risk_category,
          })
        )
      }

      if (response.data.roles) {
        dispatch(setRolesData(response.data.roles))
      }
    }
  } catch (err) {
    console.log(err)
  }
}
export const updateContactFieldOnboarding = (contactIndex) => async (dispatch, getState) => {
  try {
    if (getState().onboarding.current.contacts[contactIndex].section === 'contact') {
      let contact = {
        contact: JSON.parse(JSON.stringify(getState().onboarding.current.contacts[contactIndex])),
      }
      if (!contact.contact.uuid) {
        delete contact.contact.uuid
      }
      if (!contact.contact.phone[0].dialing_code || !contact.contact.phone[0].number) {
        delete contact.contact.phone
      }
      if (!contact.contact.email[0]) {
        delete contact.contact.email
      }
      if (!contact.contact.position_uuid) {
        delete contact.contact.position_uuid
      }
      if (
        getState().onboarding.current.contacts[contactIndex].first_name ||
        getState().onboarding.current.contacts[contactIndex].last_name ||
        (getState().onboarding.current.contacts[contactIndex].phone[0].dialing_code && getState().onboarding.current.contacts[contactIndex].phone[0].number) ||
        getState().onboarding.current.contacts[contactIndex].email[0]
      ) {
        const response = await axios.put(`${BASE_URL}${END_POINT.EXTERNAL}${END_POINT.ONBOARDING}${getState().auth.uuid}`, contact)

        if (response.status === 200) {
          dispatch(setAuthField({ id: 'progress', value: response.data.progress }))
          if (response.data.contact_uuid) {
            dispatch(
              setOnboardingContactField({
                id: 'uuid',
                value: response.data.contact_uuid,
                contactIndex,
              })
            )
          }
        }
      }
    }
  } catch (err) {
    console.log(err)
  }
}
export const updateSection3Contact = (contactIndex) => async (dispatch, getState) => {
  let contact = {
    contact: JSON.parse(JSON.stringify(getState().onboarding.current.contacts[contactIndex])),
  }
  if (!contact.contact.uuid) {
    delete contact.contact.uuid
  }
  if (!contact.contact.position_uuid) {
    delete contact.contact.position_uuid
  }
  if (!contact.contact.birthday_at) {
    delete contact.contact.birthday_at
  }
  if (!contact.contact.email) {
    delete contact.contact.email
  }
  if (!contact.contact.phone) {
    delete contact.contact.phone
  }
  const response = await axios.put(`${BASE_URL}${END_POINT.EXTERNAL}${END_POINT.ONBOARDING}${getState().auth.uuid}`, contact)
  if (response.status === 200) {
    dispatch(setAuthField({ id: 'progress', value: response.data.progress }))
    if (response.data.contact_uuid) {
      dispatch(
        setOnboardingContactField({
          id: 'uuid',
          value: response.data.contact_uuid,
          contactIndex,
        })
      )
    }
  }
}
export const getOnboardingData = () => async (dispatch, getState) => {
  try {
    const res = await axios.get(`${BASE_URL}${END_POINT.EXTERNAL}${END_POINT.ONBOARDING}${getState().auth.uuid}`)
    if (res.status === 200) {
      dispatch(setAuthField({ id: 'uuidIsValid', value: true }))
      const textFields = await res.data
      dispatch(setCurrentOnboarding(textFields))
      dispatch(setCurrentOnboardingValidation(textFields))
      if (textFields.roles) {
        dispatch(setRolesData(textFields.roles))
      }
      if (textFields.client_type_uuid) {
        const companyTypeMap = getState().meta.company_typesMap
        dispatch(
          setManagmentList({
            name: getState().meta.company_typesMap[textFields.client_type_uuid],
            minFields: getState().meta.companyMinIndividual[textFields.client_type_uuid],
          })
        )
        const ownerShipAndShareholders = textFields.contacts.filter((contact) => contact.section !== 'contact')
        if (ownerShipAndShareholders.length === 0) dispatch(setContactValidation({ type: companyTypeMap[textFields.client_type_uuid] }))
        if (ownerShipAndShareholders.length === 1) dispatch(addOpositeContact(ownerShipAndShareholders[0].section))
      }
      if (!textFields.registered_office_address_gapi || !textFields.country) {
        var options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }

        function success(pos) {
          var crd = pos.coords

          dispatch(sendGeoLocation(crd.latitude, crd.longitude, getState().auth.uuid))
        }

        function error(err) {
          console.warn(`ERROR(${err.code}): ${err.message}`)
        }

        navigator.geolocation.getCurrentPosition(success, error, options)
      }
      dispatch(
        setCurrentAuth({
          progress: res.data.progress,
          isAgreeElectronic: res.data.use_electronic_trading_platform,
          AcceptAndSendAgree: res.data.accept_and_send,
          AcceptAndSendFinish: false,
        })
      )
    }
  } catch (err) {
    console.log(err)
    // if (err.response.status === 400) {
    //   dispatch(setAuthField({ id: "uuidIsValid", value: false }));
    //   dispatch(
    //     setAuthField({
    //       id: "loadingErrorMessage",
    //       value: "Somethin went wrong...",
    //     })
    //   );
    //   window.location.href = "https://enigma-securities.io/";
    // }
  }
}
export const sendGeoLocation = (lat, lon, id) => async (dispatch, getState) => {
  try {
    const response = await axios.get(`${BASE_URL}${END_POINT.EXTERNAL}${END_POINT.ONBOARDING}${END_POINT.GEO_LOCATION}/${getState().auth.uuid}`, { params: { lat, lon } })
    if (response.status === 200) {
      dispatch(setAutoGapiLocation(response.data))
    }
  } catch (err) {}
}
export const deleteContactAsync = (index) => async (dispatch, getState) => {
  try {
    if (getState().onboarding.current.contacts[index].uuid) {
      const response = await axios.put(`${BASE_URL}${END_POINT.EXTERNAL}${END_POINT.ONBOARDING}${getState().auth.uuid}`, {
        delete_contact: getState().onboarding.current.contacts[index].uuid,
      })
      if (response.status === 200) {
        dispatch(setAuthField({ id: 'progress', value: response.data.progress }))
      }
    }

    dispatch(deleteContact(index))
  } catch (err) {
    console.log(err)
  }
}
export const {
  setCurrentOnboardingFields,
  setCurrentOnboarding,
  setAutoGapiLocation,
  addManagmentContant,
  deleteContact,
  setManagmentList,
  setCurrentOnboardingFiles,
  setCurrentRegulatorField,
  addOnboardingContact,
  removeOnboardingContact,
  setOnboardingContactField,
  setOnboardingAssets,
} = singleOnboardingSlice.actions
export default singleOnboardingSlice.reducer
