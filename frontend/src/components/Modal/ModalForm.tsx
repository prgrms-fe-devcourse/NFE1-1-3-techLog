import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import Modal from '.';
import * as S from './index.styles';
import CategorySelect from './CategorySelect';
import { ModalProps } from '../../interface/modalProps';
import { Category } from '../../interface/category';
import useInput from '../../hooks/useInput';
import { registerQA } from '../../api/questionAnswer';

interface ModalFormProps extends ModalProps {
  initialCategory: Category;
  initialQuestion?: string;
  initialShortAnswer?: string;
  initialDetailedAnswer?: string;
}

function ModalForm({
  onSubmit,
  onClose,
  initialCategory = 'React',
  initialQuestion = '',
  initialShortAnswer = '',
  initialDetailedAnswer = '',
}: ModalFormProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [question, onChangeQuestion] = useInput(initialQuestion);
  const [shortAnswer, onChangeShortAnswer] = useInput(initialShortAnswer);
  const [detailedAnswer, onChangeDetailedAnswer] = useInput(
    initialDetailedAnswer,
  );
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    // 입력 값이 초기값과 다른지 여부 확인
    const hasChanges =
      selectedCategory !== initialCategory ||
      question !== initialQuestion ||
      shortAnswer !== initialShortAnswer ||
      detailedAnswer !== initialDetailedAnswer;

    // 필수 입력 필드가 채워지고 변경 사항이 있는 경우에만 활성화
    setIsSubmitDisabled(
      !hasChanges || !selectedCategory || !question || !shortAnswer,
    );
  }, [
    selectedCategory,
    question,
    shortAnswer,
    detailedAnswer,
    initialCategory,
    initialQuestion,
    initialShortAnswer,
    initialDetailedAnswer,
  ]);
  const mutateRegisterQA = useMutation({
    mutationFn: registerQA,
    onSuccess: data => {
      console.log('성공', data);
    },
    onError: error => {
      console.log('실패', error);
    },
  });

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({
        category: selectedCategory,
        question,
        shortAnswer,
        detailedAnswer,
      });
    }
    mutateRegisterQA.mutate({
      category: selectedCategory,
      title: question,
      shortAnswer,
      detailedAnswer,
    });
    console.log(onsubmit);
  };
  const inputList = [
    {
      label: '질문',
      value: question,
      onChange: onChangeQuestion,
      type: 'input',
      maxLength: 50,
      placeholder: '질문을 입력해주세요.',
    },
    {
      label: '간단 답변',
      value: shortAnswer,
      onChange: onChangeShortAnswer,
      type: 'input',
      maxLength: 70,
      placeholder: '간단한 답변을 입력해주세요.',
    },
    {
      label: '상세 답변',
      value: detailedAnswer,
      onChange: onChangeDetailedAnswer,
      type: 'textarea',
      maxLength: 600,
      placeholder: '상세한 답변을 입력해주세요.(선택)',
    },
  ];

  return (
    <Modal onClose={onClose}>
      <CategorySelect value={selectedCategory} onChange={setSelectedCategory} />
      {inputList.map(input => (
        <React.Fragment key={input.label}>
          <S.Label>{input.label}</S.Label>
          {input.type === 'input' ? (
            <S.Input
              value={input.value}
              onChange={input.onChange}
              maxLength={input.maxLength}
              placeholder={input.placeholder}
            />
          ) : (
            <S.Textarea
              value={input.value}
              onChange={input.onChange}
              maxLength={input.maxLength}
              placeholder={input.placeholder}
            />
          )}
        </React.Fragment>
      ))}

      <S.ButtonGroup>
        <S.SubmitButton onClick={handleSubmit} disabled={isSubmitDisabled}>
          {initialQuestion ? '수정하기' : '등록하기'}
        </S.SubmitButton>
      </S.ButtonGroup>
    </Modal>
  );
}

export default ModalForm;
