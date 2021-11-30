import { baseApi } from './base';
import { User } from '../types';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserByName: builder.query<User, string>({
      query: (name) => `user/${name}`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserByNameQuery } = userApi;