import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import { authActions } from '../../redux/features/auth/slice';

import FormBox from '../../components/FormBox';
import TextField from '../../components/TextField';
import Loading from '../../components/Loading';
import { Container } from './styles';

/* START Form validation */
const schema = yup.object().shape({
  email: yup.string().email('Email inválido').required('Campo Obrigatório'),
  password: yup.string().required('Campo Obrigatório'),
});

const initialValues = {
  email: '',
  password: '',
};
/* END Form validation */

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const serverErrors = useSelector((state) => state.auth.errors); // Back-end errors

  const handleFormSubmit = (values) => {
    dispatch(authActions.loginRequest(values));
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);

  return (
    <>
      <Helmet>
        <title>ShareFun | Login | Comece a compartilhar</title>
      </Helmet>
      <Container>
        <FormBox>
          <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={schema}>
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
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

                {isLoading ? (
                  <button type="button" className="buttonLoading">
                    <Loading />
                  </button>
                ) : (
                  <button type="submit" title="Fazer login">
                    Entrar
                  </button>
                )}
                {serverErrors.map((error, index) => (
                  <p className="errors" key={index}>
                    {error}
                  </p>
                ))}
                {serverErrors.length > 0 && (
                  <Link to="/" className="passwordRecover" title="Esqueceu a senha? Clique aqui">
                    Esqueceu a senha? Clique aqui
                  </Link>
                )}
                <Link to="/register" title="Ainda não tem uma conta? Crie uma aqui">
                  Ainda não tem uma conta? Crie uma aqui
                </Link>
              </form>
            )}
          </Formik>
        </FormBox>
      </Container>
    </>
  );
}
