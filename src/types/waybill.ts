import dayjs from "dayjs";
import { guidEmpty } from "../consts";

export interface Waybill {
    id: string;
    orderId: string;
    routeSheetId: string;
    creationDate: Date;
    arrivalDate: Date;
    temperature: Temperature;
    temperatureRemark: string;
    declaredCargo: Cargo;
    actualCargo: Cargo;
    destination: Destination;
    status: WaybillStatus;
    commentaries?: Commentary[];
}

export interface Cargo {
    id: string;
    palleteCount: number;
    boxCount: number;
    weight: number;
    price: number;
}

export interface Destination {
    id: string;
    view: string;
}

export interface Commentary {
    id: string;
    userId: string;
    created: string;
    message: string;
    commentatorType: CommentatorType;
}

export enum CommentatorType {
    Staff = "Staff",
    Client = "Client",
}

export enum WaybillStatus {
    Accepted = "Accepted",
}

export enum Temperature {
    None = "None",
    Frozen = "Frozen",
    Cold = "Cold",
    Both = "Both",
}

export const initialWaybill: Waybill = {
    id: guidEmpty,
    orderId: guidEmpty,
    routeSheetId: guidEmpty,
    temperature: Temperature.None,
    temperatureRemark: "",
    destination: {
        id: guidEmpty,
        view: ""
    },
    declaredCargo: {
        id: guidEmpty,
        palleteCount: 0,
        boxCount: 0,
        weight: 0,
        price: 0
    },
    actualCargo: {
        id: guidEmpty,
        palleteCount: 0,
        boxCount: 0,
        weight: 0,
        price: 0
    },
    status: WaybillStatus.Accepted,
    commentaries: [],

    creationDate: dayjs().toDate(),
    arrivalDate: dayjs().toDate(),

    // creationDate: dayjs().toLocaleString(),
    // arrivalDate: dayjs().toLocaleString(),
}