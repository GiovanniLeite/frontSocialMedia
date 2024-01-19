import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { API_URL } from '../../../constants/appConfig';

import { Container } from './styles';

const mock = {
  link: 'mikacosmetics.com',
  title: 'Mika Cosmetics',
  description:
    'Your pathway to stunning and immaculate beauty and made sure your skin is exfoliating skin and shining like light.',
  imagePath: `${API_URL}images/ads/info4.jpeg`,
};

export default function AdWrapper({ ad = mock }) {
  return (
    <Container>
      <div className="flexBetween">
        <h5>Patrocinado</h5>
        <Link to="/create-ad">Create Ad</Link>
      </div>
      <a href={ad.link} title={ad.title} target="_blank" rel="noreferrer">
        <img src={ad.imagePath} alt={ad.title} />
      </a>
      <div className="flexBetween adTitle">
        <p>{ad.title}</p>
        <a href={ad.link} title={ad.title} target="_blank" rel="noreferrer">
          {ad.link}
        </a>
      </div>
      <p>{ad.description}</p>
    </Container>
  );
}

AdWrapper.propTypes = {
  ad: PropTypes.shape({
    link: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    imagePath: PropTypes.string,
  }).isRequired,
};
