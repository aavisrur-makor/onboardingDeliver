export const isMandatory = (id) => {
  switch (id) {
    case 'client_company_legal_name':
    case 'registration_number':
    case 'client_type_uuid':
    case 'registered_office_address_gapi':
    case 'country':
    case 'type_of_business_uuid':
    case 'description_of_activity':
    case 'funds_source':
    case 'trading_count_from':
    case 'trading_count_to':
    case 'trading_count_frequency':
    case 'trading_volume':
    case 'trading_volume_frequency':
    case 'asset':
    case 'currency_wallet':
      return true
    default:
      return false
  }
}
