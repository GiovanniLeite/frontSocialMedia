import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    .loading {
      animation: is-rotating 1s infinite;
      border: 6px solid #e5e5e5;
      border-radius: 50%;
      border-top-color: ${theme.colors.primary.main};
      margin: 0 auto;
    }

    @keyframes is-rotating {
      to {
        transform: rotate(1turn);
      }
    }
  `}
`;
