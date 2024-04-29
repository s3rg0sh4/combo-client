import { guidEmpty } from "../consts";

export interface Trailer {
    id: string;
    plateIndex: string;
    brend: string;
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

export const initialTrailer: Trailer = {
    id: guidEmpty,
    plateIndex: '',
    brend: '',
    maxPalletes: 0,
    refrigeratorType: RefrigeratorType.None,
  };