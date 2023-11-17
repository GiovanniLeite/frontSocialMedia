import styled, { css } from 'styled-components';

export const Container = styled.main`
  ${({ theme }) => css`
    padding: 9.4rem 0 ${theme.spacings.medium};

    .controledWidth {
      display: flex;
      justify-content: space-between;
      gap: ${theme.spacings.medium};

      section:nth-child(2) {
        flex: 2;
      }

      @media (max-width: 1000px) {
        flex-direction: column;

        section:nth-child(3) {
          order: 2;
        }
      }
    }
  `}
`;
