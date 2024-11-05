import React from 'react';
import { FaArrowUp } from 'react-icons/fa';
import * as S from '../Comment/index.styles';

interface CommentInputProps {
  onSubmit: (comment: string) => void;
}

function CommentInput({ onSubmit }: CommentInputProps) {
  const [comment, setComment] = React.useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    if (comment.trim()) {
      onSubmit(comment);
      setComment('');
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // 기본 Enter 키 동작 방지
      handleSubmit();
    }
  };

  return (
    <S.CommentInputContainer>
      <S.CommentInput
        type="text"
        value={comment}
        onChange={handleInputChange}
        onKeyUp={handleKeyUp}
        placeholder="댓글을 입력하세요..."
      />
      <S.SubmitButton onClick={handleSubmit}>
        <FaArrowUp />
      </S.SubmitButton>
    </S.CommentInputContainer>
  );
}

export default CommentInput;
