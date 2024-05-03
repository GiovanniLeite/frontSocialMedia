import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';

import { Container } from './styles';

export default function TextField({ label, mask, id, value, className = '', error, ...rest }) {
  const inputClassName = `${className} ${value ? 'inputFilled' : ''} ${error ? 'inputError' : ''}`;

  return (
    <Container>
      {mask ? (
        <MaskedInput mask={mask} guide={false} id={id} className={inputClassName} {...rest} />
      ) : (
        <input id={id} className={inputClassName} value={value} {...rest} />
      )}
      <label htmlFor={id}>{label}</label>
      {error && <p>{error}</p>}
    </Container>
  );
}

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  mask: PropTypes.array,
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};
