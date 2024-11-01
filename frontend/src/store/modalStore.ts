import { create } from 'zustand';

interface ModalStore {
  isReadModalOpen: boolean;
  isEditModalOpen: boolean;
  modalId: string | null; // 선택된 아이템의 _id
  openReadModal: (id: string | null | undefined) => void;
  closeReadModal: () => void;
  openEditModal: () => void;
  closeEditModal: () => void;
}

const useModalStore = create<ModalStore>(set => ({
  isReadModalOpen: false,
  isEditModalOpen: false,
  modalId: null,
  openReadModal: id => set({ modalId: id, isReadModalOpen: true }),
  closeReadModal: () => set({ modalId: null, isReadModalOpen: false }),
  openEditModal: () => set({ isReadModalOpen: false, isEditModalOpen: true }), // 읽기 모달 닫기
  closeEditModal: () => set({ isEditModalOpen: false }),
}));

export default useModalStore;
