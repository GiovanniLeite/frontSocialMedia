import Profile from '../../components/Profile';

import { Container } from './styles';

export default function Home() {
  return (
    <Container>
      <div className="controledWidth">
        <Profile />
        <Profile />
        <Profile />
      </div>
    </Container>
  );
}
