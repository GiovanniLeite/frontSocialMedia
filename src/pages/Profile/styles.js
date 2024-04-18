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
        gap: 0;
      }

      section {
        overflow: hidden;

        .bottomContent {
          display: none;
          grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
          gap: ${theme.spacings.medium};
          padding-top: ${theme.spacings.medium};

          &.activeContent {
            display: grid;
          }
        }
      }

      .vertAlign {
        display: flex;
        flex-direction: column;
        gap: ${theme.spacings.medium};

        @media screen and (max-width: 460px) {
          /* display: none; */
        }
      }
    }
  `}
`;
