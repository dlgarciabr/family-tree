import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OptionsObject, SnackbarMessage } from 'notistack';

export const types = {
  ENQUEUE_SNACKBAR: 'views/app/ENQUEUE_SNACKBAR',
  // CLOSE_SNACKBAR: "views/app/CLOSE_SNACKBAR",
  // REMOVE_SNACKBAR: "views/app/REMOVE_SNACKBAR",
};

export interface StackedNotification {
  key: number,
  message: SnackbarMessage,
  dismissed: boolean,
  options?: OptionsObject
}

export interface MessageState {
  notifications: StackedNotification[]
}

const initialState: MessageState = {
  notifications: [],
};

export const notificationSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    enqueueNotification: (state: MessageState, action: PayloadAction<StackedNotification>) => {
      state.notifications = [action.payload];
    }
  },
});

export const { enqueueNotification } = notificationSlice.actions;

export default notificationSlice.reducer;