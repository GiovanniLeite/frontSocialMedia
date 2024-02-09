import styled, { css } from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacings.medium};

    .error {
      color: ${theme.colors.neutral.dark};
      text-align: center;
    }
  `}
`;
