import styled from 'styled-components';

export const Container = styled.div`
  width: 30rem;
  gap: 2rem;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #d9d9d9;
  padding-top: 8rem;
  h1 {
    font-size: 3.2rem;
    padding: 0 2rem 2rem 3rem;
    font-family: 'ABeeZee', sans-serif;
    font-style: italic;
    padding-bottom: 3rem;
  }
  position: relative;
`;
export const MenuBar = styled.div`
  padding: 0 2rem;
  h2 {
    font-size: 2rem;
    font-family: 'ABeeZee', sans-serif;
    font-style: italic;
    padding-bottom: 1.5rem;
    padding-left: 1rem;
  }
  li {
    font-size: 1.7rem;
    font-family: 'ABeeZee', sans-serif;
    font-style: italic;
  }
`;

export const ListContainer = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const ListItem = styled.li<{ isActive: boolean }>`
  background-color: ${({ isActive }) => (isActive ? '#6a6982' : 'white')};
  color: ${({ isActive }) => (isActive ? 'white' : 'black')};
  padding: 1.5rem 4.7rem;
  margin: 5px 0;
  border-radius: 12px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;

  &:last-child {
    position: absolute;
    left: 0;
    bottom: 4rem;
    width: calc(100% - 4rem);
    margin-left: 2rem;
  }
`;
