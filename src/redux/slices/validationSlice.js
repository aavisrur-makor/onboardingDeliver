import { createSlice } from '@reduxjs/toolkit'
import validator from 'validator'
const contactValidation = (type, contact = {}) => {
  switch (type) {
    case 'contacts':
      return {
        position_uuid: contact.position_uuid ? true : false,
        first_name: !!contact.first_name,
        last_name: !!contact.last_name,
        email: contact.email.length ? contact.email.every((email) => validator.isEmail(email)) : false,
        number: contact.phone ? contact.phone.every((phone) => phone.number) : false,
        dialing_code: contact.phone ? contact.phone.every((phone) => phone.dialing_code) : false,
      }
    case 'share-holder-individual':
      return {
        first_name: !!contact.first_name,
        last_name: !!contact.last_name,
        birthday_at: !!contact.birthday_at,
        address: !!contact.address,
        entity_ownership_percentage: !!contact.entity_ownership_percentage,
      }
    case 'share-holder-entity':
      return {
        entity_name: !!contact.entity_name,
        entity_registration_number: !!contact.entity_registration_number,
        country: !!contact.country,
        client_type_uuid: !!contact.client_type_uuid,
        entity_ownership_percentage: !!contact.entity_ownership_percentage,
      }

    case 'director':
    case 'partner-individual':
    case 'trustee':
      return {
        first_name: !!contact.first_name,
        last_name: !!contact.last_name,
        birthday_at: !!contact.birthday_at,
        address: !!contact.address,
        position_uuid: !!contact.position_uuid,
      }
    case 'partner-entity':
      return {
        entity_name: !!contact.entity_name,
        entity_registration_number: !!contact.entity_registration_number,
        country: !!contact.country,
        client_type_uuid: !!contact.client_type_uuid,
      }

    default:
      return null
  }
}

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
  currency_wallet: false,
  contacts: [],
}
export const validationSlice = createSlice({
  name: 'validation',
  initialState: { validationState, remainingFields: [], isFormSubmitted: false },
  reducers: {
    setContactValidation: (state, action) => {
      const { type } = action.payload
      if (type === 'contacts') {
        state.validationState.contacts.push(contactValidation(type))
      } else if (type === 'Company Limited by Shares') {
        state.validationState.contacts.push(contactValidation('director'))
        state.validationState.contacts.push(contactValidation('share-holder-individual'))
      } else if (type === 'Partnership' || type === 'Limited Liability Partnership') {
        state.validationState.contacts.push(contactValidation('partner-individual'))
        state.validationState.contacts.push(contactValidation('share-holder-individual'))
      } else if (type === 'Charity' || type === 'Trust' || type === 'Non profit / Foundation') {
        state.validationState.contacts.push(contactValidation('trustee'))
        state.validationState.contacts.push(contactValidation('share-holder-individual'))
      }
    },
    setFirstContactValidation: (state, action) => {
      state.validationState.contacts[0] = contactValidation('contacts')
    },
    setCurrentOnboardingValidation: (state, action) => {
      const requiredFields = Object.keys(validationState)
      Object.entries(action.payload).forEach(([key, value]) => {
        console.log(key, value)
        if (key === 'currency_wallet') {
          const currencyWallets = Object.values(value)
          state.validationState.currency_wallet = currencyWallets.length ? currencyWallets.every((value) => value) : false
        } else if (key === 'trading_count_from') {
          state.validationState.trading_count_from = value !== null
        } else if (requiredFields.includes(key) && key !== 'contacts' && value) {
          state.validationState[key] = true
        }
      })
      action.payload.contacts.forEach((contact) => {
        console.log(contact)
        //consider to switch case
        const { type, section } = contact
        switch (section) {
          case 'contact':
            state.validationState.contacts.push(contactValidation('contacts', contact))
            break
          case 'ownership':
            type === 'individual'
              ? state.validationState.contacts.push(contactValidation('partner-individual', contact))
              : state.validationState.contacts.push(contactValidation('partner-entity', contact))
            break
          case 'shareholder':
            contact.type === 'individual'
              ? state.validationState.contacts.push(contactValidation('share-holder-individual', contact))
              : state.validationState.contacts.push(contactValidation('share-holder-entity', contact))
            break
          default:
            break
        }
      })
    },
    setValidation: (state, action) => {
      const { field, value } = action.payload
      if (field === 'currency_wallet') {
      }
      state.validationState[field] = value
    },
    setIsFormSubmitted: (state, action) => {
      state.isFormSubmitted = action.payload
    },
    setOnboardingContactValidationField: (state, action) => {
      const { contactIndex, field, value } = action.payload
      state.validationState.contacts[contactIndex][field] = value
    },
    setShareHolderToggle: (state, action) => {
      const { contactIndex, alignment } = action.payload
      state.validationState.contacts[contactIndex] = alignment === 'entity' ? contactValidation('share-holder-entity') : contactValidation('share-holder-individual')
    },
    setOwnerShipToggle: (state, action) => {
      const { contactIndex, alignment } = action.payload
      state.validationState.contacts[contactIndex] = alignment === 'entity' ? contactValidation('partner-entity') : contactValidation('partner-individual')
    },
    deleteContactValidation: (state, action) => {
      const { contactIndex } = action.payload
      state.validationState.contacts = state.validationState.contacts.filter((contact, index) => index !== contactIndex)
    },
    handleToggleValidationChange: (state, action) => {
      const { contactIndex, contact, alignment } = action.payload

      if (contact.section === 'ownership') {
        if (alignment === 'individual') {
          state.validationState.contacts[contactIndex] = contactValidation('partner-individual', contact)
        } else {
          state.validationState.contacts[contactIndex] = contactValidation('partner-entity', contact)
        }
      } else if (contact.section === 'shareholder') {
        if (alignment === 'individual') {
          state.validationState.contacts[contactIndex] = contactValidation('share-holder-individual', contact)
        } else {
          state.validationState.contacts[contactIndex] = contactValidation('partner-entity', contact)
        }
      }
    },
    addSingleContact: (state, action) => {
      const { type } = action.payload

      if (type === 'contacts') {
        state.validationState.contacts.push(contactValidation(type))
      } else if (type === 'shareholder') {
        state.validationState.contacts.push(contactValidation('share-holder-individual'))
      } else if (type === 'ownership') {
        state.validationState.contacts.push(contactValidation('partner-individual'))
      }
    },
    addOpositeContact: (state, action) => {
      const type = action.payload
      if (type === 'shareholder') {
        state.validationState.contacts.push(contactValidation('partner-individual'))
      } else if (type === 'ownership') {
        state.validationState.contacts.push(contactValidation('share-holder-individual'))
      }
    },
    checkRemainingFields: (state, action) => {
      state.remainingFields = []
      const contacts = state.validationState.contacts
      Object.entries(state.validationState).forEach(([key, value]) => {
        if (!value && key !== 'contacts') state.remainingFields.push(key)
      })

      contacts.forEach((contact, index) => {
        const contactValid = Object.entries(contact).every(([key, value]) => {
          return value === true
        })
        if (!contactValid) state.remainingFields.push(`All fields in contact ${index + 1} must be filled!`)
      })
    },
  },
})

export const handleToggleChange = (contactIndex, alignment) => (dispatch, getState) => {
  const contact = getState().onboarding.current.contacts[contactIndex]
  dispatch(handleToggleValidationChange({ contactIndex, contact, alignment }))
}

export const checkCurrencyWalletValidation = () => (dispatch, getState) => {
  const currencyWallet = getState().onboarding.current.currency_wallet
  const isCurrencyWalletValid = Object.values(currencyWallet).every((value) => value)

  dispatch(setValidation({ field: 'currency_wallet', value: isCurrencyWalletValid }))
}
export const {
  setContactValidation,
  setFirstContactValidation,
  setCurrentOnboardingValidation,
  setValidation,
  setIsFormSubmitted,
  setOnboardingContactValidationField,
  setShareHolderToggle,
  setOwnerShipToggle,
  deleteContactValidation,
  handleToggleValidationChange,
  addSingleContact,
  addOpositeContact,
  checkRemainingFields,
} = validationSlice.actions
export default validationSlice.reducer
