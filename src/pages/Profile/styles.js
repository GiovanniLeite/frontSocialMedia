import styled, { css } from 'styled-components';

export const Container = styled.main`
  ${({ theme }) => css`
    padding: 9.4rem 0 ${theme.spacings.medium};
    z-index: 1;

    .controledWidth {
      display: grid;
      grid-template-columns: minmax(0, 3fr) minmax(0, 1fr);
      gap: ${theme.spacings.medium};

      @media (max-width: 1000px) {
        grid-template-columns: 1fr;
      }

      .mainSection,
      .aside {
        display: grid;
        gap: ${theme.spacings.medium};
        align-self: start;
      }

      .aside {
        grid-template-columns: repeat(1, minmax(0, 1fr));

        @media (max-width: 1000px) {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        @media (max-width: 550px) {
          grid-template-columns: repeat(1, minmax(0, 1fr));
        }
      }
    }
  `}
`;
