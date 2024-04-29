import { guidEmpty } from "../consts";

export interface Truck {
    id: string;
    plateIndex: string;
    vin: string;
    model: string;
    editionYear: string;
    motorNumber: string;
    bodyNumber: string;
    chassisNumber: string;
    color: string;
    registerOrgan: string;
    fuel: number;
    fuelRate: number;
}

export const initialTruck: Truck = {
    id: guidEmpty,
    plateIndex: '',
    vin: '',
    model: '',
    editionYear: '',
    motorNumber: '',
    bodyNumber: '',
    chassisNumber: '',
    color: '',
    registerOrgan: '',
    fuel: 0,
    fuelRate: 0,
};