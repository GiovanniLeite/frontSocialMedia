import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';

import axios from '../../services/axios';
import { handleApiErrorMessages } from '../../services/handleApiErrors';
import { USER_NOT_FOUND_ERROR } from '../../constants/errorMessages';

import Loading from '../../components/Loading';
import ProfileWidget from '../../components/widgets/Profile';
import FriendList from '../../components/widgets/FriendList';
import Posts from '../../components/widgets/Posts';
import { Container } from './styles';

export default function Profile() {
  const { id } = useParams();
  const loggedUser = useSelector((state) => state.auth.user);

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(undefined);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      setErrors([]);

      if (id === loggedUser._id) {
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
        <title>ShareFun | {`${loggedUser.firstName} ${loggedUser.lastName}`}</title>
      </Helmet>
      <Container>
        <div className="controledWidth">
          {errors.map((error, index) => (
            <p className="errorProfile" key={index}>
              {error}
            </p>
          ))}
          {(isLoading && <Loading />) || (
            <>
              <div>
                <ProfileWidget user={user} />
                <FriendList userId={user._id} />
              </div>
              <Posts userId={user._id} />
            </>
          )}
        </div>
      </Container>
    </>
  );
}
