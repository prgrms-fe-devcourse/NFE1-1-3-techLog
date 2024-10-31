// index.styles.ts
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  gap: 2rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 4.5rem;
    font-weight: 600;
  }
`;

export const MainPage = styled.div`
  width: 100%;
`;

export const ItemBox = styled.div<{ isEven?: boolean }>`
  height: auto;
  background-color: ${({ isEven }) => (isEven ? 'black' : 'white')};
  color: ${({ isEven }) => (isEven ? 'white' : 'black')};
  border: 1px solid black;
  border-radius: 7px;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 500;
    cursor: pointer;
    height: 23rem;
    width: 30rem;
  }
`;

export const PlusBtn = styled.button`
  font-size: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  background-color: white;
  border: 3px solid black;
  border-radius: 50%;
  position: absolute; // PlusBtn 절대위치
  bottom: 27%;
  right: 3%;
  cursor: pointer;
`;
