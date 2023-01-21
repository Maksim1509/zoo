import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICar } from '../../types/types';

export const raceApi = createApi({
  reducerPath: 'raceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
  }),
  tagTypes: ['Cars'],
  endpoints: (builder) => ({
    getCars: builder.query<{ cars: ICar[]; pages: number }, number>({
      query: (page) => `/garage/?_page=${page}&&_limit=7`,
      transformResponse: (response: ICar[], meta) => ({
        cars: response,
        pages: Number(meta?.response?.headers.get('X-Total-Count')),
      }),
      providesTags: () => ['Cars'],
    }),
    createCar: builder.mutation<ICar, ICar>({
      query: ({ ...data }) => ({
        url: '/garage',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Cars'],
    }),
    updateCar: builder.mutation<ICar, ICar>({
      query: ({ id, ...data }) => ({
        url: `/garage/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Cars'],
    }),
    removeCar: builder.mutation<object, number>({
      query: (id) => ({
        url: `/garage/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cars'],
    }),
  }),
});

export const {
  useGetCarsQuery,
  useCreateCarMutation,
  useUpdateCarMutation,
  useRemoveCarMutation,
} = raceApi;
