import { baseApi } from './base';
import { RelativeNode } from '../types';

export const relativeNodeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRelativeNodeByName: builder.query<RelativeNode, string>({
      query: (name) => `relativeNode/${name}`,
    }),
  }),
  overrideExisting: false,
})

export const { useGetRelativeNodeByNameQuery } = relativeNodeApi;