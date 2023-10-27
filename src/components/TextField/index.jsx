import PropTypes from 'prop-types';

import { Container } from './styles';

export default function TextField({ label, value, className = '', error, ...rest }) {
  return (
    <Container>
      <input className={`${className} ${value ? 'inputFilled' : ''} ${error ? 'inputError' : ''}`} {...rest} />
      <label>{label}</label>
      {error && <p>{error}</p>}
    </Container>
  );
}

TextField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};
