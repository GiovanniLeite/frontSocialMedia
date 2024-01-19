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
import { useEffect, useState } from 'react';

import { API_URL } from '../../../constants/appConfig';

import UserImage from '../../UserImage';
import { Container } from './styles';

export default function Profile({ user }) {
  const picturePath = user.picturePath ? `images/user-profile/${user.picturePath}` : 'assets/default-avatar.png';

  const { user: loggedUser } = useSelector((state) => state.auth);
  const [isLoggedUser, setIsLoggedUser] = useState(false);
  const [isFriend, setIsFriend] = useState(false);

  useEffect(() => {
    setIsLoggedUser(user._id === loggedUser._id);
  }, [user]);

  return (
    <Container>
      <div className="flexBetween">
        <div className="flexBetween userInfo">
          <UserImage image={`${API_URL}${picturePath}`} userName={user.firstName} />
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
          <a className="profileButton" onClick={(e) => e.preventDefault()} title={isFriend ? 'Remover' : 'Adicionar'}>
            {isFriend ? <MdOutlinePersonRemove size={20} /> : <MdPersonAddAlt size={20} />}
          </a>
        )}
      </div>
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
      <ul>
        <h6 className="socialMedia">Redes Sociais</h6>
        <li title={`Twitter de ${user.firstName}`}>
          <AiOutlineTwitter size={25} />
          <a href={`https://twitter.com/${user.twitter}`} target="_blank" rel="noreferrer">
            Twitter<span>{user.twitter || '@twitter'}</span>
          </a>
        </li>
        <li title={`Linkedin de ${user.firstName}`}>
          <AiFillLinkedin size={25} />
          <a href={`https://www.linkedin.com/in/${user.linkedin}`} target="_blank" rel="noreferrer">
            Linkedin<span>{user.linkedin || 'linked-in'}</span>
          </a>
        </li>
      </ul>
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
  }).isRequired,
};
