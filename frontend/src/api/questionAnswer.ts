import API from './config';
import apiClient from '.';
import { ModalQaData } from '../interface/modalData';

export const registerQA = async (detailData: ModalQaData) => {
  const { data } = await apiClient.post(API.REGISTER, detailData);
  return data;
};
export const editQA = async (id: string, detailData: ModalQaData) => {
  const { data } = await apiClient.put(`${API.EDIT}/${id}`, detailData);
  return data;
};
export const loadAllQA = async () => {
  const { data } = await apiClient.get(API.READ_QA_LIST);
  return data;
};
export const loadQA = async (id: string | null) => {
  const { data } = await apiClient.get(`${API.READ_QA}/${id}`);
  return data;
};
