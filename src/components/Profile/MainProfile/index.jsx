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

import { API_URL } from '../../../constants/appConfig';
import UserImage from '../../UserImage';
import { Container } from './styles';

export default function MainProfile({ user, isLoggedUser, tab, handleTabs }) {
  const { list } = useSelector((state) => state.friendList);

  const name = `${user.firstName} ${user.lastName}`;
  const isFriend = user.isFriend;

  const menuItems = [
    { id: 0, label: 'Publications' },
    { id: 1, label: 'Pictures' },
    { id: 2, label: 'Friends' },
    { id: 3, label: 'Notifications' },
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
        <img
          src={`${API_URL}${user.coverPath ? `images/user/${user.coverPath}` : `assets/default-cover.jpg`}`}
          alt={`${name} cover`}
        />
        {isLoggedUser && (
          <button className="expandingButton" onClick={() => console.log('Edit')}>
            <MdOutlineSettings size={20} /> <span>Edit cover</span>
          </button>
        )}
      </div>
      <div className="mainInfo">
        <UserImage image={user.picturePath} userName={name} size={150} altSize={120} breakpoint={600} />
        <div className="userInfo">
          <h5 title={name}>{name}</h5>
          <span title="Friends">{`${user.friends.length} Friends`}</span>
          <div className="friends">
            {list.length ? (
              list.slice(0, 5).map((friend) => (
                <Link key={friend._id} to={`/profile/${friend._id}`}>
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
                <span>Find your friends</span>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="helperBtnsWrapper">
        {isLoggedUser ? (
          <button title="Edit profile" onClick={() => handleMenu(4)}>
            <MdOutlineManageAccounts size={20} />
            Edit
          </button>
        ) : (
          <button title={`${isFriend ? 'Remove' : 'Add'} ${name}`} onClick={() => console.log('Friend')}>
            {isFriend ? (
              <>
                <MdOutlinePersonRemove size={20} /> Remove
              </>
            ) : (
              <>
                <MdPersonAddAlt size={20} /> Add
              </>
            )}
          </button>
        )}
        <button className="coloredButton" onClick={() => console.log('Message')}>
          <MdMessage size={20} /> <span>Message</span>
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
          <button onClick={() => handleMenu(2)}>Friends</button>
        </li>
        <li>
          <button onClick={() => handleMenu(3)}>Notifications</button>
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
    coverPath: PropTypes.string,
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
