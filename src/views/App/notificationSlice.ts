import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OptionsObject, SnackbarMessage } from 'notistack';

export interface StackedNotification {
  key: number,
  message: SnackbarMessage,
  dismissed: boolean,
  options?: OptionsObject
}

export interface NotificationState {
  notifications: StackedNotification[]
}

// initial state
const initialState: NotificationState = {
  notifications: [],
};

export const notificationSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    enqueueNotification: (state: NotificationState, action: PayloadAction<StackedNotification>) => {
      state.notifications = [action.payload];
    }
  },
});

export const { enqueueNotification } = notificationSlice.actions;

export default notificationSlice.reducer;