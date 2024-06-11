import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { useRef, useState } from 'react';

import { infoValidation, emailValidation, passwordValidation } from './formValidation';
import { API_URL } from '../../../../constants/appConfig';
import axios from '../../../../services/axios';
import { authActions as actions } from '../../../../redux/features/auth/slice';
import { handleApiErrorMessages } from '../../../../services/handleApiErrors';
import { SUCCESS_UPDATE_MESSAGE } from '../../../../constants/messages';
import {
  EMAIL_ALREADY_IN_USE_ERROR,
  NO_FIELDS_PROVIDED_ERROR,
  USER_NOT_FOUND_ERROR,
} from '../../../../constants/apiErrorMessages';

import UserImage from '../../../UserImage';
import TextField from '../../../TextField';
import Loading from '../../../Loading';
import { Container } from './styles';

export default function Edit() {
  const dispatch = useDispatch();

  const { firstName, lastName, location, occupation, twitter, linkedin, email, picturePath, coverPath } = useSelector(
    (state) => state.auth.user,
  );

  const coverInputRef = useRef(null);
  const pictureInputRef = useRef(null);

  // Error and Success messages
  const initialMessages = { info: [], email: [], password: [], cover: [], picture: [] };
  const [apiErrors, setApiErrors] = useState(initialMessages);
  const [successMessage, setSuccessMessage] = useState(initialMessages);

  const handleFormSubmit = async (formType, values, setSubmitting) => {
    // Clear previous error and success messages
    setApiErrors(initialMessages);
    setSuccessMessage(initialMessages);

    // Variable to hold form values
    let payload = values;

    // Check if any file inputs are present
    if (values.picturePath || values.coverPath) {
      payload = new FormData();
      Object.keys(values).forEach((key) => {
        payload.append(key, values[key]);
      });
    }

    try {
      const { data } = await axios.patch('/users/update/', payload);

      // Update user in Redux store
      dispatch(actions.updateUser(data));

      // Set success message for the specific form
      setSuccessMessage((prevSuccess) => ({
        ...prevSuccess,
        [formType]: SUCCESS_UPDATE_MESSAGE,
      }));
    } catch (e) {
      // Handles API errors and returns an array of user-friendly messages
      const errors = handleApiErrorMessages(e, [
        USER_NOT_FOUND_ERROR,
        NO_FIELDS_PROVIDED_ERROR,
        EMAIL_ALREADY_IN_USE_ERROR,
      ]);

      // Set error messages for the specific form
      setApiErrors((prevErrors) => ({
        ...prevErrors,
        [formType]: errors,
      }));
    } finally {
      // End the form's submitting state
      setSubmitting(false);
    }
  };

  // Utility function to convert the value to a safe string
  const getSafeString = (value) => {
    return typeof value === 'string' ? value : '';
  };

  return (
    <Container>
      <div className="formGroup">
        {/* INFO */}
        <div>
          <h4>Information</h4>
          <Formik
            onSubmit={(values, { setSubmitting }) => {
              handleFormSubmit('info', values, setSubmitting);
            }}
            initialValues={{ firstName, lastName, location, occupation, twitter, linkedin }}
            validationSchema={infoValidation.schema}
          >
            {({ values, errors, touched, handleBlur, handleChange, isSubmitting }) => (
              <Form>
                <div className="doubleText">
                  <TextField
                    label="First Name"
                    id="firstName"
                    name="firstName"
                    value={values.firstName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.firstName && errors.firstName}
                    disabled={isSubmitting}
                  />
                  <TextField
                    label="Last Name"
                    id="lastName"
                    name="lastName"
                    value={values.lastName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.lastName && errors.lastName}
                    disabled={isSubmitting}
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
                  disabled={isSubmitting}
                />
                <TextField
                  label="Occupation"
                  id="occupation"
                  name="occupation"
                  value={values.occupation}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.occupation && errors.occupation}
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
                />

                <button type={isSubmitting ? 'button' : 'submit'} className={isSubmitting ? 'buttonLoading' : ''}>
                  {isSubmitting ? <Loading size={'35px'} /> : 'Save'}
                </button>

                {apiErrors.info.map((error, index) => (
                  <p className="errorMessage" key={index}>
                    {error}
                  </p>
                ))}
                {successMessage.info && <p className="successMessage">{successMessage.info}</p>}
              </Form>
            )}
          </Formik>
        </div>
        {/* EMAIL */}
        <div>
          <h4>Email</h4>
          <Formik
            onSubmit={(values, { setSubmitting }) => {
              handleFormSubmit('email', values, setSubmitting);
            }}
            initialValues={{ email }}
            validationSchema={emailValidation.schema}
          >
            {({ values, errors, touched, handleBlur, handleChange, isSubmitting }) => (
              <Form>
                <TextField
                  label="Email"
                  id="email"
                  name="email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.email && errors.email}
                  disabled={isSubmitting}
                />

                <button type={isSubmitting ? 'button' : 'submit'} className={isSubmitting ? 'buttonLoading' : ''}>
                  {isSubmitting ? <Loading size={'35px'} /> : 'Save'}
                </button>

                {apiErrors.email.map((error, index) => (
                  <p className="errorMessage" key={index}>
                    {error}
                  </p>
                ))}
                {successMessage.email && <p className="successMessage">{successMessage.email}</p>}
              </Form>
            )}
          </Formik>
        </div>
        {/* PASSWORD */}
        <div>
          <h4>Password</h4>
          <Formik
            onSubmit={(values, { setSubmitting }) => {
              handleFormSubmit('password', values, setSubmitting);
            }}
            initialValues={passwordValidation.initialValues}
            validationSchema={passwordValidation.schema}
          >
            {({ values, errors, touched, handleBlur, handleChange, isSubmitting }) => (
              <Form>
                <div className="doubleText">
                  <TextField
                    type="password"
                    label="Password"
                    id="password"
                    name="password"
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.password && errors.password}
                    disabled={isSubmitting}
                  />
                  <TextField
                    type="password"
                    label="Confirm"
                    id="passwordConfirm"
                    name="passwordConfirm"
                    value={values.passwordConfirm}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.passwordConfirm && errors.passwordConfirm}
                    disabled={isSubmitting}
                  />
                </div>

                <button type={isSubmitting ? 'button' : 'submit'} className={isSubmitting ? 'buttonLoading' : ''}>
                  {isSubmitting ? <Loading size={'35px'} /> : 'Save'}
                </button>

                {apiErrors.password.map((error, index) => (
                  <p className="errorMessage" key={index}>
                    {error}
                  </p>
                ))}
                {successMessage.password && <p className="successMessage">{successMessage.password}</p>}
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className="formGroup">
        {/* COVER */}
        <div className="coverContainer">
          <h4>Cover</h4>
          <div>
            <img
              src={`${API_URL}${coverPath ? `images/user/${coverPath}` : `assets/default-cover.jpg`}`}
              alt={coverPath}
              title="Cover"
            />
            <Formik
              initialValues={{ coverPath }}
              onSubmit={(values, { setSubmitting }) => {
                handleFormSubmit('cover', values, setSubmitting);
              }}
            >
              {({ values, setFieldValue, handleSubmit, isSubmitting }) => (
                <Form>
                  <TextField label="Cover" id="cov" value={getSafeString(values.coverPath)} disabled />
                  <input
                    type="file"
                    id="coverPath"
                    name="coverPath"
                    ref={coverInputRef}
                    onChange={async (event) => {
                      await setFieldValue('coverPath', event.currentTarget.files[0]);
                      handleSubmit();
                    }}
                  />

                  <button
                    type="button"
                    className={isSubmitting ? 'buttonLoading' : ''}
                    onClick={() => coverInputRef.current.click()}
                    title="Search"
                  >
                    {isSubmitting ? <Loading size={'35px'} /> : 'Search'}
                  </button>
                </Form>
              )}
            </Formik>
          </div>

          {apiErrors.cover.map((error, index) => (
            <p className="errorMessage fileFormMessage" key={index}>
              {error}
            </p>
          ))}
          {successMessage.cover && <p className="successMessage fileFormMessage">{successMessage.cover}</p>}
        </div>
        {/* PICTURE */}
        <div className="pictureContainer">
          <h4>Picture</h4>
          <div>
            <UserImage image={picturePath} userName={firstName} size={80} />
            <Formik
              initialValues={{ picturePath }}
              onSubmit={(values, { setSubmitting }) => {
                handleFormSubmit('picture', values, setSubmitting);
              }}
            >
              {({ values, setFieldValue, handleSubmit, isSubmitting }) => (
                <Form>
                  <TextField label="Picture" id="pic" value={getSafeString(values.picturePath)} disabled />
                  <input
                    type="file"
                    id="picturePath"
                    name="picturePath"
                    ref={pictureInputRef}
                    onChange={async (event) => {
                      await setFieldValue('picturePath', event.currentTarget.files[0]);
                      handleSubmit();
                    }}
                  />

                  <button
                    type="button"
                    className={isSubmitting ? 'buttonLoading' : ''}
                    onClick={() => pictureInputRef.current.click()}
                    title="Search"
                  >
                    {isSubmitting ? <Loading size={'35px'} /> : 'Search'}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
          {apiErrors.picture.map((error, index) => (
            <p className="errorMessage fileFormMessage" key={index}>
              {error}
            </p>
          ))}
          {successMessage.picture && <p className="successMessage fileFormMessage">{successMessage.picture}</p>}
        </div>
      </div>
    </Container>
  );
}
