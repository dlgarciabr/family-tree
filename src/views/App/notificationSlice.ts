import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { OptionsObject, SnackbarMessage } from 'notistack';

export const types = {
  ENQUEUE_SNACKBAR: "views/app/ENQUEUE_SNACKBAR",
  // CLOSE_SNACKBAR: "views/app/CLOSE_SNACKBAR",
  // REMOVE_SNACKBAR: "views/app/REMOVE_SNACKBAR",
};

export interface StackedNotification {
  key: number,
  message: SnackbarMessage,
  options?: OptionsObject
}

export interface MessageState {
  notifications: StackedNotification[]
}

const initialState: MessageState = {
  notifications: [],
}

export const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    enqueueSnackbar: (state: MessageState, action: PayloadAction<StackedNotification>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.notifications = [action.payload]
    }
  },
})

export const { enqueueSnackbar } = messageSlice.actions

export default messageSlice.reducer