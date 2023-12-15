import PropTypes from 'prop-types';

export default function UserImage({ image, size = '60px', userName }) {
  return (
    <img
      src={image}
      alt={userName}
      style={{ objectFit: 'cover', borderRadius: '50%', marginRight: '1rem' }}
      width={size}
      height={size}
      title={userName}
    />
  );
}

UserImage.propTypes = {
  image: PropTypes.string,
  size: PropTypes.string,
  userName: PropTypes.string,
};
