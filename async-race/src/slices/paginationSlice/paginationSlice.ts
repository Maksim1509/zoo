import { createSlice } from '@reduxjs/toolkit';

const initialState = { page: 1 };

const paginationSlice = createSlice({
  name: 'paginationState',
  initialState,
  reducers: {
    changePage(state, { payload }: { payload: { page: number } }) {
      state.page = payload.page;
    },
  },
});

export const { changePage } = paginationSlice.actions;
export default paginationSlice.reducer;
