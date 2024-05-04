import { useSelector } from 'react-redux';
import { Formik } from 'formik';

import { formValidation } from './formValidation';
import { API_URL } from '../../../../constants/appConfig';

import UserImage from '../../../UserImage';
import TextField from '../../../TextField';
import Loading from '../../../Loading';
import { Container } from './styles';

export default function Edit() {
  const {
    isLoggedIn,
    user,
    isLoading,
    errors: { update: apiErrors },
  } = useSelector((state) => state.auth);
  const coverPath = '1711735862193_13757.jpg';

  const handleFormSubmit = (values) => {
    console.log('foi');
  };

  return (
    <Container>
      <div className="formGroup">
        {/* INFO */}
        <div>
          <h4>Informações</h4>
          <Formik onSubmit={handleFormSubmit} initialValues={user} validationSchema={formValidation.schema}>
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

                <button
                  type={isLoading ? 'button' : 'submit'}
                  className={isLoading ? 'buttonLoading' : ''}
                  title="Criar Perfil"
                >
                  {isLoading ? <Loading /> : 'Salvar'}
                </button>

                {apiErrors.map((error, index) => (
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
          <Formik onSubmit={handleFormSubmit} initialValues={user} validationSchema={formValidation.schema}>
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

                <button
                  type={isLoading ? 'button' : 'submit'}
                  className={isLoading ? 'buttonLoading' : ''}
                  title="Criar Perfil"
                >
                  {isLoading ? <Loading /> : 'Salvar'}
                </button>

                {apiErrors.map((error, index) => (
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
            onSubmit={handleFormSubmit}
            initialValues={formValidation.initialValues}
            validationSchema={formValidation.schema}
          >
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
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
                    disabled={isLoading}
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
                    disabled={isLoading}
                  />
                </div>

                <button
                  type={isLoading ? 'button' : 'submit'}
                  className={isLoading ? 'buttonLoading' : ''}
                  title="Criar Perfil"
                >
                  {isLoading ? <Loading /> : 'Salvar'}
                </button>

                {apiErrors.map((error, index) => (
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
              onSubmit={handleFormSubmit}
              initialValues={{ coverPath: coverPath }}
              validationSchema={formValidation.schema}
            >
              {({ values, handleBlur, handleChange, handleSubmit }) => (
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
                    type={isLoading ? 'button' : 'submit'}
                    className={isLoading ? 'buttonLoading' : ''}
                    title="Procurar"
                  >
                    {isLoading ? <Loading /> : 'Procurar'}
                  </button>
                </form>
              )}
            </Formik>
          </div>

          {apiErrors.map((error, index) => (
            <p className="error errorMarginStyle" key={index}>
              {error}
            </p>
          ))}
        </div>
        {/* PICTURE */}
        <div className="pictureContainer">
          <h4>Foto</h4>
          <div>
            <UserImage image={user.picturePath} userName={user.firstName} size={80} />
            <Formik onSubmit={handleFormSubmit} initialValues={user} validationSchema={formValidation.schema}>
              {({ values, handleBlur, handleChange, handleSubmit }) => (
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
                    type={isLoading ? 'button' : 'submit'}
                    className={isLoading ? 'buttonLoading' : ''}
                    title="Procurar"
                  >
                    {isLoading ? <Loading /> : 'Procurar'}
                  </button>
                </form>
              )}
            </Formik>
          </div>

          {apiErrors.map((error, index) => (
            <p className="error errorMarginStyle" key={index}>
              {error}
            </p>
          ))}
        </div>
      </div>
    </Container>
  );
}
