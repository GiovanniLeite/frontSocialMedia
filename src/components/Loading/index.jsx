import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Loading({ isLoading = true, size = '37px' }) {
  if (!isLoading) return <></>;

  return (
    <Container>
      <div className="loading" style={{ width: size, height: size }} />
    </Container>
  );
}

Loading.propTypes = {
  isLoading: PropTypes.bool,
  size: PropTypes.string,
};
