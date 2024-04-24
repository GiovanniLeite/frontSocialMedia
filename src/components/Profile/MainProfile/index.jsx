import {
  MdMessage,
  MdOutlineManageAccounts,
  MdOutlineMoreHoriz,
  MdOutlinePeopleAlt,
  MdOutlinePersonRemove,
  MdOutlineSettings,
  MdPersonAddAlt,
} from 'react-icons/md';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';

import UserImage from '../../UserImage';
import { Container } from './styles';

export default function MainProfile({ user, isLoggedUser, tab, handleTabs }) {
  const { list } = useSelector((state) => state.friendList);
  // const list = [];

  const name = `${user.firstName} ${user.lastName}`;
  const coverPath = 'http://localhost:3001/images/posts/1711735862193_13757.jpg';
  const isFriend = true;

  const menuItems = [
    { id: 0, label: 'Publicações' },
    { id: 1, label: 'Fotos' },
    { id: 2, label: 'Amigos' },
    { id: 3, label: 'Notificações' },
  ];

  const [showAltMenu, setShowAltMenu] = useState(false);

  const handleMenu = async (tab) => {
    handleTabs(tab);
    setShowAltMenu(false);
  };

  useEffect(() => {
    const handleWindowResize = () => {
      // Check if the window width exceeds 480px
      // if it does, hide the alt menu in case it's open
      window.innerWidth > 480 && setShowAltMenu(false);
    };

    const debouncedResizeHandler = debounce(handleWindowResize, 300);

    window.addEventListener('resize', debouncedResizeHandler);

    // Cleanup function to remove the resize event listener
    return () => {
      window.removeEventListener('resize', debouncedResizeHandler);
    };
  }, []);

  return (
    <Container>
      <div className="profileCover">
        <img src={coverPath} alt={`${name} cover`} />
        {isLoggedUser && (
          <button className="expandingButton" onClick={() => console.log('Editar capa')}>
            <MdOutlineSettings size={20} /> <span>Editar capa</span>
          </button>
        )}
      </div>
      <div className="mainInfo">
        <UserImage image={user.picturePath} userName={name} size={150} altSize={120} breakpoint={600} />
        <div className="userInfo">
          <h5 title={name}>{name}</h5>
          <span title="Amigos">{`${user.friends.length} Amigos`}</span>
          <div className="friends">
            {list.length ? (
              list.slice(0, 5).map((friend) => (
                <Link key={friend._id} to={`/edit-profile/${friend._id}`}>
                  <UserImage
                    className="userImage"
                    image={friend.picturePath}
                    size={32}
                    userName={`${friend.firstName} ${friend.lastName}`}
                  />
                </Link>
              ))
            ) : (
              <Link to="/search-friends" className="expandingButton searchFriends">
                <MdOutlinePeopleAlt size={25} />
                <span>Encontre seus amigos</span>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="helperBtnsWrapper">
        {isLoggedUser ? (
          <button title="Editar Perfil" onClick={() => handleMenu(4)}>
            <MdOutlineManageAccounts size={20} />
            Editar
          </button>
        ) : (
          <button title={`${isFriend ? 'Remover' : 'Adicionar'} ${name}`} onClick={() => console.log('Amigo')}>
            {isFriend ? (
              <>
                <MdOutlinePersonRemove size={20} /> Remover
              </>
            ) : (
              <>
                <MdPersonAddAlt size={20} /> Adicionar
              </>
            )}
          </button>
        )}
        <button className="coloredButton" onClick={() => console.log('Mensagem')}>
          <MdMessage size={20} /> <span>Mensagem</span>
        </button>
      </div>
      <ul className="defaultMenu">
        {menuItems.map((item) => (
          <li key={item.id}>
            <button className={tab === item.id ? 'active' : ''} onClick={() => handleMenu(item.id)}>
              {item.label}
            </button>
          </li>
        ))}
        <li>
          <button className="arrowButton" onClick={() => setShowAltMenu(!showAltMenu)}>
            <MdOutlineMoreHoriz size={16} />
          </button>
        </li>
      </ul>
      <ul className={`altMenu ${showAltMenu ? 'showAltMenu' : ''}`}>
        <li>
          <button onClick={() => handleMenu(2)}>Amigos</button>
        </li>
        <li>
          <button onClick={() => handleMenu(3)}>Notificações</button>
        </li>
      </ul>
    </Container>
  );
}

MainProfile.propTypes = {
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
  isLoggedUser: PropTypes.bool.isRequired,
  tab: PropTypes.number.isRequired,
  handleTabs: PropTypes.func.isRequired,
};
