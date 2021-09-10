import i18n from '../i18n';

export const passwordRequired = (value) => {
  if (value) return undefined
  return i18n.t('forms.validators.passwordRequired')
}

const validEmailRequired = (email) => {
  if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    return null;
  }
  if (email.trim() === '') {
    return i18n.t('forms.validators.emailRequired');
  }
  return i18n.t('forms.validators.emailInvalid');
};

export const validate = {
  email: validEmailRequired,
  password: passwordRequired
};
