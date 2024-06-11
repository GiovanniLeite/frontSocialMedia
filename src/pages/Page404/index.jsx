import { Helmet } from 'react-helmet-async';

import { Container } from './styles';

export default function Page404() {
  return (
    <>
      <Helmet>
        <title>ShareFun | Error 404</title>
      </Helmet>
      <Container>404</Container>
    </>
  );
}
