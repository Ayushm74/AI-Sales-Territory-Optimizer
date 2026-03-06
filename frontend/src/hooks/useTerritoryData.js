import { useEffect, useState } from 'react';
import { getTerritories } from '../services/territoryService.js';

export const useTerritoryData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await getTerritories();
        if (!mounted) return;
        setData(res.data || []);
      } catch (e) {
        if (!mounted) return;
        setError(e);
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading, error };
};

export default useTerritoryData;


