import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { friendListActions as actions } from '../../../redux/features/friendList/slice';

import UserInfo from '../../UserInfo';
import Loading from '../../Loading';
import { Container } from './styles';

export default function FriendList({ userId, length = 6 }) {
  const dispatch = useDispatch();

  const { isLoading, errors, list } = useSelector((state) => state.friendList);

  useEffect(() => {
    dispatch(actions.getFriendList(userId));
  }, [userId]);

  return (
    <Container>
      <div className="flexBetween title">
        <h4>Amigos</h4>
        {list.length >= length && <Link to={`/friends/${userId}`}>Ver todos</Link>}
      </div>
      {(isLoading && <Loading />) || errors.map((error, index) => <p key={index}>{error}</p>)}
      {isLoading ||
        list
          .slice(0, length)
          .map((friend) => (
            <UserInfo
              key={friend._id}
              id={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              picturePath={friend.picturePath}
              pictureSize={40}
              isFriend={friend.isFriend}
              showButton={true}
            />
          ))}
    </Container>
  );
}

FriendList.propTypes = {
  userId: PropTypes.string.isRequired,
  length: PropTypes.number,
};
