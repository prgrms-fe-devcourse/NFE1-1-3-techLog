import { create } from 'zustand';

interface ModalStore {
  isReadModalOpen: boolean;
  isEditModalOpen: boolean;
  modalId: string | null; // 선택된 아이템의 _id
  openReadModal: (id: string) => void;
  closeReadModal: () => void;
  openEditModal: (id: string) => void;
  closeEditModal: () => void;
}

const useModalStore = create<ModalStore>(set => ({
  isReadModalOpen: false,
  isEditModalOpen: false,
  modalId: null,
  openReadModal: id =>
    set({ modalId: id, isReadModalOpen: true, isEditModalOpen: false }),
  closeReadModal: () => set({ modalId: null, isReadModalOpen: false }),
  openEditModal: id =>
    set({ modalId: id, isReadModalOpen: false, isEditModalOpen: true }),
  closeEditModal: () => set({ modalId: null, isEditModalOpen: false })
}));

export default useModalStore;
