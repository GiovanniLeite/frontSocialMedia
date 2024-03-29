import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdOutlineManageAccounts, MdOutlinePersonRemove, MdPersonAddAlt } from 'react-icons/md';
import { useState } from 'react';

import axios from '../../../services/axios';
import { handleApiErrorMessages } from '../../../services/handleApiErrors';

import Loading from '../../Loading';
import UserImage from '../UserImage';
import Modal from '../../Modal';
import { Container } from './styles';

export default function UserInfo({
  id,
  name,
  subtitle,
  picturePath,
  pictureSize,
  isFriend = false,
  showButton = false,
  highlightContent = false,
  isLoggedUser = false,
}) {
  const [showModal, setShowModal] = useState(false);
  const [hasFriendship, setHasFriendship] = useState(isFriend);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const toggleFriend = async () => {
    setIsLoading(true);
    let apiErrors = [];

    try {
      await axios.patch(`/users/${id}`);

      setHasFriendship(!hasFriendship);
    } catch (e) {
      apiErrors = handleApiErrorMessages(e, '');
    }

    setErrors(apiErrors);
    setIsLoading(false);
  };

  return (
    <>
      <Container>
        <div className="flexBetween">
          <div className="flexBetween userInfo">
            <Link to={`/profile/${id}`}>
              <UserImage image={picturePath} size={pictureSize} userName={name} />
            </Link>
            <div>
              <Link to={`/profile/${id}`}>
                <h5 className={highlightContent ? 'highlightContent' : ''} title={name}>
                  {name}
                </h5>
              </Link>
              <span title={subtitle}>{subtitle}</span>
            </div>
          </div>

          {showButton &&
            (isLoggedUser ? (
              <Link to={`/edit-profile/${id}`} className="userButton editButton" title="Editar perfil">
                <MdOutlineManageAccounts size={20} />
              </Link>
            ) : (
              (isLoading && <Loading />) || (
                <button
                  title={`${hasFriendship ? 'Remover' : 'Adicionar'} ${name}`}
                  className={`userButton ${hasFriendship ? 'removeFriend' : ''}`}
                  onClick={() => {
                    hasFriendship ? setShowModal(true) : toggleFriend();
                  }}
                >
                  {hasFriendship ? <MdOutlinePersonRemove size={20} /> : <MdPersonAddAlt size={20} />}
                </button>
              )
            ))}
        </div>
        {errors.map((error, index) => (
          <p key={index}>{error}</p>
        ))}
      </Container>
      {/* MODAL */}
      <Modal
        title="Desfazer Amizade"
        description={`Tem certeza de que você quer remover "${name}" da lista de amigos?`}
        showModal={showModal}
        handleCloseModal={() => setShowModal(false)}
        handleConfirm={() => toggleFriend()}
      />
    </>
  );
}

UserInfo.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  picturePath: PropTypes.string.isRequired,
  pictureSize: PropTypes.string.isRequired,
  isFriend: PropTypes.bool,
  showButton: PropTypes.bool,
  highlightContent: PropTypes.bool,
  isLoggedUser: PropTypes.bool,
};
