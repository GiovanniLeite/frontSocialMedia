import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { authActions as actions } from '../../redux/features/auth/slice';
import { formValidation } from './formValidation';

import FormBox from '../../components/FormBox';
import TextField from '../../components/TextField';
import Loading from '../../components/Loading';
import { Container } from './styles';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    isLoggedIn,
    isLoading,
    errors: { login: apiErrors },
  } = useSelector((state) => state.auth);

  const handleFormSubmit = (values) => {
    dispatch(actions.loginRequest(values));
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);

  return (
    <>
      <Helmet>
        <title>ShareFun | Login | Start Sharing</title>
      </Helmet>
      <Container>
        <FormBox>
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={formValidation.initialValues}
            validationSchema={formValidation.schema}
          >
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
                  label="Password"
                  id="password"
                  name="password"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.password && errors.password}
                  disabled={isLoading}
                />

                <button type={isLoading ? 'button' : 'submit'} className={isLoading ? 'buttonLoading' : ''}>
                  {isLoading ? <Loading /> : 'Login'}
                </button>

                {apiErrors.map((error, index) => (
                  <p className="errors" key={index}>
                    {error}
                  </p>
                ))}
                {apiErrors.length > 0 && (
                  <Link to="/" className="passwordRecover" title="Forgot your password? Click here">
                    Forgot your password? Click here
                  </Link>
                )}
                <Link to="/register" title="Don't have an account? Create one here">
                  {"Don't have an account? Create one here"}
                </Link>
              </form>
            )}
          </Formik>
        </FormBox>
      </Container>
    </>
  );
}
