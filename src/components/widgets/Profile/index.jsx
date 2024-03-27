import { MdOutlineLocationOn, MdWorkOutline } from 'react-icons/md';
import { AiOutlineTwitter, AiFillLinkedin } from 'react-icons/ai';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import UserInfo from '../UserInfo';
import { Container } from './styles';

export default function Profile({ user }) {
  const loggedUser = useSelector((state) => state.auth.user);
  const isLoggedUser = loggedUser._id === user._id;
  const name = `${user.firstName} ${user.lastName}`;

  return (
    <Container>
      <UserInfo
        key={user._id}
        id={user._id}
        name={name}
        subtitle={`${user.friends.length} Amigos`}
        picturePath={user.picturePath}
        pictureSize="60px"
        isFriend={user.isFriend}
        showButton={true}
        highlightContent={true}
        isLoggedUser={isLoggedUser}
      />
      <div className="divider" />
      <ul>
        <li title={`${name} mora em ${user.location}`}>
          <MdOutlineLocationOn size={25} />
          {user.location}
        </li>
        <li title={`${name} trabalha como ${user.occupation}`}>
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
