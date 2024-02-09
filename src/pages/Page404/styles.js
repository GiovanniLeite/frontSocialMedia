import styled, { css } from 'styled-components';

export const Container = styled.main`
  ${({ theme }) => css`
    padding: 9.4rem 0 ${theme.spacings.medium};
    text-align: center;
    color: ${theme.colors.neutral.dark};
  `}
`;
