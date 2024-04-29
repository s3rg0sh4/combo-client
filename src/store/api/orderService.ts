import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Order, OrderDTO } from '../../types';
import { baseUrl } from '../../consts';

export const orderService = createApi({
    reducerPath: 'order',
    baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/order` }),
    endpoints: (builder) => ({
        getOrderList: builder.query<OrderDTO[], void>({
            query: () => ''
        }),
        createOrder: builder.mutation<void, Order>({
            query: (order) => ({
                url: '',
                method: 'POST',
                body: order
            })
        }),
    })
});

export const {
    useGetOrderListQuery, useCreateOrderMutation
} = orderService;

