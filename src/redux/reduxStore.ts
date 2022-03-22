import { configureStore } from '@reduxjs/toolkit';

import notificationReducer from './slices/notificationSlice';
import { baseApi } from '../services/base';
import { rtkQueryErrorLogger } from './errorMiddleware';
import myProfileReducer from './slices/myProfileSlice';

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    myProfile: myProfileReducer,
    [baseApi.reducerPath]: baseApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(rtkQueryErrorLogger, baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch