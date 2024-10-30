import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  gap: 2rem;
  padding: 6.7rem;
  display: flex;

  h1 {
    font-size: 4.5rem;
    font-weight: 600;
  }
`;

export const MainPage = styled.div`
  width: 100%;
`;

export const ItemBox = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 32% 32% 32%;
  grid-template-rows: 32% 32% 32%;
  margin: 10px;
  grid-gap: 20px;
  height: calc(95% - 20px);
  position: relative;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 1.5rem;
    font-weight: 500;
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

interface ItemProps {
  content?: string;
}

export const Item = styled.div.attrs((props: ItemProps) => ({
  content:
    props.content && props.content.length > 45
      ? props.content.slice(0, 45)
      : props.content || '',
}))`
  font-size: ${({ content }) =>
    content && content.length <= 15 ? '2.5rem' : '2rem'};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
