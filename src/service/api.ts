import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Order, OrderDTO, Trailer, Waybill } from '../types';

export const apiService = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5113' }),
    endpoints: (builder) => ({
        getWaybills: builder.query<Waybill[], void>({
            query: () => '/waybill'
        }),
        createWaybill: builder.mutation<Waybill, Partial<Waybill>>({
            query: (waybill) => ({
                url: '/waybill',
                method: 'POST',
                body: waybill
            })
        }),
        getOrderList: builder.query<OrderDTO[], void>({
            query: () => '/order'
        }),
        createOrder: builder.mutation<void, Order>({
            query: (order) => ({
                url: '/order',
                method: 'POST',
                body: order
            })
        }),
        getTrailerList: builder.query<Trailer[], void>({
            query: () => '/trailer'
        }),
        getTrailer: builder.query<Trailer, string>({
            query: (id) => (`/trailer${id}`)
        }),
        createTrailer: builder.mutation<void, Trailer>({
            query: (trailer) => ({
                url: '/trailer',
                method: 'POST',
                body: trailer
            })
        })
    }),
});

export const {
    useGetWaybillsQuery,
    useCreateWaybillMutation,
    useGetOrderListQuery,
    useCreateOrderMutation,
    useGetTrailerListQuery,
    useGetTrailerQuery,
    useCreateTrailerMutation
} = apiService;