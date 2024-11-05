import React from 'react';
import * as S from './index.styles';

interface Comment {
  _id?: string;
  userId: string;
  postId: string;
  content: string;
  createdAt?: string;
}

interface CommentSectionProps {
  comments: Comment[];
}

function CommentSection({ comments }: CommentSectionProps) {
  console.log('commentscommentscomments', comments);

  return (
    <S.CommentSection>
      <S.Separator />
      <h3>댓글</h3>
      {comments.map(comment => (
        <S.Comment>
          <S.CommentHeader>
            <S.CommentUsername>{comment.userId}</S.CommentUsername>
            <S.CommentTime>{comment.createdAt}</S.CommentTime>
          </S.CommentHeader>
          <S.CommentContent>{comment.content}</S.CommentContent>
        </S.Comment>
      ))}
    </S.CommentSection>
  );
}

export default CommentSection;
