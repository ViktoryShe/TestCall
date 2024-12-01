import { useState, useEffect } from 'react';
import { getCalls } from '../api/api';
import { addRandomRating } from '../utils/calls';

export const useCalls = () => {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});

  const fetchCalls = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getCalls(filters.dateStart, filters.dateEnd, filters.inOut);
      const callsWithRatings = response.data.results.map(addRandomRating);
      setCalls(callsWithRatings);
    } catch (err) {
      setError('Ошибка при загрузке данных');
      console.error('Ошибка при загрузке данных:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalls();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return {
    calls,
    loading,
    error,
    handleFilterChange
  };
};