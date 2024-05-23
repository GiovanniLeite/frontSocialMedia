import PropTypes from 'prop-types';
import { useMediaQuery } from '@react-hook/media-query';

import { API_URL } from '../../constants/appConfig';

import { Image } from './styles';

export default function UserImage({ image, userName, size, altSize, breakpoint }) {
  const screenSize = useMediaQuery(`(max-width: ${breakpoint}px)`);
  let imageSize = size;

  if (breakpoint && screenSize) {
    imageSize = screenSize && breakpoint ? altSize : size;
  }

  return (
    <Image
      src={image ? `${API_URL}images/user/${image}` : `${API_URL}assets/default-avatar.png`}
      alt={userName}
      width={imageSize}
      height={imageSize}
      title={userName}
    />
  );
}

UserImage.propTypes = {
  image: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  altSize: PropTypes.number,
  breakpoint: PropTypes.number,
};
