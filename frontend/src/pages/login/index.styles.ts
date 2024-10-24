import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  gap: 2rem;
  padding: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-size: 5rem;
    font-family: 'ABeeZee', sans-serif;
    font-style: italic;
  }
  h2 {
    padding-bottom: 7rem;
  }
  div {
    padding-bottom: 1rem;
    font-size: 1.4rem;
  }
  p {
    width: 50rem;
    color: #575767;
  }
`;

export const UnderlinedText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  padding-left: 1rem;
`;
