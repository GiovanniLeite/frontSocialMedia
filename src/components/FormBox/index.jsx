import PropTypes from 'prop-types';

import { Container } from './styles';

export default function FormBox({ children }) {
  return (
    <Container>
      <h5>Bem vindo à ShareFun, a Rede Social que transforma conexões!</h5>
      {children}
    </Container>
  );
}

FormBox.propTypes = {
  children: PropTypes.node.isRequired,
};
