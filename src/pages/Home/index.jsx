import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { Helmet } from 'react-helmet-async';

import ProfileWidget from '../../components/widgets/Profile';
import AdWrapper from '../../components/widgets/AdWrapper';
import FriendList from '../../components/widgets/FriendList';
import { Container } from './styles';
import Posts from '../../components/widgets/Posts';

export default function Home() {
  const { user } = useSelector((state) => state.auth);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleWindowResize = () => {
      // Check if the window object is available
      if (typeof window !== 'undefined') setIsMobile(window.innerWidth < 1000);
    };

    // Add the resize event listener using the debounced handler
    const debouncedResizeHandler = debounce(handleWindowResize, 250);
    window.addEventListener('resize', debouncedResizeHandler);

    // Call the handleWindowResize function once initially
    handleWindowResize();

    // Cleanup function to remove the resize event listener
    return () => {
      window.removeEventListener('resize', debouncedResizeHandler);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>ShareFun | Home </title>
      </Helmet>
      <Container>
        <div className="controledWidth">
          <ProfileWidget user={user} />
          <Posts />
          {!isMobile && (
            <section className="rightSection">
              <AdWrapper />
              <FriendList userId={user._id} />
            </section>
          )}
        </div>
      </Container>
    </>
  );
}
