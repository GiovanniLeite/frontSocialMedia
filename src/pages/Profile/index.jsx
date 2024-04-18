import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import axios from '../../services/axios';
import { handleApiErrorMessages } from '../../services/handleApiErrors';
import { USER_NOT_FOUND_ERROR } from '../../constants/errorMessages';

import ProfileMain from '../../components/widgets/Profile';
import ProfileAlternative from '../../components/widgets/ProfileAlternative';
import FriendList from '../../components/widgets/FriendList';
import Posts from '../../components/widgets/Posts';
import AdWrapper from '../../components/widgets/AdWrapper';
import Loading from '../../components/Loading';
import { Container } from './styles';

export default function Profile() {
  const { id } = useParams();
  const loggedUser = useSelector((state) => state.auth.user);
  const isLoggedUser = loggedUser._id === id;

  const [tab, setTab] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(undefined);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      setErrors([]);

      if (isLoggedUser) {
        setUser(loggedUser);
        setIsLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(`/users/${id}`);
        setUser(data);
      } catch (e) {
        const err = handleApiErrorMessages(e, USER_NOT_FOUND_ERROR);

        setErrors(err);
      }

      setIsLoading(false);
    }

    getData();
  }, [id]);

  return (
    <>
      <Helmet>
        <title>ShareFun | Perfil</title>
      </Helmet>
      <Container>
        <div className="controledWidth">
          {(isLoading && <Loading />) || (
            <>
              <section>
                <ProfileMain user={user} isLoggedUser={isLoggedUser} tab={tab} handleTabs={setTab} />
                <div className={`bottomContent ${tab === 0 ? 'activeContent' : ''}`}>
                  <div className="vertAlign">
                    <ProfileAlternative user={user} isLoggedUser={isLoggedUser} showInfo={false} />
                    <FriendList userId={user._id} />
                  </div>
                  <Posts userId={user._id} />
                </div>
                <div className={`bottomContent ${tab === 1 ? 'activeContent' : ''}`}>
                  <h2>Fotos</h2>
                </div>
                <div className={`bottomContent ${tab === 2 ? 'activeContent' : ''}`}>
                  <FriendList userId={user._id} />
                </div>
                <div className={`bottomContent ${tab === 3 ? 'activeContent' : ''}`}>
                  <h2>Notificações</h2>
                </div>
                <div className={`bottomContent ${tab === 4 ? 'activeContent' : ''}`}>
                  <h2>Editar</h2>
                </div>
              </section>
              <div className="vertAlign">
                <AdWrapper />
                <FriendList userId={user._id} />
              </div>
            </>
          )}
        </div>
      </Container>
    </>
  );
}
