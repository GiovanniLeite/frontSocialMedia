import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';

import theme from './styles/theme';
import { GlobalStyles } from './styles/globalStyles';

import Header from './components/Header';
import Routers from './routes';

export default function App() {
  const { mode } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme(mode)}>
        <HelmetProvider>
          <GlobalStyles />
          <Header />
          <Routers />
        </HelmetProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
