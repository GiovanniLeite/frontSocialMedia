import styled, { css } from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => css`
    border-radius: 0.7rem;
    background-color: ${theme.colors.background.alt};
    color: ${theme.colors.neutral.medium};
    padding: ${theme.spacings.small};

    h5 {
      color: ${theme.colors.neutral.dark};
      font-weight: 500;
    }

    a {
      color: ${theme.colors.neutral.medium};

      &:hover {
        color: ${theme.colors.primary.main};
      }

      img {
        width: 100%;
        border-radius: 0.75rem;
        margin: 0.75rem 0;
      }
    }

    .adTitle {
      padding-bottom: ${theme.spacings.small};

      p:first-child {
        color: ${theme.colors.neutral.dark};
      }
    }
  `}
`;
