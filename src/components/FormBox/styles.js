import styled, { css } from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => css`
    padding: ${theme.spacings.medium};
    margin: 0 auto;
    border-radius: 1.5rem;
    background-color: ${theme.colors.background.alt};
    width: 100%;
    max-width: 45rem;

    h5 {
      color: ${theme.colors.neutral.dark};
      font-weight: 500;
      margin-bottom: 1.5rem;

      @media screen and (max-width: 380px) {
        font-size: 1.4rem;
      }
    }

    form {
      display: grid;
      gap: ${theme.spacings.small};

      .doubleText {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: ${theme.spacings.small};
      }
    }

    button {
      background-color: ${theme.colors.primary.main};
      padding: 1.3rem;
      border: none;
      border-radius: 0.5rem;
      color: #fff;

      &:hover:not(.buttonLoading) {
        cursor: pointer;
        background-color: ${theme.colors.primary.light};
      }

      &.buttonLoading {
        padding: 0.3rem;
      }
    }

    .errors {
      color: ${theme.colors.error};
      padding: ${theme.spacings.extraSmall} 0 0 ${theme.spacings.extraSmall};
      margin-top: -${theme.spacings.small};
    }

    a {
      color: ${theme.colors.primary.main};
      text-decoration: underline;
      margin-top: ${theme.spacings.small};

      &:hover:not(.passwordRecover) {
        color: ${theme.colors.primary.light};
      }

      &.passwordRecover {
        margin-top: 0;
        color: ${theme.colors.error};

        &:hover {
          opacity: 0.9;
        }
      }
    }
  `}
`;
