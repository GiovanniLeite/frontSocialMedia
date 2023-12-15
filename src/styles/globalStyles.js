import { createGlobalStyle, css } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  ${({ theme }) => css`
    * {
      margin: 0;
      padding: 0;
      outline: none;
      box-sizing: border-box;
    }

    html {
      font-size: 62.5%;
      scroll-behavior: smooth;
    }

    body {
      font-family: ${theme.font.fontFamily};
      font-size: ${theme.font.sizes.small};

      main {
        padding: 9.4rem ${theme.spacings.medium} ${theme.spacings.medium};
        background-color: ${theme.colors.background.default};
        min-height: 100vh;
      }

      h1 {
        font-size: 4rem;
      }

      h2 {
        font-size: 3.2rem;
      }

      h3 {
        font-size: 2.4rem;
      }

      h4 {
        font-size: 2rem;
      }

      h5 {
        font-size: 1.6rem;
      }

      h6 {
        font-size: 1.4rem;
      }

      a {
        text-decoration: none;
      }

      .flexBetween {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .controledWidth {
        max-width: 120rem;
        margin: 0 auto;

        @media screen and (max-width: 1250px) {
          padding: 0 ${theme.spacings.medium} ${theme.spacings.medium};
        }
      }
    }
  `}
`;
