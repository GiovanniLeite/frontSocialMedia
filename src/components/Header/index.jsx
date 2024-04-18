import { AiOutlineSearch } from 'react-icons/ai';
import {
  MdDarkMode,
  MdLightMode,
  MdMessage,
  MdNotifications,
  MdPerson,
  MdMenu,
  MdLogin,
  MdLogout,
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import { authActions as actions } from '../../redux/features/auth/slice';

import { Container } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const { user, mode } = useSelector((state) => state.auth);

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleWindowResize = () => {
      // Check if the window width exceeds 550px
      // if it does, hide the mobile menu in case it's open
      window.innerWidth > 550 && setShowMenu(false);
    };

    const debouncedResizeHandler = debounce(handleWindowResize, 300);

    window.addEventListener('resize', debouncedResizeHandler);

    // Cleanup function to remove the resize event listener
    return () => {
      window.removeEventListener('resize', debouncedResizeHandler);
    };
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    console.log('Search');
  };

  const handleMenu = async (e) => {
    e.preventDefault();

    setShowMenu(false);
  };

  const toggleThemeMode = async (e) => {
    e.preventDefault();

    dispatch(actions.toggleThemeMode());
  };

  const handleLogout = async (e) => {
    e.preventDefault();

    dispatch(actions.logout({ page: '', errorMessages: [] }));
  };

  return (
    <Container>
      <section>
        <div className="mainBar">
          <Link to="/" title="Home" className="logo">
            ShareFun
          </Link>
          <form className="mainBarSearch" onSubmit={(e) => handleSearch(e)}>
            <input type="text" placeholder="Procurar..." />
            <AiOutlineSearch size={20} />
          </form>
        </div>

        <div className="mainBar menuDesk">
          <a onClick={(e) => toggleThemeMode(e)}>
            {mode === 'light' ? <MdLightMode size={20} title="Claro" /> : <MdDarkMode size={20} title="Escuro" />}
          </a>
          <a onClick={(e) => handleMenu(e)} title="Mensagens">
            <MdMessage size={20} />
          </a>
          <a onClick={(e) => handleMenu(e)} title="Notificações">
            <MdNotifications size={20} />
          </a>
          {user ? (
            <>
              <Link to="/profile" title="Perfil">
                <MdPerson size={20} />
              </Link>
              <a className="logout" onClick={(e) => handleLogout(e)} title="Sair">
                <MdLogout size={20} />
              </a>
            </>
          ) : (
            <Link to="/login" title="Login">
              <MdLogin size={20} />
            </Link>
          )}
          <a className="buttonMenuMobile" onClick={() => setShowMenu(!showMenu)} title="Menu">
            <MdMenu size={20} />
          </a>
        </div>

        <ul className={`menuMobile ${showMenu ? 'showMenuMobile' : ''}`}>
          <li>
            <form>
              <input type="text" placeholder="Procurar..." />
              <AiOutlineSearch size={20} />
            </form>
          </li>
          <li>
            <a
              onClick={(e) => {
                toggleThemeMode(e), handleMenu(e);
              }}
            >
              {mode === 'light' ? (
                <>
                  <MdDarkMode size={20} title="Escuro" /> Escuro
                </>
              ) : (
                <>
                  <MdLightMode size={20} title="Claro" /> Claro
                </>
              )}
            </a>
          </li>
          <li>
            <a onClick={(e) => handleMenu(e)} title="Mensagens">
              <MdMessage size={20} /> Mensagens
            </a>
          </li>
          <li>
            <a onClick={(e) => handleMenu(e)} title="Notificações">
              <MdNotifications size={20} /> Notificações
            </a>
          </li>
          <li>
            {user ? (
              <Link to="/profile" title="Perfil">
                <MdPerson size={20} /> Perfil
              </Link>
            ) : (
              <Link to="/login" title="Login">
                <MdLogin size={20} /> Login
              </Link>
            )}
          </li>
          {user && (
            <li>
              <a onClick={(e) => handleLogout(e)} title="Sair">
                <MdLogout size={20} /> Sair
              </a>
            </li>
          )}
        </ul>
      </section>
    </Container>
  );
}
