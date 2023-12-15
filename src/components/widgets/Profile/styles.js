import styled, { css } from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => css`
    border-radius: 0.7rem;
    background-color: ${theme.colors.background.alt};
    color: ${theme.colors.neutral.main};
    padding: ${theme.spacings.small};
    margin-bottom: ${theme.spacings.medium};
    align-self: start;

    a {
      cursor: pointer;
      color: ${theme.colors.neutral.main};
    }

    h4 {
      color: ${theme.colors.neutral.dark};
    }

    span {
      display: block;
      color: ${theme.colors.neutral.medium};
    }

    .editProfile {
      margin-left: ${theme.spacings.small};
      padding: ${theme.spacings.extraSmall};
      border-radius: 50%;
      display: flex;

      &:hover {
        background-color: ${theme.colors.neutral.light};
      }
    }

    .divider {
      border-bottom: 1px solid ${theme.colors.neutral.medium};
      margin: ${theme.spacings.small} 0;
    }

    ul {
      list-style: none;

      li {
        display: flex;
        align-items: center;
        color: ${theme.colors.neutral.medium};

        svg {
          margin-right: ${theme.spacings.small};
          color: ${theme.colors.neutral.main};
        }
      }
    }

    .userNumbers {
      li + li {
        margin-top: ${theme.spacings.extraSmall};
      }

      span {
        color: ${theme.colors.neutral.main};
      }
    }

    .socialMedia {
      font-weight: 400;
      margin-bottom: ${theme.spacings.small};
    }
  `}
`;
