import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Waybill } from '../types/waybill';

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
        // Другие эндпоинты аналогично...
    }),
});

export const { useGetWaybillsQuery, useCreateWaybillMutation } = apiService;