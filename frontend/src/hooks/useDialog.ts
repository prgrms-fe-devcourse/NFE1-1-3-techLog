import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/idxStore';
import PATH from '../constants/path';

export default function useDialog() {
  const { activeIndex } = useStore();
  const navigate = useNavigate();
  const Tabs = ['All', 'React', 'CS', 'Network'];
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleConfirm = () => {
    setIsDialogOpen(false);
    navigate(PATH.LOGIN);
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
    setIsDialogOpen
  };
}
