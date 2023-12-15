import styled, { css } from 'styled-components';

export const Container = styled.header`
  ${({ theme }) => css`
    position: fixed;
    width: 100%;
    background-color: ${theme.colors.background.alt};
    z-index: 1;

    section {
      width: 100%;
      max-width: 120rem;
      background-color: ${theme.colors.background.alt};
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      padding: ${theme.spacings.medium} 0;
      z-index: 1;

      @media screen and (max-width: 1250px) {
        padding: ${theme.spacings.medium};
      }

      form {
        background-color: ${theme.colors.neutral.light};
        color: ${theme.colors.neutral.dark};
        border-radius: 0.7rem;
        padding: 0 ${theme.spacings.small};
        display: flex;
        justify-content: space-between;
        align-items: center;

        @media screen and (max-width: 550px) {
          &.mainBarSearch {
            display: none;
          }
        }

        input {
          border: none;
          max-width: 100px;
          padding: 0.7rem;
          background-color: ${theme.colors.neutral.light};
          color: ${theme.colors.neutral.dark};
        }
      }

      a {
        cursor: pointer;
        display: flex;
        align-items: center;
        color: ${theme.colors.neutral.dark};
        padding: ${theme.spacings.extraSmall};

        &:hover:not(.logo) {
          background-color: ${theme.colors.neutral.light};
        }
      }

      .mainBar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: ${theme.spacings.medium};

        .logo {
          font-size: ${theme.font.sizes.large};
          font-weight: bold;
          color: ${theme.colors.primary.main};
          padding: ${theme.spacings.extraSmall} 0;

          &:hover {
            color: ${theme.colors.primary.medium};
          }
        }

        &.menuDesk {
          a {
            border-radius: 50%;

            &.buttonMenuMobile {
              display: none;
            }

            @media screen and (max-width: 550px) {
              display: none;

              &.buttonMenuMobile {
                display: flex;
              }
            }
          }
        }
      }

      .menuMobile {
        position: fixed;
        border-radius: 0.75rem;
        background-color: ${theme.colors.background.alt};
        top: -21rem;
        right: 0.6rem;
        padding: ${theme.spacings.extraSmall};
        padding-bottom: 0;
        list-style: none;
        transition: 0.3s;
        z-index: -1;

        &.showMenuMobile {
          top: 7.6rem;
        }

        li {
          margin-bottom: ${theme.spacings.extraSmall};

          a {
            border-radius: 0.75rem;
            gap: ${theme.spacings.small};
          }
        }
      }
    }
  `}
`;
