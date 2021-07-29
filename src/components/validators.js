export const required = (value) => {
  if (value) return undefined
  return 'Field is required'
}

export const maxLengthCreator = (maxLength) => (value) => {
  if (value && value.length > maxLength) {
    return `Max length is ${maxLength} symbols`
  }
  return undefined
}

export const minLengthCreator = (minLength) => (value) => {
  if (value && value.length < minLength) {
    return `Min length is ${minLength} symbols`
  }
  return undefined
}

export const validEmail = (value) => {
  if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email address'
  }
  return undefined
}

export const matchPassword = (value, allValues) => {
  if (allValues.password && value !== allValues.password) {
    return 'Passwords must be equal'
  }
  return undefined
}

// for simple input
const validEmailRequired = (email) => {
  if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    return null;
  }
  if (email.trim() === '') {
    return 'Field is required';
  }
  return 'Invalid email address';
};

export const validate = {
  email: validEmailRequired,
  password: required
};
