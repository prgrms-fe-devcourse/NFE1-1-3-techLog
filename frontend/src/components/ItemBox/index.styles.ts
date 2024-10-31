// index.styles.ts
import styled from 'styled-components';

export const ItemBox = styled.div<{ isEven?: boolean }>`
  background-color: ${({ isEven }) => (isEven ? 'black' : 'white')};
  color: ${({ isEven }) => (isEven ? 'white' : 'black')};
  border: 1px solid black;
  border-radius: 7px;
  height: 23rem;
  width: 30rem;
  padding: 3rem;
`;

export const Title = styled.div`
  font-size: 2rem;
  font-weight: 500;
  cursor: pointer;
  height: 14rem;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const Box = styled.div`
  height: 2rem;
  width: 100%;
  font-size: 1.2rem;
  padding-left: 0.5rem;
  button {
    border: none;
    background-color: transparent;
  }
`;
