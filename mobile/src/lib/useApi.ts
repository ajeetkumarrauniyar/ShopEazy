import { useAuth } from '@clerk/clerk-expo';
import axios from 'axios';
import { useMemo } from 'react';

const API_URL = "http://192.168.31.90:5000/api/v1";

export function useApi() {
  const { getToken } = useAuth();
  
  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: API_URL,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    // Add a request interceptor
    instance.interceptors.request.use(async (config) => {
      try {
        const token = await getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      } catch (error) {
        return Promise.reject(error);
      }
    });

    // Add a response interceptor
    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized error
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, [getToken]);

  return api;
} 