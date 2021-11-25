import styled from '@emotion/styled';

export const Container = styled.button`
  width: 9rem;
  height: 3rem;
  background: #1c1d21;
  border: none;
  color: #ededf4;
  border-radius: 0.5rem;

  &:hover {
    filter: opacity(0.8);
  }

  &:focus {
    outline: 2px solid #363734;
    outline-offset: 2px;
  }
`;
