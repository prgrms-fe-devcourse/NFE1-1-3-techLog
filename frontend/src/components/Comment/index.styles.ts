import styled from 'styled-components';

export const CommentSection = styled.div`
  margin-top: 2rem;
  h3 {
    padding: 2rem 0rem;
  }
  max-height: 300px; /* 원하는 최대 높이 설정 */
  overflow-y: auto; /* 높이를 초과할 경우 스크롤 생성 */
  padding-right: 1rem; /* 스크롤 공간 확보 */
  position: relative;
  z-index: 1; /* 댓글 입력 창보다 아래에 배치 */
`;

export const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: #d3d3d3;
  margin: 1rem 0;
`;

export const Comment = styled.div`
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
`;

export const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

export const CommentUsername = styled.span`
  font-weight: bold;
  font-size: 0.9rem;
`;

export const CommentTime = styled.span`
  font-size: 0.8rem;
  color: #888;
`;

export const CommentContent = styled.p`
  font-size: 1rem;
  color: #333;
  margin: 0;
`;

//

export const CommentInputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  background-color: #f9f9f9;
  border-top: 1px solid #ddd;
  position: relative;
  z-index: 2; /* 댓글 섹션보다 위에 배치 */
`;

export const CommentInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 0.5rem;
`;

export const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  svg {
    font-size: 1.2rem;
  }
`;
