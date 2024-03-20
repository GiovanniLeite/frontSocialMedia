import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${theme.spacings.medium};

    .content {
      width: 100%;
      max-width: 500px;
      max-height: calc(100vh - 4rem);
      overflow-y: auto;
      padding: ${theme.spacings.small};
      border-radius: 0.7rem;
      background-color: ${theme.colors.background.alt};
      color: ${theme.colors.neutral.main};

      h4 {
        text-align: center;
        padding: ${theme.spacings.extraSmall};
      }

      p {
        margin-bottom: ${theme.spacings.small};
        font-size: 1.4rem;
      }

      .action {
        width: 155px;
        float: right;

        button {
          cursor: pointer;
          border: none;
          padding: ${theme.spacings.extraSmall} ${theme.spacings.small};
          border-radius: ${theme.spacings.large};
          color: ${theme.colors.neutral.main};
          background-color: ${theme.colors.background.alt};

          & + button {
            background-color: ${theme.colors.primary.main};
            color: #fff;

            &:hover {
              background-color: ${theme.colors.primary.mediumMain};
            }
          }
        }
      }
    }
  `}
`;
