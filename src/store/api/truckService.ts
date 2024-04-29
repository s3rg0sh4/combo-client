import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Truck } from '../../types/truck';
import { baseUrl } from '../../consts';


export const truckService = createApi({
    reducerPath: 'truck',
    baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/truck` }),
    endpoints: (builder) => ({
        getTruckList: builder.query<Truck[], void>({
            query: () => ''
        }),
        getTruck: builder.query<Truck, string>({
            query: (id) => (`${id}`)
        }),
        createTruck: builder.mutation<void, Truck>({
            query: (truck) => ({
                url: '',
                method: 'POST',
                body: truck
            })
        }),
        deleteTruckList: builder.mutation<void, string[]>({
            query: (ids) => ({
                url: '',
                method: 'DELETE',
                body: ids
            })
        }),
        deleteTruck: builder.mutation<void, string>({
            query: (id) => ({
                url: `${id}`,
                method: 'DELETE',
            })
        })
    })
});

export const {
    useGetTruckListQuery, useGetTruckQuery, useCreateTruckMutation, useDeleteTruckListMutation, useDeleteTruckMutation
} = truckService;
