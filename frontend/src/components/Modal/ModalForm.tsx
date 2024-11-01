import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import Modal from '.';
import * as S from './index.styles';
import CategorySelect from './CategorySelect';
import { ModalProps } from '../../interface/modalProps';
import useInput from '../../hooks/useInput';
import { loadQA, registerQA } from '../../api/questionAnswer';
import useModalStore from '../../store/modalStore';
import QUERYKEYS from '../../constants/querykeys';

function ModalForm({ onSubmit, onClose }: ModalProps) {
  const { modalId } = useModalStore();

  if (!modalId) return null;
  const { data } = useQuery({
    queryKey: [QUERYKEYS.LOAL_QA, modalId],
    queryFn: () => loadQA(modalId),
  });
  console.log('edit', data);
  const [selectedCategory, setSelectedCategory] = useState(data?.data.category);
  const [question, onChangeQuestion] = useInput(data?.data.title);
  const [shortAnswer, onChangeShortAnswer] = useInput(data?.data.shortAnswer);
  const [detailedAnswer, onChangeDetailedAnswer] = useInput(
    data?.data.detailedAnswer,
  );
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    // 입력 값이 초기값과 다른지 여부 확인
    const hasChanges =
      selectedCategory !== data?.data.category ||
      question !== data?.data.title ||
      shortAnswer !== data?.data.shortAnswer ||
      detailedAnswer !== data?.data.detailedAnswer;

    // 필수 입력 필드가 채워지고 변경 사항이 있는 경우에만 활성화
    setIsSubmitDisabled(
      !hasChanges || !selectedCategory || !question || !shortAnswer,
    );
  }, [
    selectedCategory,
    question,
    shortAnswer,
    detailedAnswer,
    data?.data.category,
    data?.data.title,
    data?.data.shortAnswer,
    data?.data.detailedAnswer,
  ]);

  const mutateRegisterQA = useMutation({
    mutationFn: registerQA,
    onSuccess: res => {
      console.log('성공 후 데이터', res);
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
  console.log('질문', question);
  console.log('짧답', shortAnswer);
  console.log('긴답', detailedAnswer);

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
          {data?.data.category ? '수정하기' : '등록하기'}
        </S.SubmitButton>
      </S.ButtonGroup>
    </Modal>
  );
}

export default ModalForm;
