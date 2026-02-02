import { createAction, props } from '@ngrx/store';
import { Vehicle, VehicleRequest } from '../model/vehicle.model';

export const loadVehicles = createAction('[Vehicle] Load Vehicles');
export const loadVehiclesSuccess = createAction('[Vehicle] Load Vehicles Success', props<{ vehicles: Vehicle[] }>());
export const loadVehiclesFailure = createAction('[Vehicle] Load Vehicles Failure', props<{ error: any }>());

export const createVehicle = createAction('[Vehicle] Create Vehicle', props<{ vehicle: VehicleRequest }>());
export const createVehicleSuccess = createAction('[Vehicle] Create Vehicle Success', props<{ vehicle: Vehicle }>());
export const createVehicleFailure = createAction('[Vehicle] Create Vehicle Failure', props<{ error: any }>());

export const updateVehicle = createAction('[Vehicle] Update Vehicle', props<{ id: string; vehicle: VehicleRequest }>());
export const updateVehicleSuccess = createAction('[Vehicle] Update Vehicle Success', props<{ vehicle: Vehicle }>());
export const updateVehicleFailure = createAction('[Vehicle] Update Vehicle Failure', props<{ error: any }>());
