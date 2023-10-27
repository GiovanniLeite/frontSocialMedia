import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import { authActions } from '../../redux/features/auth/slice';

import TextField from '../../components/TextField';
import { Container } from './styles';

const schema = yup.object().shape({
  email: yup.string().email('Email inválido').required('Campo Obrigatório'),
  password: yup.string().required('Campo Obrigatório'),
});

const initialValues = {
  email: '',
  password: '',
};

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const handleFormSubmit = (values, onSubmitProps) => {
    dispatch(authActions.loginRequest(values));
    // onSubmitProps.resetForm();
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
        <div className="box">
          <h5>Bem vindo à ShareFun, a Rede Social que transforma conexões!</h5>
          <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={schema}>
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, resetForm }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  type="text"
                  name="email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.email) && errors.email}
                />
                <TextField
                  type="password"
                  label="Senha"
                  name="password"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.password) & errors.password}
                />
                <button type="submit" title="Fazer login">
                  Entrar
                </button>
                <Link to="/register" title="Ainda não tem uma conta? Crie uma aqui">
                  Ainda não tem uma conta? Crie uma aqui
                </Link>
              </form>
            )}
          </Formik>
        </div>
      </Container>
    </>
  );
}
