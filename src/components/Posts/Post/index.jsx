import PropTypes from 'prop-types';
import { BsShare } from 'react-icons/bs';
import { MdOutlineFavoriteBorder, MdOutlineFavorite, MdOutlineChatBubbleOutline } from 'react-icons/md';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { postListActions as actions } from '../../../redux/features/postList/slice';
import { API_URL } from '../../../constants/appConfig';

import UserInfo from '../../UserInfo';
import { Container } from './styles';

export default function Post({ post }) {
  const dispatch = useDispatch();

  const {
    _id,
    description,
    picturePath,
    likes,
    comments,
    //
    userId,
    firstName,
    lastName,
    location,
    userPicturePath,
  } = post;
  const { _id: loggedInUserId } = useSelector((state) => state.auth.user);

  const likeCount = Object.keys(likes).length;
  const isLiked = Boolean(likes[loggedInUserId]);
  const [showComments, setShowComments] = useState(false);

  const handleLike = async () => {
    dispatch(actions.toggleLike({ postId: _id }));
  };

  return (
    <Container>
      <UserInfo
        key={userId}
        id={userId}
        name={`${firstName} ${lastName}`}
        subtitle={location}
        picturePath={userPicturePath}
        pictureSize={40}
      />
      <p>{description}</p>
      {picturePath && <img className="postImage" src={`${API_URL}images/posts/${picturePath}`} alt="post" />}
      <div className="flexBetween actions">
        <div className="flexBetween likeComment">
          <div className="flexBetween">
            <button onClick={handleLike} title="Likes">
              {isLiked ? <MdOutlineFavorite size={20} /> : <MdOutlineFavoriteBorder size={20} />}
            </button>
            <span>{likeCount}</span>
          </div>
          <div className="flexBetween">
            <button onClick={() => setShowComments(!showComments)} title="Comment">
              <MdOutlineChatBubbleOutline size={20} />
            </button>
            <span>{comments.length}</span>
          </div>
        </div>

        <button className="share" title="Share">
          <BsShare size={20} />
        </button>
      </div>
      {showComments && (
        <div className="comments">
          {comments.map((comment, index) => (
            <div key={index}>
              <p>{comment}</p>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string,
    description: PropTypes.string,
    picturePath: PropTypes.string,
    likes: PropTypes.objectOf(PropTypes.bool),
    comments: PropTypes.arrayOf(PropTypes.string),
    //
    userId: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    location: PropTypes.string,
    userPicturePath: PropTypes.string,
    isFriend: PropTypes.bool,
  }).isRequired,
};
