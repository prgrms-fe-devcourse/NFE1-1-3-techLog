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

  return (
    <S.CommentInputContainer>
      <S.CommentInput
        type="text"
        value={comment}
        onChange={handleInputChange}
        placeholder="댓글을 입력하세요..."
      />
      <S.SubmitButton onClick={handleSubmit}>
        <FaArrowUp />
      </S.SubmitButton>
    </S.CommentInputContainer>
  );
}

export default CommentInput;
