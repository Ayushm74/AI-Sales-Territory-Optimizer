import api from './api.js';

export const uploadSalesCSV = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await api.post('/upload-sales-data', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const getSalesData = async () => {
  const { data } = await api.get('/territories/sales-data');
  return data;
};

export default { uploadSalesCSV, getSalesData };


