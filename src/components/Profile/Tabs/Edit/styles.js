import styled, { css } from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => css`
    background-color: ${theme.colors.background.alt};
    padding: ${theme.spacings.medium};
    border-radius: 0.7rem;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: ${theme.spacings.medium};

    @media screen and (max-width: 720px) {
      grid-template-columns: 100%;
    }

    .formGroup {
      display: grid;
      gap: ${theme.spacings.medium};
      align-self: start;

      @media screen and (max-width: 720px) {
        &:nth-child(2) {
          order: -1;
        }
      }

      h4 {
        color: ${theme.colors.neutral.dark};
        font-weight: 500;
        margin-bottom: ${theme.spacings.small};
      }

      form {
        display: grid;
        gap: ${theme.spacings.small};

        .doubleText {
          display: grid;
          gap: ${theme.spacings.small};
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        input[type='file'] {
          display: none;
        }
      }

      button {
        background-color: ${theme.colors.primary.main};
        padding: 1.3rem;
        border: none;
        border-radius: 0.5rem;
        color: #fff;

        &:hover:not(.buttonLoading) {
          cursor: pointer;
          background-color: ${theme.colors.primary.mediumMain};
        }

        &.buttonLoading {
          padding: 0.3rem;
        }
      }

      .successMessage {
        color: ${theme.colors.success};
        text-align: center;
      }

      .errorMessage {
        color: ${theme.colors.error};
        text-align: center;
      }

      .fileFormMessage {
        margin: ${theme.spacings.small} 0;
      }

      .coverContainer {
        img {
          width: 100%;
          border-radius: 0.7rem;
          margin-bottom: ${theme.spacings.small};
        }

        form {
          grid-template-columns: auto 7.8rem;
        }
      }

      .pictureContainer {
        & > div {
          display: grid;
          grid-template-columns: 9rem auto;

          @media screen and (max-width: 360px) {
            grid-template-columns: 100%;

            img {
              margin: 0 auto ${theme.spacings.small};
            }
          }

          form {
            align-items: center;
            grid-template-columns: auto 7.8rem;
          }
        }
      }
    }
  `}
`;
