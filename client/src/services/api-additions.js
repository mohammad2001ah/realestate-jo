export const getMyProperties = async () => {
  const response = await api.get('/properties/my-properties');
  return response.data;
};
