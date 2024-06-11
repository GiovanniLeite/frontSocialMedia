import { useSelector } from 'react-redux';

import usePagination from '../../../../hooks/usePagination';

import UserInfo from '../../../UserInfo';
import Loading from '../../../Loading';
import { Container } from './styles';

export default function Friends() {
  const loggedUser = useSelector((state) => state.auth.user);
  const { isLoading, errors, list } = useSelector((state) => state.friendList);

  // Number of Items to Load - handleLoadMore()
  const numberOfItemsToLoad = 6;

  const { allItemsLength, currentItems, handleLoadMore } = usePagination({
    items: list,
    maxItemsAllowed: numberOfItemsToLoad,
  });

  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
          <div className="usersCard">
            {currentItems.map((friend) => (
              <div className="card" key={friend._id}>
                <UserInfo
                  id={friend._id}
                  name={`${friend.firstName} ${friend.lastName}`}
                  largeName={true}
                  subtitle={friend.occupation}
                  picturePath={friend.picturePath}
                  pictureSize={70}
                  isFriend={friend.isFriend}
                  showButton={friend._id === loggedUser._id ? false : true}
                />
              </div>
            ))}
          </div>
          {currentItems.length < allItemsLength && (
            <button className="showMore" onClick={() => handleLoadMore(numberOfItemsToLoad)}>
              Show more
            </button>
          )}
        </>
      )}
    </Container>
  );
}
