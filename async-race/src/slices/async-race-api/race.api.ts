import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICar } from '../../types/types';

export const raceApi = createApi({
  reducerPath: 'raceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
  }),
  tagTypes: ['Cars'],
  endpoints: (builder) => ({
    getCars: builder.query<ICar[], string>({
      query: () => '/garage',
      providesTags: (res) => ['Cars'],
    }),
    createCar: builder.mutation<ICar, ICar>({
      query: ({ ...data }) => ({
        url: '/garage',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Cars'],
    }),
  }),
});

export const { useGetCarsQuery, useCreateCarMutation } = raceApi;
