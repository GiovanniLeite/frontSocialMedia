import styled, { css } from 'styled-components';

export const Container = styled.header`
  ${({ theme }) => css`
    position: fixed;
    width: 100%;
    background-color: ${theme.colors.background.alt};

    section {
      width: 100%;
      max-width: 120rem;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      padding: ${theme.spacings.medium};

      & > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: ${theme.spacings.medium};

        .logo {
          font-size: ${theme.font.sizes.large};
          font-weight: bold;
          color: ${theme.colors.primary.main};
        }

        form {
          background-color: ${theme.colors.neutral.light};
          color: ${theme.colors.neutral.dark};
          border-radius: 0.7rem;
          padding: 0 ${theme.spacings.small};
          display: flex;
          justify-content: space-between;
          align-items: center;

          input {
            border: none;
            max-width: 100px;
            padding: 0.7rem;
            background-color: ${theme.colors.neutral.light};
            color: ${theme.colors.neutral.dark};
          }
        }

        &.menu {
          a {
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            color: ${theme.colors.neutral.dark};
            padding: ${theme.spacings.extraSmall};
            border-radius: 50%;

            &:hover {
              background-color: ${theme.colors.neutral.light};
            }

            &.logout {
              background-color: ${theme.colors.background.alt};
            }
          }
        }
      }
    }
  `}
`;
