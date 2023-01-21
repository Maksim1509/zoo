import { createSlice } from '@reduxjs/toolkit';
import { ICar } from '../../types/types';

const initialState: ICar = { name: '', color: '#000000', id: 0 };

const selectCarSlice = createSlice({
  name: 'selectCar',
  initialState: { car: initialState },
  reducers: {
    selectCar(state, { payload }: { payload: ICar }) {
      console.log(payload, state);
      state.car = payload;
    },
  },
});

export const { selectCar } = selectCarSlice.actions;
export default selectCarSlice.reducer;
