import styled, { css } from 'styled-components';

export const Container = styled.main`
  ${({ theme }) => css`
    padding: 9.4rem 0 ${theme.spacings.medium};

    .controledWidth {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 2fr) minmax(0, 1fr);
      gap: ${theme.spacings.medium};

      @media (max-width: 1000px) {
        grid-template-columns: 1fr;
      }

      .rightSection {
        display: flex;
        flex-direction: column;
        gap: ${theme.spacings.medium};
      }
    }
  `}
`;
