import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    border-radius: 0.7rem;
    background-color: ${theme.colors.background.alt};
    color: ${theme.colors.neutral.main};
    padding: ${theme.spacings.small};

    .newPost {
      width: 100%;
      background-color: ${theme.colors.neutral.light};
      color: ${theme.colors.neutral.main};
      border: none;
      border-radius: ${theme.spacings.large};
      padding: 1.7rem;
    }

    .addImage {
      border-radius: 0.5rem;
      padding: ${theme.spacings.small};
      border: 1px solid ${theme.colors.neutral.medium};
      margin-top: ${theme.spacings.small};

      .dashed {
        cursor: pointer;
        border: 2px dashed ${theme.colors.primary.main};
        width: 100%;
        padding: ${theme.spacings.small};
      }

      button {
        display: flex;
        margin-left: ${theme.spacings.small};
        padding: ${theme.spacings.extraSmall};
      }
    }

    button {
      cursor: pointer;
      border: none;
      color: ${theme.colors.neutral.main};
      background-color: ${theme.colors.background.alt};

      &.coloredButton {
        background-color: ${theme.colors.primary.main};
        border-radius: ${theme.spacings.large};
        color: #fff;

        &:hover {
          background-color: ${theme.colors.primary.mediumMain};
        }
      }

      &.post {
        padding: ${theme.spacings.extraSmall} ${theme.spacings.small};
      }
    }
  `}
`;
