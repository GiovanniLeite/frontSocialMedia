import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { friendListActions as actions } from '../../../redux/features/friendList/slice';

import Friend from '../../Friend';
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
      <h4>Amigos</h4>
      {(isLoading && <Loading />) || errors.map((error, index) => <p key={index}>{error}</p>)}
      {isLoading ||
        list
          .slice(0, length)
          .map((friend) => (
            <Friend
              key={friend._id}
              id={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              picturePath={friend.picturePath}
              isFriend={friend.isFriend}
            />
          ))}
    </Container>
  );
}

FriendList.propTypes = {
  userId: PropTypes.string.isRequired,
  length: PropTypes.number,
};
