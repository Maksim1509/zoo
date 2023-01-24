import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICarPayload, ICar, IRaceData } from '../../types/types';

export const raceApi = createApi({
  reducerPath: 'raceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
  }),
  tagTypes: ['Cars'],
  endpoints: (builder) => ({
    getCars: builder.query<{ cars: ICar[]; count: number }, number>({
      query: (page) => `/garage/?_page=${page}&&_limit=7`,
      transformResponse: (response: ICar[], meta) => ({
        cars: response,
        count: Number(meta?.response?.headers.get('X-Total-Count')),
      }),
      providesTags: () => ['Cars'],
    }),
    createCar: builder.mutation<ICar, ICarPayload>({
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
    startStopRequest: builder.mutation<
      IRaceData,
      { id: number; status: string }
    >({
      query: ({ id, status }) => ({
        url: `/engine/?id=${id}&&status=${status}`,
        method: 'PATCH',
      }),
    }),
    driveREquest: builder.mutation<unknown, number>({
      query: (id) => ({
        url: `/engine/?id=${id}&&status=drive`,
        method: 'PATCH',
      }),
    }),
  }),
});

export const {
  useGetCarsQuery,
  useCreateCarMutation,
  useUpdateCarMutation,
  useRemoveCarMutation,
  useStartStopRequestMutation,
  useDriveREquestMutation,
} = raceApi;
