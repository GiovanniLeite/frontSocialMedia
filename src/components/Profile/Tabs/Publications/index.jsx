import PropTypes from 'prop-types';

import ProfileWidget from '../../../widgets/ProfileWidget';
import FriendList from '../../../widgets/FriendList';
import Posts from '../../../widgets/Posts';

import { Container } from './styles';

export default function Publications({ user, isLoggedUser }) {
  return (
    <Container>
      <div className="leftInfo">
        <ProfileWidget user={user} isLoggedUser={isLoggedUser} showInfo={false} />
        <FriendList userId={user._id} />
      </div>
      <Posts userId={user._id} />
    </Container>
  );
}

Publications.propTypes = {
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
};
