import { create } from 'zustand';

interface StoreState {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const useIdxStore = create<StoreState>(set => ({
  activeIndex: 0,
  setActiveIndex: index => set({ activeIndex: index }),
}));

export default useIdxStore;
