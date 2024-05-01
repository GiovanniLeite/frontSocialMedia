import styled, { css } from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => css`
    border-radius: 0.7rem;
    background-color: ${theme.colors.background.alt};
    padding: ${theme.spacings.small};

    .usersCard {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: ${theme.spacings.small};
      padding-bottom: ${theme.spacings.small};

      @media screen and (max-width: 720px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      @media screen and (max-width: 550px) {
        grid-template-columns: repeat(1, minmax(0, 1fr));
      }

      .card {
        border-radius: 0.7rem;
        border: 1px solid ${theme.colors.neutral.light};
        padding: ${theme.spacings.extraSmall};
        padding-bottom: 0;
      }
    }

    .showMore {
      cursor: pointer;
      border-radius: 0.7rem;
      border: none;
      font-weight: bold;
      padding: ${theme.spacings.extraSmall} ${theme.spacings.medium};
      border: 1px solid ${theme.colors.neutral.light};
      background-color: ${theme.colors.background.alt};
      color: ${theme.colors.neutral.main};
      display: block;
      margin: 0 auto;

      &:active {
        background-color: ${theme.colors.primary.main};
        border-color: ${theme.colors.primary.main};
        color: #fff;
      }
    }
  `}
`;
