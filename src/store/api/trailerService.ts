import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Trailer } from '../../types';
import { baseUrl } from '../../consts';


export const trailerService = createApi({
    reducerPath: 'trailer',
    baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/trailer` }),
    endpoints: (builder) => ({
        getTrailerList: builder.query<Trailer[], void>({
            query: () => ''
        }),
        getTrailer: builder.query<Trailer, string>({
            query: (id) => (`${id}`)
        }),
        createTrailer: builder.mutation<void, Trailer>({
            query: (trailer) => ({
                url: '',
                method: 'POST',
                body: trailer
            })
        }),
        deleteTrailerList: builder.mutation<void, string[]>({
            query: (ids) => ({
                url: '',
                method: 'DELETE',
                body: ids
            })
        }),
        deleteTrailer: builder.mutation<void, string>({
            query: (id) => ({
                url: `${id}`,
                method: 'DELETE',
            })
        })
    })
});

export const {
    useGetTrailerListQuery, useGetTrailerQuery, useCreateTrailerMutation, useDeleteTrailerListMutation, useDeleteTrailerMutation
} = trailerService;
