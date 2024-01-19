import styled, { css } from 'styled-components';

export const Container = styled.main`
  ${({ theme }) => css`
    padding: 9.4rem 0 ${theme.spacings.medium};

    .controledWidth {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 3fr);
      gap: ${theme.spacings.medium};

      @media (max-width: 1000px) {
        grid-template-columns: 1fr;
      }

      .errorProfile {
        color: ${theme.colors.neutral.dark};
      }

      & > div {
        display: flex;
        flex-direction: column;
        gap: ${theme.spacings.medium};
      }
    }
  `}
`;
