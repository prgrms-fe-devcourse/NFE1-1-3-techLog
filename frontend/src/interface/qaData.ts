import { Category } from './category';

export interface QaData {
  _id: string;
  title: string;
  category: Category;
  shortAnswer: string;
  createdAt: string;
  updatedAt: string;
}

export interface QaDataWithOnClick
  extends Omit<QaData, 'createdAt' | 'updatedAt'> {
  showAnswer: boolean;
  onClick: () => void;
  isEven?: boolean;
}