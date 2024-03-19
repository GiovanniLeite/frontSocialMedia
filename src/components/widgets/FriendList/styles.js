import styled, { css } from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => css`
    border-radius: 0.7rem;
    background-color: ${theme.colors.background.alt};
    padding: ${theme.spacings.small};

    .title {
      margin-bottom: ${theme.spacings.small};

      h4 {
        font-weight: 600;
        color: ${theme.colors.neutral.dark};
      }

      a {
        color: ${theme.colors.neutral.mediumMain};

        &:hover {
          opacity: 0.8;
        }
      }
    }

    & > p {
      color: ${theme.colors.neutral.dark};
    }
  `}
`;
