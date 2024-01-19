import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';

import ProfileWidget from '../../components/widgets/Profile';
import AdWrapper from '../../components/widgets/AdWrapper';
import FriendList from '../../components/widgets/FriendList';
import { Container } from './styles';

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
    <Container>
      <div className="controledWidth">
        <ProfileWidget user={user} />
        <section style={{ width: '100%', backgroundColor: 'red', textAlign: 'center', borderRadius: '0.7rem' }}>
          Meio
        </section>
        {!isMobile && (
          <section className="rightSection">
            <AdWrapper />
            <FriendList userId={user._id} />
          </section>
        )}
      </div>
    </Container>
  );
}
