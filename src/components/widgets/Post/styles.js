import styled, { css } from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => css`
    border-radius: 0.7rem;
    background-color: ${theme.colors.background.alt};
    padding: ${theme.spacings.small};
    color: ${theme.colors.neutral.main};

    p {
      margin: 0.7rem 0;
      font-size: 1.4rem;
    }

    .postImage {
      width: calc(100% + ${theme.spacings.small} * 2);
      height: auto;
      margin-left: -${theme.spacings.small};
      margin-bottom: 0.7rem;
    }

    .actions {
      .likeComment {
        gap: ${theme.spacings.small};
      }

      button {
        cursor: pointer;
        border: none;
        padding: ${theme.spacings.extraSmall};
        background-color: ${theme.colors.background.alt};
        border-radius: 50%;
        display: flex;

        svg {
          color: ${theme.colors.neutral.main};
        }

        &:hover:not(.share) {
          background-color: ${theme.colors.primary.light};

          svg {
            color: ${theme.colors.primary.dark};
          }
        }
      }

      span {
        margin-left: ${theme.spacings.extraSmall};
      }
    }

    .comments {
      padding-top: 0.7rem;

      div {
        border-top: 1px solid ${theme.colors.neutral.main};

        &:last-child {
          border-bottom: 1px solid ${theme.colors.neutral.main};
        }
      }
    }
  `}
`;
