import * as yup from 'yup';

import {
  REQUIRED_FIELD_ERROR,
  INVALID_EMAIL_ERROR,
  MAX_LENGTH_ERROR,
  MIN_LENGTH_PASSWORD_ERROR,
} from '../../constants/messages';

export const formValidation = {
  initialValues: {
    email: '',
    password: '',
  },
  schema: yup.object().shape({
    email: yup.string().email(INVALID_EMAIL_ERROR).required(REQUIRED_FIELD_ERROR),
    password: yup.string().min(8, MIN_LENGTH_PASSWORD_ERROR).max(50, MAX_LENGTH_ERROR).required(REQUIRED_FIELD_ERROR),
  }),
};
