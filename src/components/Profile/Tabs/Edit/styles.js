import styled, { css } from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => css`
    padding: ${theme.spacings.medium};
    background-color: ${theme.colors.background.alt};
    border-radius: 0.7rem;
    display: grid;
    gap: ${theme.spacings.medium};

    h4 {
      color: ${theme.colors.neutral.dark};
      font-weight: 500;
      margin-bottom: ${theme.spacings.small};
    }

    button {
      background-color: ${theme.colors.primary.main};
      padding: 1.3rem;
      border: none;
      border-radius: 0.5rem;
      color: #fff;

      &:hover:not(.buttonLoading) {
        cursor: pointer;
        background-color: ${theme.colors.primary.mediumMain};
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

    .coverDiv {
      img {
        border-radius: 0.7rem;
        width: 100%;
        margin-bottom: ${theme.spacings.small};
      }

      form {
      }
    }

    .pictureDiv {
      display: flex;
      align-items: center;

      form {
        display: flex;
        align-items: center;
        gap: ${theme.spacings.small};
      }
    }
  `}
`;
