import styled, { css } from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => css`
    border-radius: 0.7rem;
    background-color: ${theme.colors.background.alt};
    z-index: 1;
    position: relative;
    overflow: hidden;
    align-self: start;

    button {
      cursor: pointer;
      border: none;
      background-color: rgba(0, 0, 0, 0);
    }

    .expandingButton {
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: width 0.5s ease;

      span {
        display: none;
        overflow: hidden;
        white-space: nowrap;
      }

      &:hover {
        span {
          display: block;
        }
      }

      &:active {
        background-color: ${theme.colors.primary.main};
        color: #fff;
      }
    }

    .profileCover {
      position: relative;

      z-index: 2;

      img {
        width: 100%;
        vertical-align: middle;

        @media screen and (max-width: 600px) {
          width: 122%;
          margin-left: -11%;
        }
      }

      button {
        background-color: ${theme.colors.background.alt};
        border-radius: 0.7rem;
        color: ${theme.colors.neutral.main};
        padding: ${theme.spacings.extraSmall};
        width: 3rem;
        position: absolute;
        right: ${theme.spacings.small};
        top: ${theme.spacings.small};
        z-index: 9;

        &.expandingButton:hover {
          width: 10rem;
        }
      }
    }

    .mainInfo {
      display: flex;
      align-items: center;
      margin: -4rem ${theme.spacings.small} ${theme.spacings.medium};

      @media screen and (max-width: 720px) {
        flex-direction: column;
        margin: -8rem auto 0;
      }

      & > img {
        border: 2px solid ${theme.colors.background.alt};
        z-index: 2;

        @media screen and (max-width: 720px) {
          margin: 0;
        }
      }

      .userInfo {
        max-width: 100%;

        h5 {
          font-size: 3rem;
          color: ${theme.colors.neutral.dark};
          font-weight: 500;
          padding-top: ${theme.spacings.large};
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;

          @media screen and (max-width: 720px) {
            padding: 0 ${theme.spacings.small};
          }
        }

        & > span {
          color: ${theme.colors.neutral.medium};
          display: block;
          margin-bottom: ${theme.spacings.extraSmall};

          @media screen and (max-width: 720px) {
            text-align: center;
          }
        }

        .friends {
          display: flex;

          @media screen and (max-width: 720px) {
            justify-content: center;
          }

          a {
            z-index: 2;
            border: 1px solid ${theme.colors.background.alt};
            border-radius: 50%;
            overflow: hidden;
            margin-right: -0.5rem;
            display: flex;

            &:hover {
              opacity: 0.9;
            }

            &.searchFriends {
              height: 3.4rem;
              width: 3.4rem;
              border: none;
              background-color: ${theme.colors.neutral.light};
              color: ${theme.colors.neutral.main};
              border-radius: 0.7rem;
              padding: 0 ${theme.spacings.extraSmall};

              &.expandingButton:hover {
                width: 16.2rem;
              }

              &:active {
                background-color: ${theme.colors.primary.main};
                color: #fff;
              }
            }

            img {
              margin-right: 0;
              vertical-align: middle;
            }
          }
        }
      }
    }

    .helperBtnsWrapper {
      float: right;
      padding-right: ${theme.spacings.small};
      display: flex;
      gap: ${theme.spacings.extraSmall};
      margin-top: -5rem;
      /* margin-top: -6.5rem; */

      @media screen and (max-width: 720px) {
        float: none;
        margin: 0;
        justify-content: center;
        padding: ${theme.spacings.small};
      }

      button {
        display: flex;
        align-items: center;
        gap: ${theme.spacings.extraSmall};
        background-color: ${theme.colors.neutral.light};
        color: ${theme.colors.neutral.main};
        border-radius: 0.7rem;
        padding: ${theme.spacings.extraSmall};

        &.coloredButton {
          background-color: ${theme.colors.primary.main};
          color: #fff;
        }
      }
    }

    .defaultMenu {
      list-style: none;
      border-top: 1px solid ${theme.colors.neutral.medium};
      margin: 0 ${theme.spacings.small};
      display: flex;
      align-items: center;

      @media screen and (max-width: 720px) {
        justify-content: center;
      }

      @media screen and (max-width: 500px) {
        justify-content: space-between;
      }

      li {
        display: inline-block;

        &:nth-child(5) {
          display: none;
        }

        @media screen and (max-width: 480px) {
          &:nth-child(4) {
            display: none;
          }

          &:nth-child(5) {
            display: inline-block;
          }
        }

        @media screen and (max-width: 380px) {
          &:nth-child(3) {
            display: none;
          }
        }

        button {
          color: ${theme.colors.neutral.medium};
          padding: ${theme.spacings.medium};
          font-weight: bold;

          &:hover {
            background-color: rgba(0, 0, 0, 0.1);
          }

          &.active {
            border-bottom: 1px solid ${theme.colors.neutral.main};
            color: ${theme.colors.neutral.main};
          }

          &.arrowButton {
            background-color: ${theme.colors.neutral.light};
            color: ${theme.colors.neutral.main};
            padding: ${theme.spacings.extraSmall};
            border-radius: 0.7rem;
            display: flex;
          }
        }
      }
    }

    .altMenu {
      list-style: none;
      position: absolute;
      right: ${theme.spacings.small};
      bottom: -6rem;
      background-color: ${theme.colors.neutral.light};
      border-radius: 0.7rem;
      padding: ${theme.spacings.extraSmall};
      transition: 0.3s;
      z-index: 2;
      display: none;

      &.showAltMenu {
        display: block;
        bottom: 5rem;
      }

      li {
        &:nth-child(1) {
          display: none;

          @media screen and (max-width: 380px) {
            display: inline-block;
          }
        }

        button {
          width: 100%;
          text-align: left;
          padding: ${theme.spacings.extraSmall};
          color: ${theme.colors.neutral.main};
          border-radius: 0.7rem;

          &:hover {
            background-color: ${theme.colors.background.alt};
          }
        }
      }
    }
  `}
`;
