import { useState } from 'react';
import useStore from '../store';

export default function useDialog() {
  const { activeIndex } = useStore();
  const Tabs = ['All', 'React', 'CS', 'Network'];
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleConfirm = () => {
    setIsDialogOpen(false);
  };
  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  return {
    isDialogOpen,
    handleConfirm,
    handleCancel,
    Tabs,
    activeIndex,
  };
}
