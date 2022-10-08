import axios from 'axios';
import { FormDataType, GetUsersParamsType } from '../bll/types';

export const instance = axios.create({
  baseURL: 'https://frontend-test-assignment-api.abz.agency/api/v1',
});

export const API = {
  getToken() {
    return instance.get('/token');
  },
  getUsers(params: GetUsersParamsType) {
    return instance.get(`/users`, {
      params: { ...params },
    });
  },
  getPositions() {
    return instance.get('/positions');
  },
  createProfile(token: string, data: FormDataType) {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('position_id', data.position);
    data.photo && formData.append('photo', data.photo);
    return instance.post('/users', formData, {
      headers: { Token: token },
    });
  },
};


