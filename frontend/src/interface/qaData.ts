import { Category } from './category';

export interface QaData {
  _id: string | null;
  title: string;
  category: Category;
  shortAnswer: string;
  createdAt: string;
  updatedAt: string;
  username: string;
}

export interface QaDataWithOnClick
  extends Omit<QaData, 'createdAt' | 'updatedAt'> {
  showAnswer: boolean;
  onClick: () => void;
  isEven?: boolean;
}
