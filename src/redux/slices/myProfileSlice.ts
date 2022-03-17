import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Volunteer } from 'types';

export interface State {
  myData?: Volunteer
}

const initialState: State = {
  myData: undefined,
};

export const myProfileSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    myProfileFetched: (state: State, action: PayloadAction<Volunteer>) => {
      state.myData = action.payload;
    }
  },
});

export const { myProfileFetched } = myProfileSlice.actions;

export default myProfileSlice.reducer;