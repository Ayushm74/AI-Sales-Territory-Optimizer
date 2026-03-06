import api from './api.js';

export const runPrediction = async () => {
  const { data } = await api.post('/predict-revenue', {});
  return data;
};

export const runOptimization = async ({ algorithm = 'greedy', maxTerritoriesPerRep = 2 }) => {
  const { data } = await api.post('/optimize-territories', { algorithm, maxTerritoriesPerRep });
  return data;
};

export const getAssignments = async () => {
  const { data } = await api.get('/assignments');
  return data;
};

export default { runPrediction, runOptimization, getAssignments };


