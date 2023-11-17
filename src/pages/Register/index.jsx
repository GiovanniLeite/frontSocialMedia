import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { authActions } from '../../redux/features/auth/slice';

import FormBox from '../../components/FormBox';
import TextField from '../../components/TextField';
import Loading from '../../components/Loading';
import { Container } from './styles';

/* START Form validation */
const REQUIRED_MSG = 'Campo Obrigatório';
const MIN_LENGTH_MSG = 'Deve ter pelo menos 3 caracteres';
const MAX_LENGTH_MSG = 'Deve ter no máximo 50 caracteres';

const schema = yup.object().shape({
  firstName: yup.string().min(3, MIN_LENGTH_MSG).max(50, MAX_LENGTH_MSG).required(REQUIRED_MSG),
  lastName: yup.string().min(3, MIN_LENGTH_MSG).max(50, MAX_LENGTH_MSG).required(REQUIRED_MSG),
  location: yup.string().min(3, MIN_LENGTH_MSG).max(50, MAX_LENGTH_MSG).required(REQUIRED_MSG),
  occupation: yup.string().min(3, MIN_LENGTH_MSG).max(50, MAX_LENGTH_MSG).required(REQUIRED_MSG),
  email: yup.string().email('invalid email').required(REQUIRED_MSG),
  password: yup
    .string()
    .min(8, 'Deve ter pelo menos 8 caracteres')
    .max(50, MAX_LENGTH_MSG)
    .matches(/[A-Z]/, 'Deve ter pelo menos uma letra maiúscula Ex. ABC')
    .matches(/[a-z]/, 'Deve ter pelo menos uma letra minúscula Ex. abc')
    .matches(/[0-9]/, 'Deve ter pelo menos um número Ex. 981')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Deve ter pelo menos um caractere especial Ex. @$!')
    .required(REQUIRED_MSG),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Senha e Confirmação devem ser iguais')
    .required(REQUIRED_MSG),
});

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: '',
  location: '',
  occupation: '',
};
/* END Form validation */

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const serverErrors = useSelector((state) => state.auth.errors); // Back-end errors

  const handleFormSubmit = (values) => {
    dispatch(authActions.registerRequest(values));
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);

  return (
    <>
      <Helmet>
        <title>ShareFun | Registro | Crie sua conta</title>
      </Helmet>
      <Container>
        <FormBox>
          <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={schema}>
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div className="doubleText">
                  <TextField
                    label="Nome"
                    id="firstName"
                    name="firstName"
                    value={values.firstName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.firstName && errors.firstName}
                    disabled={isLoading}
                  />
                  <TextField
                    label="Sobrenome"
                    id="lastName"
                    name="lastName"
                    value={values.lastName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.lastName && errors.lastName}
                    disabled={isLoading}
                  />
                </div>
                <TextField
                  label="Cidade, Estado"
                  id="location"
                  name="location"
                  value={values.location}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.location && errors.location}
                  disabled={isLoading}
                />
                <TextField
                  label="Ocupação"
                  id="occupation"
                  name="occupation"
                  value={values.occupation}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.occupation && errors.occupation}
                  disabled={isLoading}
                />
                <TextField
                  label="Email"
                  id="email"
                  name="email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.email && errors.email}
                  disabled={isLoading}
                />
                <TextField
                  type="password"
                  label="Senha"
                  id="password"
                  name="password"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.password && errors.password}
                  disabled={isLoading}
                />
                <TextField
                  type="password"
                  label="Confirmar senha"
                  id="passwordConfirm"
                  name="passwordConfirm"
                  value={values.passwordConfirm}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.passwordConfirm && errors.passwordConfirm}
                  disabled={isLoading}
                />

                {isLoading ? (
                  <button type="button" className="buttonLoading">
                    <Loading />
                  </button>
                ) : (
                  <button type="submit" title="Criar Perfil">
                    Salvar
                  </button>
                )}
                {serverErrors.map((error, index) => (
                  <p className="errors" key={index}>
                    {error}
                  </p>
                ))}
                <Link to="/login" title="Já tem uma conta? Faça login aqui.">
                  Já tem uma conta? Faça login aqui.
                </Link>
              </form>
            )}
          </Formik>
        </FormBox>
      </Container>
    </>
  );
}
