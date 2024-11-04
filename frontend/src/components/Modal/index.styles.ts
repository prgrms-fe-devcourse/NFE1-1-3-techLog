import styled from 'styled-components';

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 2rem 3rem 2rem 3rem;
  width: 87rem;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
`;

export const Label = styled.label`
  font-size: 1.6rem;
`;

export const Select = styled.select`
  padding: 0.5rem;
  font-size: 2rem;
  font-weight: 600;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 15rem;
`;

export const Input = styled.input`
  padding: 0.8rem;
  font-size: 1.4rem;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

export const Textarea = styled.textarea`
  padding: 0.8rem;
  font-size: 1.4rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  height: 21rem;
  resize: none;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

export const SubmitButton = styled.button`
  background-color: black;
  color: white;
  padding: 1rem 2rem;
  font-size: 1.4rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;

export const DeleteButton = styled.button`
  background-color: white;
  color: red;
  text-decoration: underline;
  font-size: 1.4rem;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

export const EditButton = styled.button`
  background-color: white;
  color: black;
  text-decoration: underline;
  font-size: 1.4rem;
  padding: 1rem 0.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 3rem;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #333;
  }
`;
export const Text = styled.p`
  font-size: 1rem; /* 기본 글씨 크기 */
  color: #333; /* 글씨 색상 */
  margin: 0; /* 기본 마진 제거 */
  line-height: 1.5; /* 줄 높이 설정 */
  /* 추가 스타일 예시 */
  font-weight: normal; /* 글씨 두께 */
  text-align: left; /* 텍스트 정렬 */
`;
