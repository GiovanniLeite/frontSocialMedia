import styled, { css } from 'styled-components';

export const Image = styled.img`
  ${({ theme }) => css`
    object-fit: cover;
    border-radius: 50%;
    margin-right: ${theme.spacings.small};
  `}
`;
