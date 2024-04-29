import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Order, OrderDTO, Trailer, Waybill } from '../types';
import { Truck } from '../types/truck';

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
        }),
        deleteTrailerList: builder.mutation<void, string[]>({
            query: (ids) => ({
                url: '/trailer',
                method: 'DELETE',
                body: ids
            })
        }),
        deleteTrailer: builder.mutation<void, string>({
            query: (id) => ({
                url: `/trailer${id}`,
                method: 'DELETE',
            })
        }),
        getTruckList: builder.query<Truck[], void>({
            query: () => '/truck'
        }),
        getTruck: builder.query<Truck, string>({
            query: (id) => (`/truck${id}`)
        }),
        createTruck: builder.mutation<void, Truck>({
            query: (truck) => ({
                url: '/truck',
                method: 'POST',
                body: truck
            })
        }),
        deleteTruckList: builder.mutation<void, string[]>({
            query: (ids) => ({
                url: '/truck',
                method: 'DELETE',
                body: ids
            })
        }),
        deleteTruck: builder.mutation<void, string>({
            query: (id) => ({
                url: `/truck${id}`,
                method: 'DELETE',
            })
        }),
    }),
});

export const {
    useGetWaybillsQuery,
    useCreateWaybillMutation,
    useGetOrderListQuery,
    useCreateOrderMutation,
    useGetTrailerListQuery,
    useGetTrailerQuery,
    useCreateTrailerMutation,
    useDeleteTrailerListMutation,
    useDeleteTrailerMutation,
    useGetTruckListQuery,
    useGetTruckQuery,
    useCreateTruckMutation,
    useDeleteTruckListMutation,
    useDeleteTruckMutation
} = apiService;