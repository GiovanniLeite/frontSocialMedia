import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Modal({ title, description, showModal, handleCloseModal, handleConfirm }) {
  if (!showModal) return <></>;

  return (
    <Container>
      <div className="content">
        <h4>{title}</h4>
        <div className="divider" />
        <p>{description}</p>
        <div className="flexBetween action">
          <button onClick={() => handleCloseModal()}>Cancelar</button>
          <button
            onClick={() => {
              handleCloseModal();
              handleConfirm();
            }}
          >
            Confirmar
          </button>
        </div>
      </div>
    </Container>
  );
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  showModal: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
};
