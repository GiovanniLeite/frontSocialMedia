import { MdOutlineLocationOn, MdOutlineManageAccounts, MdWorkOutline } from 'react-icons/md';
import { AiOutlineTwitter, AiFillLinkedin } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import UserImage from '../UserImage';
import { Container } from './styles';

export default function Profile() {
  const user = {
    _id: 5,
    firstName: 'Giovanni',
    lastName: 'Leite',
    location: 'Sorocaba, SP',
    occupation: 'Full Stack Developer',
    viewedProfile: 380,
    impressions: 400,
    friends: ['Friend 1', 'Friend 2', 'Friend 3', 'Friend 4', 'Friend 5', 'Friend 6', 'Friend 7'],
    twitterX: 'GiovanniLe17401',
    linkedin: 'giovanni-leite-dev',
    picturePath: '../assets/p2.jpeg',
  };

  return (
    <Container>
      <div className="flexBetween">
        <div className="flexBetween">
          <UserImage image={user.picturePath} userName={user.firstName} />
          <div>
            <Link to={`/profile/${user._id}`} title="Perfil">
              <h4>
                {user.firstName} {user.lastName}
              </h4>
            </Link>
            <span>{user.friends.length} Amigos</span>
          </div>
        </div>
        <Link to={`/edit-profile/${user._id}`} className="editProfile" title="Editar perfil">
          <MdOutlineManageAccounts size={20} />
        </Link>
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
          <a href={`https://twitter.com/${user.twitterX}`} target="_blank" rel="noreferrer">
            Twitter<span>{user.twitterX}</span>
          </a>
        </li>
        <li title={`Linkedin de ${user.firstName}`}>
          <AiFillLinkedin size={25} />
          <a href={`https://www.linkedin.com/in/${user.linkedin}`} target="_blank" rel="noreferrer">
            Linkedin<span>{user.linkedin}</span>
          </a>
        </li>
      </ul>
    </Container>
  );
}
