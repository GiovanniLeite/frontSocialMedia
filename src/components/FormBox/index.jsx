import PropTypes from 'prop-types';

import { Container } from './styles';

export default function FormBox({ children }) {
  return (
    <Container>
      <h5>Welcome to ShareFun, the Social Network that transforms connections!</h5>
      {children}
    </Container>
  );
}

FormBox.propTypes = {
  children: PropTypes.node.isRequired,
};
