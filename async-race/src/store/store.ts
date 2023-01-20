import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { raceApi } from '../slices/async-race-api/race.api';

export const store = configureStore({
  reducer: {
    [raceApi.reducerPath]: raceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(raceApi.middleware),
});

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
