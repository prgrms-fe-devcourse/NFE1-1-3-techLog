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

export const ItemBoxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); // 3열 그리드로 수정
  grid-gap: 20px;
  width: 100%;
  height: auto;
`;

export const ItemBox = styled.div`
  margin: 10px;
  height: auto;

  // itembox추가 시 높이 변경
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 33%;
    font-size: 1.5rem;
    font-weight: 500;
    cursor: pointer;
  }

  div:nth-child(even) {
    border: 1px solid black;
    border-radius: 7px;
    background-color: white;
    color: black;
  }

  div:nth-child(odd) {
    border-radius: 7px;
    background-color: black;
    color: white;
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
