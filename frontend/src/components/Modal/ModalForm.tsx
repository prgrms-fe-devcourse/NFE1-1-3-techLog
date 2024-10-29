import React, { useState, useEffect } from 'react';
import Modal from '.';
import * as S from './index.styles';
import CategorySelect from './CategorySelect';
import { ModalProps } from '../../interface/modalProps';
import { Category } from '../../interface/category';

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
  const [inputQuestion, setInputQuestion] = useState(initialQuestion);
  const [inputShortAnswer, setInputShortAnswer] = useState(initialShortAnswer);
  const [inputDetailedAnswer, setInputDetailedAnswer] = useState(
    initialDetailedAnswer,
  );
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    // 입력 값이 초기값과 다른지 여부 확인
    const hasChanges =
      selectedCategory !== initialCategory ||
      inputQuestion !== initialQuestion ||
      inputShortAnswer !== initialShortAnswer ||
      inputDetailedAnswer !== initialDetailedAnswer;

    // 필수 입력 필드가 채워지고 변경 사항이 있는 경우에만 활성화
    setIsSubmitDisabled(
      !hasChanges || !selectedCategory || !inputQuestion || !inputShortAnswer,
    );
  }, [
    selectedCategory,
    inputQuestion,
    inputShortAnswer,
    inputDetailedAnswer,
    initialCategory,
    initialQuestion,
    initialShortAnswer,
    initialDetailedAnswer,
  ]);

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({
        category: selectedCategory,
        question: inputQuestion,
        shortAnswer: inputShortAnswer,
        detailedAnswer: inputDetailedAnswer,
      });
    }
  };

  const inputList = [
    {
      label: '질문',
      value: inputQuestion,
      onChange: setInputQuestion,
      type: 'input',
      maxLength: 50,
    },
    {
      label: '간단 답변',
      value: inputShortAnswer,
      onChange: setInputShortAnswer,
      type: 'input',
      maxLength: 70,
    },
    {
      label: '상세 답변',
      value: inputDetailedAnswer,
      onChange: setInputDetailedAnswer,
      type: 'textarea',
      maxLength: 600,
    },
  ];

  return (
    <Modal onClose={onClose}>
      <CategorySelect value={selectedCategory} onChange={setSelectedCategory} />

      {inputList.map(input => (
        <>
          <S.Label>{input.label}</S.Label>
          {input.type === 'input' ? (
            <S.Input
              value={input.value}
              onChange={e => input.onChange(e.target.value)}
              maxLength={input.maxLength}
            />
          ) : (
            <S.Textarea
              value={input.value}
              onChange={e => input.onChange(e.target.value)}
              maxLength={input.maxLength}
            />
          )}
        </>
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
