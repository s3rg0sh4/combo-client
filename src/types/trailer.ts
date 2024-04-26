import { guidEmpty } from "../consts";

export interface Trailer {
    id: string;
    plateIndex: string;
    brend: string;
    number: string;
    maxPalletes: number;
    refrigeratorType: RefrigeratorType;
}

export enum RefrigeratorType {
    None = 'None',
    Refrigerator = 'Refrigerator',
    Freezer = 'Freezer',
    Combined = 'Combined',
    Multitemperature = 'Multitemperature'
}

export const initialTrailer = {
    id: guidEmpty,
    plateIndex: '',
    brend: '',
    number: '',
    maxPalletes: 0,
    refrigeratorType: RefrigeratorType.None,
  };