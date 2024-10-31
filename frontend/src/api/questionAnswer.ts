export const registerQA = async (detailData: QaData) => {
  const { data } = await apiClient.post(API.REGISTER, detailData);
  return data;
};
