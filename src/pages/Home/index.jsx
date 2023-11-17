import Profile from '../../components/widgets/Profile';

import { Container } from './styles';

export default function Home() {
  return (
    <Container>
      <div className="controledWidth">
        <Profile />
      </div>
    </Container>
  );
}
