import validator from 'validator';

const validate = (id, value, setError) => {
  if (validator.isEmpty(value)) {
    
    setError('Field is empty.');
    return;
  } else {
    switch (id) {
      case 'email':
       
        setError(validator.isEmail(value) ? '' : 'Not a valid email address.');
        break;
        return;
      default:
        setError('');
    }
  }
};

export default validate;
