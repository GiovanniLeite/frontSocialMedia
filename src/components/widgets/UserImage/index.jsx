import PropTypes from 'prop-types';

import { API_URL } from '../../../constants/appConfig';

export default function UserImage({ image, size, userName }) {
  return (
    <img
      src={image ? `${API_URL}images/user-profile/${image}` : `${API_URL}assets/default-avatar.png`}
      alt={userName}
      style={{ objectFit: 'cover', borderRadius: '50%', marginRight: '1rem' }}
      width={size}
      height={size}
      title={userName}
    />
  );
}

UserImage.propTypes = {
  image: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};
