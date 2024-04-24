import styled, { css } from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => css`
    border-radius: 0.7rem;
    background-color: ${theme.colors.background.alt};
    color: ${theme.colors.neutral.main};
    padding: ${theme.spacings.small};
    width: 100%;
    align-self: start;

    ul {
      li {
        display: flex;
        align-items: center;
        color: ${theme.colors.neutral.medium};

        svg {
          margin-right: ${theme.spacings.small};
          color: ${theme.colors.neutral.main};
        }
      }

      &.userNumbers {
        li + li {
          margin-top: ${theme.spacings.extraSmall};
        }

        span {
          color: ${theme.colors.neutral.main};
        }
      }
    }

    h6 {
      font-weight: 400;
      margin-bottom: ${theme.spacings.extraSmall};
    }

    a {
      color: ${theme.colors.neutral.main};
    }
  `}
`;
