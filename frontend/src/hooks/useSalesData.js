import { useEffect, useState } from 'react';
import { getSalesData } from '../services/salesService.js';

export const useSalesData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await getSalesData();
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

export default useSalesData;


