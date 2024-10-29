import { Category } from './category';

export interface ModalProps {
  type?: 'register' | 'read' | 'edit';
  initialCategory: Category;
  question?: string;
  shortAnswer?: string;
  detailedAnswer?: string;
  onSubmit?: (data: any) => void;
  onClose: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
}
