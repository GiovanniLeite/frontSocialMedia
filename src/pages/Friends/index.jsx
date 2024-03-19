import { Helmet } from 'react-helmet-async';

import { Container } from './styles';

export default function Friends() {
  return (
    <>
      <Helmet>
        <title>ShareFun | Amigos</title>
      </Helmet>
      <Container>Amigos</Container>
    </>
  );
}
