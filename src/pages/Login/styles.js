import styled, { css } from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => css`
    padding: 9.4rem ${theme.spacings.medium} ${theme.spacings.medium};
    background-color: ${theme.colors.background.default};

    .box {
      padding: ${theme.spacings.medium};
      margin: 0 auto;
      border-radius: 1.5rem;
      background-color: ${theme.colors.background.alt};
      width: 100%;
      max-width: 60rem;

      h5 {
        color: ${theme.colors.neutral.dark};
        font-weight: 500;
        margin-bottom: 1.5rem;
      }

      form {
        display: grid;
        gap: ${theme.spacings.small};
      }

      button {
        cursor: pointer;
        background-color: ${theme.colors.primary.main};
        padding: 1.3rem;
        border: none;
        border-radius: 0.5rem;
        color: #fff;

        &:hover {
          background-color: ${theme.colors.primary.light};
        }
      }

      a {
        color: ${theme.colors.primary.main};
        text-decoration: underline;
        margin-top: ${theme.spacings.small};

        &:hover {
          color: ${theme.colors.primary.light};
        }
      }
    }
  `}
`;
