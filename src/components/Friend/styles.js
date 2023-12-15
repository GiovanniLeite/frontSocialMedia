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

    button {
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

      &:hover {
        background-color: ${theme.colors.neutral.light};
      }

      &.removeFriend:hover {
        svg {
          color: ${theme.colors.error};
        }
      }
    }

    p {
      color: ${theme.colors.neutral.dark};
      border-bottom: 1px solid ${theme.colors.neutral.dark};
    }
  `}
`;
