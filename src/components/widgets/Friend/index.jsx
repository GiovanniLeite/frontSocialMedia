import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdOutlinePersonRemove, MdPersonAddAlt } from 'react-icons/md';
import { useState } from 'react';

import axios from '../../../services/axios';
import { handleApiErrorMessages } from '../../../services/handleApiErrors';

import Loading from '../../Loading';
import UserImage from '../UserImage';
import { Container } from './styles';

export default function Friend({ id, name, subtitle, picturePath, isFriend = false, showFriendshipButton = false }) {
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
    <Container>
      <div className="flexBetween">
        <div className="flexBetween userInfo">
          <Link to={`/profile/${id}`}>
            <UserImage image={picturePath} size="40px" userName={name} />
          </Link>
          <div>
            <Link to={`/profile/${id}`}>
              <h5 title={name}>{name}</h5>
            </Link>
            <span title={subtitle}>{subtitle}</span>
          </div>
        </div>
        {showFriendshipButton &&
          ((isLoading && <Loading />) || (
            <button
              className={hasFriendship ? 'removeFriend' : ''}
              onClick={() => toggleFriend()}
              title={`${hasFriendship ? 'Remover' : 'Adicionar'} ${name}`}
            >
              {hasFriendship ? <MdOutlinePersonRemove size={20} /> : <MdPersonAddAlt size={20} />}
            </button>
          ))}
      </div>
      {errors.map((error, index) => (
        <p key={index}>{error}</p>
      ))}
    </Container>
  );
}

Friend.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  picturePath: PropTypes.string.isRequired,
  isFriend: PropTypes.bool,
  showFriendshipButton: PropTypes.bool,
};
