import React, { useEffect, useRef } from 'react';
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
  const commentEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (commentEndRef.current) {
      commentEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [comments]);

  return (
    <S.CommentSection>
      <S.Separator />
      <h3>댓글</h3>
      {comments.map(comment => (
        <S.Comment key={comment._id}>
          <S.CommentHeader>
            <S.CommentUsername>{comment.userId}</S.CommentUsername>
            <S.CommentTime>{comment.createdAt}</S.CommentTime>
          </S.CommentHeader>
          <S.CommentContent>{comment.content}</S.CommentContent>
        </S.Comment>
      ))}
      {/* 스크롤 이동을 위한 ref */}
      <div ref={commentEndRef} />
    </S.CommentSection>
  );
}

export default CommentSection;
