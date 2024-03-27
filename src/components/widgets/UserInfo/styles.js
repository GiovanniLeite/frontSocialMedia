import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    margin-bottom: ${theme.spacings.extraSmall};

    .userInfo {
      max-width: calc(100% - 40px);

      img {
        vertical-align: middle;
      }

      & > div {
        max-width: calc(100% - 50px);

        h5 {
          color: ${theme.colors.neutral.main};
          font-weight: 500;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;

          &.highlightContent {
            font-size: ${theme.font.sizes.large};
            font-weight: bold;
            color: ${theme.colors.neutral.dark};
          }
        }

        span {
          color: ${theme.colors.neutral.medium};
          display: block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }

    .userButton {
      cursor: pointer;
      margin-left: ${theme.spacings.small};
      padding: ${theme.spacings.extraSmall};
      border: none;
      border-radius: 50%;
      background-color: ${theme.colors.primary.light};
      display: flex;

      svg {
        color: ${theme.colors.primary.dark};
      }

      &.editButton {
        background-color: ${theme.colors.background.alt};

        svg {
          color: ${theme.colors.neutral.dark};
        }
      }

      &.removeFriend:hover {
        svg {
          color: ${theme.colors.error};
        }
      }

      &:hover {
        background-color: ${theme.colors.neutral.light};
      }
    }

    p {
      color: ${theme.colors.error};
    }
  `}
`;
