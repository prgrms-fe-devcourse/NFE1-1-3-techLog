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
    modalId,
  } = useModalStore();

  const handleEdit = () => {
    if (modalId) {
      openEditModal(modalId);
    }
  };

  return {
    isRegisterModalOpen,
    closeRegisterModal,
    openRegisterModal,
    isReadModalOpen,
    openReadModal,
    closeReadModal,
    isEditModalOpen,
    openEditModal,
    closeEditModal,
    handleEdit,
  };
}
