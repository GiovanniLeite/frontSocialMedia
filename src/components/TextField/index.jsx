import PropTypes from 'prop-types';

import { Container } from './styles';

export default function TextField({ label, id, value, className = '', error, ...rest }) {
  return (
    <Container>
      <input id={id} className={`${className} ${value ? 'inputFilled' : ''} ${error ? 'inputError' : ''}`} {...rest} />
      <label htmlFor={id}>{label}</label>
      {error && <p>{error}</p>}
    </Container>
  );
}

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};
