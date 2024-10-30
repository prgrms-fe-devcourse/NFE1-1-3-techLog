import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
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
  /* border: 1px solid black; */
  width: 100%;
`;

export const ItemBox = styled.div`
  display: grid;

  align-items: center;
  grid-template-columns: 32% 32% 32%;
  grid-template-rows: 32% 32% 32%;
  margin: 10px;
  grid-gap: 20px;
  /* border: 1px solid blue; */
  height: calc(95% - 20px);

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%; // 높이 100%
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
