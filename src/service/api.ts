import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Waybill } from '../types/waybill';
import { Order, OrderDTO } from '../types/order';

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
        })
    }),
});

export const {
    useGetWaybillsQuery,
    useCreateWaybillMutation,
    useGetOrderListQuery,
    useCreateOrderMutation
} = apiService;