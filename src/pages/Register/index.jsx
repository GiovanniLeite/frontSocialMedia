import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { authActions as actions } from '../../redux/features/auth/slice';
import { formValidation } from './formValidation';

import FormBox from '../../components/FormBox';
import TextField from '../../components/TextField';
import Loading from '../../components/Loading';
import { Container } from './styles';

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    isLoggedIn,
    isLoading,
    errors: { register: apiErrors },
  } = useSelector((state) => state.auth);

  const handleFormSubmit = (values) => {
    dispatch(actions.registerRequest(values));
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);

  return (
    <>
      <Helmet>
        <title>ShareFun | Register | Create Your Account</title>
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
                <div className="doubleText">
                  <TextField
                    label="First Name"
                    id="firstName"
                    name="firstName"
                    value={values.firstName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.firstName && errors.firstName}
                    disabled={isLoading}
                  />
                  <TextField
                    label="Last Name"
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
                  label="City, State"
                  id="location"
                  name="location"
                  value={values.location}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.location && errors.location}
                  disabled={isLoading}
                />
                <TextField
                  label="Occupation"
                  id="occupation"
                  name="occupation"
                  value={values.occupation}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.occupation && errors.occupation}
                  disabled={isLoading}
                />
                <TextField
                  label="Twitter/X"
                  mask={['twitter.com/', ...Array(50).fill(/[a-zA-Z0-9-]/)]}
                  id="twitter"
                  name="twitter"
                  value={values.twitter}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.twitter && errors.twitter}
                  disabled={isLoading}
                />
                <TextField
                  label="Linkedin"
                  mask={['linkedin.com/in/', ...Array(50).fill(/[a-zA-Z0-9-]/)]}
                  id="linkedin"
                  name="linkedin"
                  value={values.linkedin}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.linkedin && errors.linkedin}
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
                  label="Password"
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
                  label="Confirm Password"
                  id="passwordConfirm"
                  name="passwordConfirm"
                  value={values.passwordConfirm}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.passwordConfirm && errors.passwordConfirm}
                  disabled={isLoading}
                />

                <button
                  type={isLoading ? 'button' : 'submit'}
                  className={isLoading ? 'buttonLoading' : ''}
                  title="Create Profile"
                >
                  {isLoading ? <Loading /> : 'Save'}
                </button>

                {apiErrors.map((error, index) => (
                  <p className="errors" key={index}>
                    {error}
                  </p>
                ))}
                <Link to="/login" title="Already have an account? Log in here.">
                  Already have an account? Log in here.
                </Link>
              </form>
            )}
          </Formik>
        </FormBox>
      </Container>
    </>
  );
}
