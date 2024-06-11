import * as yup from 'yup';

import {
  MIN_LENGTH_ERROR,
  MAX_LENGTH_ERROR,
  REQUIRED_FIELD_ERROR,
  INVALID_EMAIL_ERROR,
  MIN_LENGTH_PASSWORD_ERROR,
  UPPERCASE_LETTER_ERROR,
  LOWERCASE_LETTER_ERROR,
  NUMBER_ERROR,
  SPECIAL_CHARACTER_ERROR,
  PASSWORD_CONFIRMATION_ERROR,
} from '../../constants/messages';

export const formValidation = {
  initialValues: {
    firstName: '',
    lastName: '',
    location: '',
    occupation: '',
    twitter: '',
    linkedin: '',
    email: '',
    password: '',
    passwordConfirm: '',
  },
  schema: yup.object().shape({
    firstName: yup.string().min(3, MIN_LENGTH_ERROR).max(50, MAX_LENGTH_ERROR).required(REQUIRED_FIELD_ERROR),
    lastName: yup.string().min(3, MIN_LENGTH_ERROR).max(50, MAX_LENGTH_ERROR).required(REQUIRED_FIELD_ERROR),
    location: yup.string().min(3, MIN_LENGTH_ERROR).max(50, MAX_LENGTH_ERROR).required(REQUIRED_FIELD_ERROR),
    occupation: yup.string().min(3, MIN_LENGTH_ERROR).max(50, MAX_LENGTH_ERROR).required(REQUIRED_FIELD_ERROR),
    twitter: yup.string().max(50, MAX_LENGTH_ERROR),
    linkedin: yup.string().max(50, MAX_LENGTH_ERROR),
    email: yup.string().email(INVALID_EMAIL_ERROR).required(REQUIRED_FIELD_ERROR),
    password: yup
      .string()
      .min(8, MIN_LENGTH_PASSWORD_ERROR)
      .max(50, MAX_LENGTH_ERROR)
      .matches(/[A-Z]/, UPPERCASE_LETTER_ERROR)
      .matches(/[a-z]/, LOWERCASE_LETTER_ERROR)
      .matches(/[0-9]/, NUMBER_ERROR)
      .matches(/[!@#$%^&*(),.?":{}|<>]/, SPECIAL_CHARACTER_ERROR)
      .required(REQUIRED_FIELD_ERROR),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password'), null], PASSWORD_CONFIRMATION_ERROR)
      .required(REQUIRED_FIELD_ERROR),
  }),
};
