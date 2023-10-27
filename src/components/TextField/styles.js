import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    position: relative;

    label {
      position: absolute;
      top: 1.4rem;
      left: 1.4rem;
      transition: 0.3s ease-in-out;
      border-radius: 0.3rem;
      background-color: ${theme.colors.background.alt};
      color: ${theme.colors.neutral.mediumMain};
      padding: 0 ${theme.spacings.extraSmall};
    }

    input {
      width: 100%;
      padding: 1.3rem;
      border: 1px solid ${theme.colors.neutral.light};
      border-radius: 0.5rem;
      background-color: ${theme.colors.background.alt};
      color: ${theme.colors.neutral.main};

      &:hover {
        border-color: ${theme.colors.neutral.medium};
      }

      &:focus {
        border-color: ${theme.colors.primary.main};

        + label {
          color: ${theme.colors.primary.main};
          top: -0.7rem;
        }
      }

      &.inputFilled {
        + label {
          top: -0.7rem;
        }
      }

      &.inputError {
        border-color: #ff6b6b;

        + label {
          color: #ff6b6b;
        }
      }
    }

    p {
      color: #ff6b6b;
      padding: ${theme.spacings.extraSmall} 0 0 ${theme.spacings.extraSmall};
    }
  `}
`;
