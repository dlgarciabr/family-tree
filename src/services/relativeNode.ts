import { baseApi } from './base';
import { RelativeNode } from '../types';

export const relativeNodeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRelativeNodeByName: builder.query<RelativeNode, string>({
      query: (name) => `relativeNode/${name}`,
    }),
    createRelativeNode: builder.mutation<RelativeNode, Partial<RelativeNode> & Pick<RelativeNode, 'id'>>({
      query: ({ id, ...patch }) => ({
        url: `post/`,
        method: 'POST',
        body: patch,
      }),
      transformResponse: (response: { data: RelativeNode }) => response.data
    }),
    updateRelativeNode: builder.mutation<RelativeNode, Partial<RelativeNode> & Pick<RelativeNode, 'id'>>({
      // note: an optional `queryFn` may be used in place of `query`
      query: ({ id, ...patch }) => ({
        url: `post/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response: { data: RelativeNode }) => response.data,
      // invalidatesTags: ['RelativeNode'],
      // onQueryStarted is useful for optimistic updates
      // The 2nd parameter is the destructured `MutationLifecycleApi`
      async onQueryStarted(
        arg,
        { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
      ) { },
      // The 2nd parameter is the destructured `MutationCacheLifecycleApi`
      async onCacheEntryAdded(
        arg,
        {
          dispatch,
          getState,
          extra,
          requestId,
          cacheEntryRemoved,
          cacheDataLoaded,
          getCacheEntry,
        }
      ) { },
    }),
  }),
  overrideExisting: false,
})

export const { useGetRelativeNodeByNameQuery, useCreateRelativeNodeMutation, useUpdateRelativeNodeMutation } = relativeNodeApi;