import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import axios from '../../services/axios';
import { handleApiErrorMessages } from '../../services/handleApiErrors';
import { USER_NOT_FOUND_ERROR } from '../../constants/errorMessages';

import Loading from '../../components/Loading';
import MainProfile from '../../components/Profile/MainProfile';
import Publications from '../../components/Profile/Tabs/Publications';
import Pictures from '../../components/Profile/Tabs/Pictures';
import Friends from '../../components/Profile/Tabs/Friends';
import Notifications from '../../components/Profile/Tabs/Notifications';
import Edit from '../../components/Profile/Tabs/Edit';
import AdWrapper from '../../components/widgets/AdWrapper';
import FriendList from '../../components/widgets/FriendList';

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

  const renderTab = () => {
    switch (tab) {
      case 0:
        return <Publications user={user} isLoggedUser={isLoggedUser} />;
      case 1:
        return <Pictures />;
      case 2:
        return <Friends />;
      case 3:
        return <Notifications />;
      case 4:
        return <Edit />;
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>ShareFun | Perfil</title>
      </Helmet>
      <Container>
        <div className="controledWidth">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {/* Main section */}
              <section className="mainSection">
                <MainProfile user={user} isLoggedUser={isLoggedUser} tab={tab} handleTabs={setTab} />
                {renderTab()}
              </section>

              {/* Sidebar section */}
              <section className="aside">
                <AdWrapper />
                <FriendList userId={user._id} />
              </section>
            </>
          )}
        </div>
      </Container>
    </>
  );
}
