import { Link } from 'react-router-dom';

import { API_URL } from '../../../constants/appConfig';

import { Container } from './styles';

export default function AdWrapper() {
  return (
    <Container>
      <div className="flexBetween">
        <h5>Patrocinado</h5>
        <Link to="/" title="Perfil">
          Create Ad
        </Link>
      </div>
      <img src={`${API_URL}images/ads/info4.jpeg`} alt="advert" />
      <div className="flexBetween">
        <p>MikaCosmetics</p>
        <p>mikacosmetics.com</p>
      </div>
      <p>
        Your pathway to stunning and immaculate beauty and made sure your skin is exfoliating skin and shining like
        light.
      </p>
    </Container>
  );
}
