import { useState } from 'react';

export default function useModal() {
  const detailData = {
    category: 'React' as 'React',
    question: 'Mount, Update, Unmount 가 무엇인가?',
    shortAnswer: '컴포넌트의 생명주기 관련 주요 단계들입니다.',
    detailedAnswer: '컴포넌트의 생명주기 관련 주요 단계들입니다...  ',
  }; // 예시 데이터

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isReadModalOpen, setIsReadModalOpen] = useState(true);
  // const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);
  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  // const openReadModal = () => setIsReadModalOpen(true);
  const closeReadModal = () => setIsReadModalOpen(false);

  const handleRegisterSubmit = (data: any) => {
    console.log('등록된 데이터:', data);
    closeRegisterModal();
  };

  const handleEditSubmit = (data: any) => {
    console.log('수정된 데이터:', data);
    closeEditModal();
  };

  const handleDelete = () => {
    console.log('데이터 삭제');
    closeReadModal();
  };

  const handleEdit = () => {
    closeReadModal();
    openEditModal();
  };

  return {
    isRegisterModalOpen,
    handleRegisterSubmit,
    closeRegisterModal,
    isReadModalOpen,
    detailData,
    isEditModalOpen,
    closeReadModal,
    handleDelete,
    handleEdit,
    handleEditSubmit,
    closeEditModal,
  };
}
