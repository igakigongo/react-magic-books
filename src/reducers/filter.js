import { createSlice } from '@reduxjs/toolkit';

const initialState = 'ALL';

const filter = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    change: (_, action) => action.payload,
  },
});

export const { change } = filter.actions;
export default filter.reducer;
