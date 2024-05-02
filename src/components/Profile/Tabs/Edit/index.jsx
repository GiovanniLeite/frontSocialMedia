import { useSelector } from 'react-redux';
import { Formik } from 'formik';

import { formValidation } from './formValidation';

import TextField from '../../../TextField';
import { Container } from './styles';
import Loading from '../../../Loading';
import FormBox from '../../../FormBox';

export default function Edit() {
  const {
    isLoggedIn,
    isLoading,
    errors: { update: apiErrors },
  } = useSelector((state) => state.auth);

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
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

              <button
                type={isLoading ? 'button' : 'submit'}
                className={isLoading ? 'buttonLoading' : ''}
                title="Criar Perfil"
              >
                {isLoading ? <Loading /> : 'Salvar'}
              </button>

              {/* {apiErrors.map((error, index) => (
                <p className="errors" key={index}>
                  {error}
                </p>
              ))} */}
            </form>
          )}
        </Formik>
      </FormBox>
    </Container>
  );
}
