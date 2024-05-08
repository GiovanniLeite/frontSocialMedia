import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';

import {
  infoValidation,
  emailValidation,
  passwordValidation,
  coverValidation,
  pictureValidation,
} from './formValidation';
import { API_URL } from '../../../../constants/appConfig';
import axios from '../../../../services/axios';
import { authActions as actions } from '../../../../redux/features/auth/slice';
import { handleApiErrorMessages } from '../../../../services/handleApiErrors';

import UserImage from '../../../UserImage';
import TextField from '../../../TextField';
import Loading from '../../../Loading';
import { Container } from './styles';
import { useState } from 'react';

export default function Edit() {
  const dispatch = useDispatch();

  const { firstName, lastName, location, occupation, twitter, linkedin, email, picturePath } = useSelector(
    (state) => state.auth.user,
  );
  const coverPath = '1711735862193_13757.jpg';

  const initialErrors = { info: [], email: [], password: [], cover: [], picture: [] };
  const [apiErrors, setApiErrors] = useState(initialErrors);

  const handleFormSubmit = async (formType, values, setSubmitting) => {
    setApiErrors(initialErrors);

    try {
      const { data } = await axios.patch('/users/update/', values);

      dispatch(actions.updateUser(data));
    } catch (e) {
      const errors = handleApiErrorMessages(e, '');

      setApiErrors((prevErrors) => ({
        ...prevErrors,
        [formType]: errors,
      }));
    }

    setSubmitting(false);
  };

  return (
    <Container>
      <div className="formGroup">
        {/* INFO */}
        <div>
          <h4>Informações</h4>
          <Formik
            onSubmit={(values, { setSubmitting }) => {
              handleFormSubmit('info', values, setSubmitting);
            }}
            initialValues={{ firstName, lastName, location, occupation, twitter, linkedin }}
            validationSchema={infoValidation.schema}
          >
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
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
                    disabled={isSubmitting}
                  />
                  <TextField
                    label="Sobrenome"
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
                  label="Cidade, Estado"
                  id="location"
                  name="location"
                  value={values.location}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.location && errors.location}
                  disabled={isSubmitting}
                />
                <TextField
                  label="Ocupação"
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

                <button
                  type={isSubmitting ? 'button' : 'submit'}
                  className={isSubmitting ? 'buttonLoading' : ''}
                  title="Criar Perfil"
                >
                  {isSubmitting ? <Loading /> : 'Salvar'}
                </button>

                {apiErrors.info.map((error, index) => (
                  <p className="error" key={index}>
                    {error}
                  </p>
                ))}
              </form>
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
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
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

                <button
                  type={isSubmitting ? 'button' : 'submit'}
                  className={isSubmitting ? 'buttonLoading' : ''}
                  title="Criar Perfil"
                >
                  {isSubmitting ? <Loading /> : 'Salvar'}
                </button>

                {apiErrors.email.map((error, index) => (
                  <p className="error" key={index}>
                    {error}
                  </p>
                ))}
              </form>
            )}
          </Formik>
        </div>
        {/* PASSWORD */}
        <div>
          <h4>Senha</h4>
          <Formik
            onSubmit={(values, { setSubmitting }) => {
              handleFormSubmit('password', values, setSubmitting);
            }}
            initialValues={passwordValidation.initialValues}
            validationSchema={passwordValidation.schema}
          >
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                <div className="doubleText">
                  <TextField
                    type="password"
                    label="Senha"
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
                    label="Confirmar"
                    id="passwordConfirm"
                    name="passwordConfirm"
                    value={values.passwordConfirm}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.passwordConfirm && errors.passwordConfirm}
                    disabled={isSubmitting}
                  />
                </div>

                <button
                  type={isSubmitting ? 'button' : 'submit'}
                  className={isSubmitting ? 'buttonLoading' : ''}
                  title="Criar Perfil"
                >
                  {isSubmitting ? <Loading /> : 'Salvar'}
                </button>

                {apiErrors.password.map((error, index) => (
                  <p className="error" key={index}>
                    {error}
                  </p>
                ))}
              </form>
            )}
          </Formik>
        </div>
      </div>
      <div className="formGroup">
        {/* COVER */}
        <div className="coverContainer">
          <h4>Capa</h4>
          <div>
            <img src={`${API_URL}images/posts/${coverPath}`} alt={coverPath} title={coverPath} />
            <Formik
              onSubmit={(values, { setSubmitting }) => {
                handleFormSubmit('cover', values, setSubmitting);
              }}
              initialValues={{ coverPath }}
              validationSchema={coverValidation.schema}
            >
              {({ values, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Arquivo"
                    id="coverPath"
                    name="coverPath"
                    value={values.coverPath}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled
                  />

                  <button
                    type={isSubmitting ? 'button' : 'submit'}
                    className={isSubmitting ? 'buttonLoading' : ''}
                    title="Procurar"
                  >
                    {isSubmitting ? <Loading /> : 'Procurar'}
                  </button>
                </form>
              )}
            </Formik>
          </div>

          {apiErrors.cover.map((error, index) => (
            <p className="error errorMarginStyle" key={index}>
              {error}
            </p>
          ))}
        </div>
        {/* PICTURE */}
        <div className="pictureContainer">
          <h4>Foto</h4>
          <div>
            <UserImage image={picturePath} userName={firstName} size={80} />
            <Formik
              onSubmit={(values, { setSubmitting }) => {
                handleFormSubmit('cover', values, setSubmitting);
              }}
              initialValues={{ picturePath }}
              validationSchema={pictureValidation.schema}
            >
              {({ values, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Arquivo"
                    id="picturePath"
                    name="picturePath"
                    value={values.picturePath}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled
                  />

                  <button
                    type={isSubmitting ? 'button' : 'submit'}
                    className={isSubmitting ? 'buttonLoading' : ''}
                    title="Procurar"
                  >
                    {isSubmitting ? <Loading /> : 'Procurar'}
                  </button>
                </form>
              )}
            </Formik>
          </div>

          {apiErrors.picture.map((error, index) => (
            <p className="error errorMarginStyle" key={index}>
              {error}
            </p>
          ))}
        </div>
      </div>
    </Container>
  );
}
