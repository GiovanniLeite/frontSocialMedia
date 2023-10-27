import styled, { css } from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => css`
    padding: 9.4rem ${theme.spacings.medium} ${theme.spacings.medium};
    background-color: ${theme.colors.background.default};

    .box {
      padding: ${theme.spacings.medium};
      margin: 0 auto;
      border-radius: 1.5rem;
      background-color: ${theme.colors.background.alt};
      width: 100%;
      max-width: 90rem;

      h5 {
        color: ${theme.colors.neutral.dark};
        font-weight: 500;
        margin-bottom: 1.5rem;
      }
    }
  `}
`;
