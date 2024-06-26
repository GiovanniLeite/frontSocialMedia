import styled, { css } from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
    gap: ${theme.spacings.medium};

    @media (max-width: 550px) {
      grid-template-columns: 100%;
    }

    .leftInfo {
      display: flex;
      flex-direction: column;
      gap: ${theme.spacings.medium};

      @media (max-width: 550px) {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));

        section:nth-child(1) {
          height: 100%;
        }
      }

      @media (max-width: 400px) {
        grid-template-columns: repeat(1, minmax(0, 1fr));
      }
    }
  `}
`;
