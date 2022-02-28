import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface State {
  id?: number
}

const initialState: State = {
  id: undefined,
};

export const myProfileSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    myProfileCalled: (state: State, action: PayloadAction<number>) => {
      state.id = action.payload;
    }
  },
});

export const { myProfileCalled } = myProfileSlice.actions;

export default myProfileSlice.reducer;