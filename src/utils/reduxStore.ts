import { configureStore } from '@reduxjs/toolkit';

import notificationReducer from '../views/App/notificationSlice';
// import { userApi } from '../services/user';
import { baseApi } from '../services/base';
import { rtkQueryErrorLogger } from './errorMiddleware';

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    // [relativeNodeApi.reducerPath]: relativeNodeApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rtkQueryErrorLogger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch