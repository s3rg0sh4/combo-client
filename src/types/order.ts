import dayjs from "dayjs";
import { guidEmpty } from "../consts";
import { Temperature, Waybill, WaybillStatus } from "./waybill";

export interface Order {
    id: string,
    creationDate: Date;
    orderer: string,
    arrivalDate: Date;
    waybills: Waybill[]
}

export interface OrderDTO {
    id: string;
    creationDate: Date;
    orderer: string;
    arrivalDate: Date;
    waybills: WaybillDTO[];
}

export interface WaybillDTO {
    id: string;
    destination: string;
    temperature: Temperature;
    arrivalDate: Date;
    status: WaybillStatus;
}

export const initialOrder: OrderDTO = {
    id: guidEmpty,
    creationDate: dayjs().toDate(),
    orderer: "",
    arrivalDate: dayjs().toDate(),
    waybills: []
}