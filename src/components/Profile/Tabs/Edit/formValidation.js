import * as yup from 'yup';

import {
  MIN_LENGTH_ERROR,
  MAX_LENGTH_ERROR,
  REQUIRED_FIELD_ERROR,
  INVALID_EMAIL_ERROR,
  MIN_LENGTH_PASSWORD_ERROR,
} from '../../../../constants/messages';

export const infoValidation = {
  schema: yup.object().shape({
    firstName: yup.string().min(3, MIN_LENGTH_ERROR).max(50, MAX_LENGTH_ERROR).required(REQUIRED_FIELD_ERROR),
    lastName: yup.string().min(3, MIN_LENGTH_ERROR).max(50, MAX_LENGTH_ERROR).required(REQUIRED_FIELD_ERROR),
    location: yup.string().min(3, MIN_LENGTH_ERROR).max(50, MAX_LENGTH_ERROR).required(REQUIRED_FIELD_ERROR),
    occupation: yup.string().min(3, MIN_LENGTH_ERROR).max(50, MAX_LENGTH_ERROR).required(REQUIRED_FIELD_ERROR),
    twitter: yup.string().max(50, MAX_LENGTH_ERROR),
    linkedin: yup.string().max(50, MAX_LENGTH_ERROR),
  }),
};

export const emailValidation = {
  schema: yup.object().shape({
    email: yup.string().email(INVALID_EMAIL_ERROR).required(REQUIRED_FIELD_ERROR),
  }),
};

export const passwordValidation = {
  initialValues: {
    password: '',
    passwordConfirm: '',
  },
  schema: yup.object().shape({
    password: yup
      .string()
      .min(8, MIN_LENGTH_PASSWORD_ERROR)
      .max(50, MAX_LENGTH_ERROR)
      .matches(/[A-Z]/, 'Deve ter pelo menos uma letra maiúscula Ex. ABC')
      .matches(/[a-z]/, 'Deve ter pelo menos uma letra minúscula Ex. abc')
      .matches(/[0-9]/, 'Deve ter pelo menos um número Ex. 981')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Deve ter pelo menos um caractere especial Ex. @$!')
      .required(REQUIRED_FIELD_ERROR),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Senha e Confirmação devem ser iguais')
      .required(REQUIRED_FIELD_ERROR),
  }),
};
