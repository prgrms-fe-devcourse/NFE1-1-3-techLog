import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Modal from '.';
import * as S from './index.styles';
import CategorySelect from './CategorySelect';
import { ModalProps } from '../../interface/modalProps';
import useInput from '../../hooks/useInput';
import { editQA, loadQA, registerQA } from '../../api/questionAnswer';
import useModalStore from '../../store/modalStore';
import QUERYKEYS from '../../constants/querykeys';
import { ModalQaData } from '../../interface/modalData';
import useDialog from '../../hooks/useDialog';
import Dialog from '../Dialog';

function ModalForm({ onClose }: ModalProps) {
  const { modalId } = useModalStore();
  const isEditMode = Boolean(modalId); // 수정 모드 여부를 확인
  const { isDialogOpen, setIsDialogOpen } = useDialog();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: [QUERYKEYS.LOAD_QA, modalId],
    queryFn: () => (modalId ? loadQA(modalId) : Promise.resolve(null)),
    enabled: isEditMode,
  });
  const [selectedCategory, setSelectedCategory] = useState(
    isEditMode ? data?.data.category : '',
  );
  const [question, onChangeQuestion, setQuestion] = useInput(
    isEditMode ? data?.data.title : '',
  );
  const [shortAnswer, onChangeShortAnswer, setShortAnswer] = useInput(
    isEditMode ? data?.data.shortAnswer : '',
  );
  const [detailedAnswer, onChangeDetailedAnswer, setDetailedAnswer] = useInput(
    isEditMode ? data?.data.detailedAnswer : '',
  );
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    if (isEditMode && data?.data) {
      setSelectedCategory(data.data.category);
      setQuestion(data.data.title);
      setShortAnswer(data.data.shortAnswer);
      setDetailedAnswer(data.data.detailedAnswer);
      console.log('isEditMode2', isEditMode, modalId);
    } else {
      console.log('isEditMode', isEditMode);
      setSelectedCategory('');
      setQuestion('');
      setShortAnswer('');
      setDetailedAnswer('');
    }
  }, [isEditMode, data]);

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
      setIsDialogOpen(true);
      console.log('성공 후 데이터', res);
    },
    onError: error => {
      console.log('실패', error);
    },
  });
  const mutateEditQA = useMutation({
    mutationFn: ({ id, detailData }: { id: string; detailData: ModalQaData }) =>
      editQA(id, detailData),
    onSuccess: res => {
      setIsDialogOpen(true);
      console.log('편집 후 데이터', res, isDialogOpen);
    },
    onError: error => {
      console.log('실패', error);
    },
  });

  const handleSubmit = () => {
    if (modalId) {
      mutateEditQA.mutate({
        id: modalId,
        detailData: {
          category: selectedCategory,
          title: question,
          shortAnswer,
          detailedAnswer,
        },
      });
    } else {
      mutateRegisterQA.mutate({
        category: selectedCategory,
        title: question,
        shortAnswer,
        detailedAnswer,
      });
    }
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
    <>
      {isDialogOpen && (
        <Dialog
          width="46.4rem"
          description={
            isEditMode ? '수정이 완료되었어요. ✍️' : '등록이 완료되었어요. 🎉'
          }
          cancelButton={() => {
            setIsDialogOpen(false);
            onClose();
            queryClient.invalidateQueries({
              queryKey: [QUERYKEYS.LOAD_ALL_QA],
            });
          }}
          cancelTitle="확인"
        />
      )}

      <Modal onClose={onClose}>
        <CategorySelect
          value={selectedCategory}
          onChange={setSelectedCategory}
        />

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
    </>
  );
}

export default ModalForm;
