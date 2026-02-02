import { createAction, props } from '@ngrx/store';
import { Driver, DriverRequest } from '../model/driver.model';

export const loadDrivers = createAction('[Driver] Load Drivers');
export const loadDriversSuccess = createAction('[Driver] Load Drivers Success', props<{ drivers: Driver[] }>());
export const loadDriversFailure = createAction('[Driver] Load Drivers Failure', props<{ error: any }>());

export const createDriver = createAction('[Driver] Create Driver', props<{ driver: DriverRequest }>());
export const createDriverSuccess = createAction('[Driver] Create Driver Success', props<{ driver: Driver }>());
export const createDriverFailure = createAction('[Driver] Create Driver Failure', props<{ error: any }>());

export const updateDriver = createAction('[Driver] Update Driver', props<{ id: string; driver: DriverRequest }>());
export const updateDriverSuccess = createAction('[Driver] Update Driver Success', props<{ driver: Driver }>());
export const updateDriverFailure = createAction('[Driver] Update Driver Failure', props<{ error: any }>());
