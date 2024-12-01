import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.skilla.ru/mango',
  headers: { Authorization: 'Bearer testtoken' },
});

export const getCalls = (dateStart, dateEnd, inOut) => {
  const params = new URLSearchParams({
    ...(dateStart && { date_start: dateStart.toISOString() }),
    ...(dateEnd && { date_end: dateEnd.toISOString() }),
    ...(inOut && { in_out: inOut }),
  });
  return apiClient.post(`/getList?${params}`);
};