import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Waybill } from '../../types';
import { baseUrl } from '../../consts';


export const waybillService = createApi({
    reducerPath: 'waybill',
    baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/waybill` }),
    endpoints: (builder) => ({
        getWaybills: builder.query<Waybill[], void>({
            query: () => ''
        }),
        createWaybill: builder.mutation<Waybill, Partial<Waybill>>({
            query: (waybill) => ({
                url: '',
                method: 'POST',
                body: waybill
            })
        }),
    })
});

export const {
    useGetWaybillsQuery, useCreateWaybillMutation,
} = waybillService;
