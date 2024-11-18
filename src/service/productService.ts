import apiClient from './api';

export const getProductByCode = async (productCode: string) => {
  return await apiClient.get(`/api/produtos/${productCode}`);
};

export const addProductToCart = async (product: any) => {
  return await apiClient.post('/cart', product);
};
