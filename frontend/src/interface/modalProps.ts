export interface ModalProps {
  type?: 'register' | 'read' | 'edit';
  onSubmit?: (data: any) => void;
  onClose: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
}
