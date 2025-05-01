import { useQuery, useMutation } from "@tanstack/react-query";
import { apiClient } from "../config/api";

export const useApi = {
  get: <T>(key: string, url: string, options = {}) =>
    useQuery<T>({
      queryKey: [key],
      queryFn: () => apiClient.get(url),
      ...options,
    }),

  post: <T, U>(key: string, url: string, options = {}) =>
    useMutation<T, Error, U>({
      mutationKey: [key],
      mutationFn: (data: U) => apiClient.post(url, data),
      ...options,
    }),
};
