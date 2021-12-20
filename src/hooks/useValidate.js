import React, { useState, useEffect } from 'react';
import isEmail from 'validator/lib/isEmail';

const errorMessages = {
  empty: 'Field is empty',
  // name: '',
  email: 'Not a valid email address',
  phone: 'Not a number',
  dialCode: 'Not a number',
};

const useValidate = ([name, email, phone, dialCode]) => {
  const [isValid, setValid] = useState(true);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    dialCode: '',
  });

  useEffect(
    (x, y) => {
      console.log(
        '🚀 ~ file: useValidate.js ~ line 22 ~ useEffect ~ x, y',
        x,
        y
      );
    },
    [name, email, phone, dialCode]
  );

  return { isValid, errors };
};
export default useValidate;
