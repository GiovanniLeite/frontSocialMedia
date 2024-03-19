import { Helmet } from 'react-helmet-async';

import { Container } from './styles';

export default function EditProfile() {
  return (
    <>
      <Helmet>
        <title>ShareFun | Editar Perfil</title>
      </Helmet>
      <Container>Editar Perfil</Container>
    </>
  );
}
