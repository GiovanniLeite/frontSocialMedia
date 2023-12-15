import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Loading({ isLoading = true }) {
  if (!isLoading) return <></>;

  return (
    <Container>
      <div className="loading" />
    </Container>
  );
}

Loading.propTypes = {
  isLoading: PropTypes.bool,
};
