import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { raceApi } from '../slices/async-race-api/race.api';
import selectCar from '../slices/selectCarSlice/selectCarSlice';
import pagination from '../slices/paginationSlice/paginationSlice';

const rootReducer = combineReducers({
  pagination,
  selectCar,
  [raceApi.reducerPath]: raceApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(raceApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
