import React from 'react';
import * as S from './index.styles';

interface Comment {
  username: string;
  time: string;
  contents: string;
}

interface CommentSectionProps {
  comments: Comment[];
}

function CommentSection({ comments }: CommentSectionProps) {
  return (
    <S.CommentSection>
      <S.Separator />
      <h3>댓글</h3>
      {comments.map(comment => (
        <S.Comment>
          <S.CommentHeader>
            <S.CommentUsername>{comment.username}</S.CommentUsername>
            <S.CommentTime>{comment.time}</S.CommentTime>
          </S.CommentHeader>
          <S.CommentContent>{comment.contents}</S.CommentContent>
        </S.Comment>
      ))}
    </S.CommentSection>
  );
}

export default CommentSection;
