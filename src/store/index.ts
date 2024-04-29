import { configureStore } from "@reduxjs/toolkit";
import { orderService, trailerService, truckService, waybillService } from "./api";

export const store = configureStore({
    reducer: {
        [orderService.reducerPath]: orderService.reducer,
        [trailerService.reducerPath]: trailerService.reducer,
        [truckService.reducerPath]: truckService.reducer,
        [waybillService.reducerPath]: waybillService.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(orderService.middleware)
            .concat(trailerService.middleware)
            .concat(truckService.middleware)
            .concat(waybillService.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch