import { useState } from 'react';
import useModalStore from '../store/modalStore';

export default function useModal() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  const {
    isReadModalOpen,
    openReadModal,
    closeReadModal,
    isEditModalOpen,
    openEditModal,
    closeEditModal,
  } = useModalStore();

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
    openEditModal();
  };

  return {
    isRegisterModalOpen,
    handleRegisterSubmit,
    closeRegisterModal,
    openRegisterModal,
    isReadModalOpen,
    openReadModal,
    closeReadModal,
    isEditModalOpen,
    openEditModal,
    closeEditModal,
    handleDelete,
    handleEdit,
    handleEditSubmit,
  };
}
