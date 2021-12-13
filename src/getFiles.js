const getFiles = () => {
  const dict = Object.keys({
    certificate_of_incorporation: '',
    articles_of_association: '',
    proof_of_business_address: '',
    directors_list: '',
    shareholders_list: '',
    source_of_funds: '',
    chart_of_organisation: '',
    aml_policy: '',
    financial_statement: '',
    proof_of_identity_or_address: '',
  }).map((a) => {
    return a;
  });

  return [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2].map((_, i) => {
    console.log(
      '🚀 ~ file: getFiles.js ~ line 18 ~ return[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2].map ~ i',
      i
    );

    const rand = Math.floor(Math.random() * dict.length);
    return {
      boarding_name: `rami-${i ** i}`,
      document_type_name: dict[Math.random() > 0.45 ? dict.length - 1 : rand],
      uuid: String(Math.round(Math.random() * 100000)),
    };
  });
};

export default getFiles;
