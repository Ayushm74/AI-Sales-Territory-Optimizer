import api from './api.js';

export const uploadTerritoryCSV = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await api.post('/upload-territory-data', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const getTerritoryAnalysis = async () => {
  const { data } = await api.get('/territory-analysis');
  return data;
};

export const getTerritories = async () => {
  const { data } = await api.get('/territories');
  return data;
};

export default { uploadTerritoryCSV, getTerritoryAnalysis, getTerritories };


