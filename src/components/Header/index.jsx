import { AiOutlineSearch } from 'react-icons/ai';
import { MdDarkMode, MdLightMode, MdMessage, MdNotifications, MdPerson, MdMenu } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { authActions } from '../../redux/features/auth/slice';

import { Container } from './styles';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.auth.mode);
  const user = useSelector((state) => state.auth.user);

  const handle = async (e) => {
    e.preventDefault();

    console.log('Hi');
  };

  const handleToggleMode = async (e) => {
    e.preventDefault();

    dispatch(authActions.toggleMode());
  };

  const handleLogout = async (e) => {
    e.preventDefault();

    dispatch(authActions.logout());
    navigate('/');
  };

  return (
    <Container>
      <section>
        <div>
          <Link to="/" title="Home" className="logo">
            ShareFun
          </Link>
          <form>
            <input type="text" placeholder="Procurar..." />
            <AiOutlineSearch size={20} />
          </form>
        </div>

        <div className="menu">
          <a onClick={(e) => handleToggleMode(e)}>
            {themeMode === 'light' ? <MdDarkMode size={20} title="Escuro" /> : <MdLightMode size={20} title="Claro" />}
          </a>
          <a onClick={(e) => handle(e)} title="Mensagens">
            <MdMessage size={20} />
          </a>
          <a onClick={(e) => handle(e)} title="Notificações">
            <MdNotifications size={20} />
          </a>
          <Link to="/profile" title="Perfil">
            <MdPerson size={20} />
          </Link>
          {user && (
            <a className="logout" onClick={(e) => handleLogout(e)} title="Sair">
              Sair
            </a>
          )}
          <a onClick={(e) => handle(e)} title="Menu">
            <MdMenu size={20} />
          </a>
        </div>
      </section>
    </Container>
  );
}
