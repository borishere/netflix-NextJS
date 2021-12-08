import { createApi } from '@reduxjs/toolkit/query/react';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { IGetMoviesArgs, Imovie, ImovieBase, IMoviesResponse } from '../Models/models';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { BASE_API_URL } from '../common/utils';
import { HYDRATE } from 'next-redux-wrapper';

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string
      method: AxiosRequestConfig['method']
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params']
    },
    unknown,
    unknown
  > =>
    async ({ url, method, data, params: queryParams }) => {
      const params = {
        url: baseUrl + url,
        method,
        data,
        params: queryParams
      };

      try {
        const result = await axios(params);

        return { data: result.data };
      } catch (axiosError) {
        let err = axiosError as AxiosError;

        return {
          error: { status: err.response?.status, data: err.response?.data }
        };
      }
    };


export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: axiosBaseQuery({ baseUrl: BASE_API_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  tagTypes: ['Movies'],
  endpoints: (builder) => ({
    getMovie: builder.query<Imovie, string>({
      query: (id) => ({
        url: `movies/${id}`,
        method: 'get'
      })
    }),

    getMovies: builder.query<Imovie[], IGetMoviesArgs>({
      query: (args) => {
        return {
          url: 'movies',
          params: args,
          method: 'GET'
        };
      },
      transformResponse: (response: IMoviesResponse) => response.data,
      // CACHE
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Movies' as const, id })),
            { type: 'Movies', id: 'LIST' }
          ]
          : [{ type: 'Movies', id: 'LIST' }]
    }),

    addMovie: builder.mutation<Imovie, ImovieBase>({
      query: (body) => ({
        url: 'movies',
        method: 'POST',
        data: body
      }),
      invalidatesTags: [{ type: 'Movies', id: 'LIST' }]
    }),

    editMovie: builder.mutation<Imovie, Imovie>({
      query: (body) => ({
        url: 'movies',
        method: 'PUT',
        data: body
      }),
      invalidatesTags: [{ type: 'Movies', id: 'LIST' }]
    }),

    deleteMovie: builder.mutation<void, number>({
      query: (id) => ({
        url: `movies/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'Movies', id: 'LIST' }]
    })
  })
});

export const {
  useGetMoviesQuery,
  useGetMovieQuery,
  useAddMovieMutation,
  useEditMovieMutation,
  useDeleteMovieMutation,
  util: { getRunningOperationPromises }
} = moviesApi;

export const { getMovies } = moviesApi.endpoints;
