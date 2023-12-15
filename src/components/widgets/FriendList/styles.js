import styled, { css } from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => css`
    border-radius: 0.7rem;
    background-color: ${theme.colors.background.alt};
    padding: ${theme.spacings.small};

    h4 {
      font-weight: 600;
      margin-bottom: ${theme.spacings.small};
      color: ${theme.colors.neutral.dark};
    }

    & > p {
      color: ${theme.colors.neutral.dark};
    }
  `}
`;
