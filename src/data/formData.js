export default {
  form1: {
    grid1: [
      {
        id: 'client_company_legal_name',
        label: 'Company Legal Name',
        isRequired: true,
      },
      { id: 'registration_number', label: 'Register Number' },
      {
        id: 'registered_office_address_gapi',
        label: 'Registered Office Address',
      },
      // {id: 'country', label: 'COUNTRY'},
    ],
    grid2: [
      {
        id: 'principal_business_address_gapi',
        label: 'Principal Buisness Address(If different)',
      },
      { id: 'website', label: 'Website Url' },
      {
        id: 'description_of_activity',
        label: 'Describe the type of Business & Activity',
      },
    ],
    grid3: [
      { id: 'directors_names', label: 'Director Names' },
      { id: 'shareholder_names', label: "Major Shareholder's Names" },
    ],
  },
  form2: [
    {
      id: 'certificate_of_incorporation',
      label: 'CERTIFICATE OF INCORPORATION',
      info: 'An extract from the companies register or equivalent',
    },
    {
      id: 'articles_of_association',
      label: 'ARTICLES OF ASSOCIATION / MEMORANDUM OF ASSOCIATION',
      info: 'Proof of registered address or principal business address (for example an utility bill, tax document of the company or bank statement) that is less than 3 months old.',
    },
    {
      id: 'proof_of_business_address',
      label: "DIRECTOR'S NAME",
      info: 'That attestation document must be in English, dated less than 3 months certified as true,  and signed by a company director/authorized signatory, listing all company directors.',
    },
    {
      id: 'directors_list',
      label: 'PROOF OF REGISTERED OR PRINCIPAL BUSINESS ADDRESS',
      info: 'That attestation document must indicate precise shareholding of each individuals holding over 25% equity stake. The attestation document must be in english, dated less than 3 months, certified as true, and signed by a company director/authorized signatory.',
    },
    {
      id: 'shareholders_list',
      label: "COMPANY DIRECTORS' LIST DATED AND SIGNED",
      info: 'If there are no KYC/AML Policy, as an alternative, please provide an attestation/statement in english, dated less than 3 months, signed and certified as true by an authorized signatory/director that there are no KYC/AML Policy within the organization.',
    },
    {
      id: 'source_of_funds',
      label: 'SOURCE OF FUNDS/WEALTH',
      info: 'The org chart must display the whole company organizational structure, including subsidiaries, associated companies, holding companies etc. and be signed by an authorized signatory/company director within the last 3 months. If there are none, please write a statement letter dated & signed, certifying there are no subsidiaries, associated companies, holding companies etc.',
    },
    {
      id: 'chart_of_organisation',
      label: 'OWNERSHIP STRUCTURE SCHEME/ORGANIZATIONAL CHART OR EQUIVALENT',
      info: 'The org chart must display the whole company organizational structure, including subsidiaries, associated companies, holding companies etc. and be signed by an authorized signatory/company director within the last 3 months. If there are none, please write a statement letter dated & signed, certifying there are no subsidiaries, associated companies, holding companies etc.',
    },
    {
      id: 'aml_policy',
      label: 'COMPLIANCE KYC AML POLICY',
      info: 'If there are no KYC/AML Policy, as an alternative, please provide an attestation/statement in english, dated less than 3 months, signed and certified as true by an authorized signatory/director that there are no KYC/AML Policy within the organization.',
    },
    {
      id: 'financial_statement',
      label: 'LATEST FINANCIAL STATEMENT (IF AVAILABLE)',
    },
    { id: 'directors_list', label: "DIRECTOR'S NAME" },
  ],
  // form3: {},
};

// const numOfFields =

// 'uuid', !!!!!!!!!!!!
