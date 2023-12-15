import styled, { css } from 'styled-components';

export const Container = styled.main`
  ${({ theme }) => css`
    padding: 9.4rem 0 ${theme.spacings.medium};

    .controledWidth {
      display: grid;
      grid-template-columns: 1fr 3fr;
      gap: ${theme.spacings.medium};

      .errorProfile {
        color: ${theme.colors.neutral.dark};
      }

      @media (max-width: 1000px) {
        grid-template-columns: 1fr;
      }
    }
  `}
`;
