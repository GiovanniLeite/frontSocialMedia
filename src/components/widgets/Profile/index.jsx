import {
  MdOutlineLocationOn,
  MdOutlineManageAccounts,
  MdWorkOutline,
  MdOutlinePersonRemove,
  MdPersonAddAlt,
} from 'react-icons/md';
import { AiOutlineTwitter, AiFillLinkedin } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import axios from '../../../services/axios';
import { handleApiErrorMessages } from '../../../services/handleApiErrors';

import UserImage from '../UserImage';
import Loading from '../../Loading';
import { Container } from './styles';

export default function Profile({ user }) {
  const loggedUser = useSelector((state) => state.auth.user);
  const isLoggedUser = loggedUser._id === user._id;

  const [hasFriendship, setHasFriendship] = useState(user.isFriend);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const toggleFriend = async () => {
    setIsLoading(true);
    let apiErrors = [];

    try {
      await axios.patch(`/users/${user._id}`);

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
          <UserImage image={user.picturePath} userName={user.firstName} />
          <div>
            <Link to={`/profile/${user._id}`} title={`${user.firstName} ${user.lastName}`}>
              <h4>
                {user.firstName} {user.lastName}
              </h4>
            </Link>
            <span>{user.friends.length} Amigos</span>
          </div>
        </div>
        {isLoggedUser ? (
          <Link to={`/edit-profile/${user._id}`} className="profileButton" title="Editar perfil">
            <MdOutlineManageAccounts size={20} />
          </Link>
        ) : (
          (isLoading && <Loading />) || (
            <a className="profileButton" onClick={() => toggleFriend()}>
              {hasFriendship ? <MdOutlinePersonRemove size={20} /> : <MdPersonAddAlt size={20} />}
            </a>
          )
        )}
      </div>
      {errors.map((error, index) => (
        <p key={index}>{error}</p>
      ))}
      <div className="divider" />
      <ul>
        <li title={`${user.firstName} mora em ${user.location}`}>
          <MdOutlineLocationOn size={25} />
          {user.location}
        </li>
        <li title={`${user.firstName} trabalha como ${user.occupation}`}>
          <MdWorkOutline size={25} /> {user.occupation}
        </li>
      </ul>
      <div className="divider" />
      <ul className="userNumbers">
        <li className="flexBetween" title="Quantas pessoas viram seu perfil">
          Quem viu o seu perfil <span>{user.viewedProfile}</span>
        </li>
        <li className="flexBetween" title="Quantas pessoas viram seus posts">
          Impressões dos seus posts <span>{user.impressions}</span>
        </li>
      </ul>
      <div className="divider" />
      <h6>Redes Sociais</h6>
      <a href={user.twitter} target="_blank" rel="noreferrer">
        <AiOutlineTwitter size={25} />
      </a>
      <a href={user.linkedin} target="_blank" rel="noreferrer">
        <AiFillLinkedin size={25} />
      </a>
    </Container>
  );
}

Profile.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    picturePath: PropTypes.string,
    friends: PropTypes.array,
    location: PropTypes.string,
    occupation: PropTypes.string,
    viewedProfile: PropTypes.number,
    impressions: PropTypes.number,
    twitter: PropTypes.string,
    linkedin: PropTypes.string,
    isFriend: PropTypes.bool,
  }).isRequired,
};
