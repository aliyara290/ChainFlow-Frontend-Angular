import { createAction, props } from '@ngrx/store';
import { Delivery, DeliveryRequest } from '../model/delivery.model';

export const loadDeliveries = createAction('[Delivery] Load Deliveries');
export const loadDeliveriesSuccess = createAction('[Delivery] Load Deliveries Success', props<{ deliveries: Delivery[] }>());
export const loadDeliveriesFailure = createAction('[Delivery] Load Deliveries Failure', props<{ error: any }>());

export const loadDelivery = createAction('[Delivery] Load Delivery', props<{ id: string }>());
export const loadDeliverySuccess = createAction('[Delivery] Load Delivery Success', props<{ delivery: Delivery }>());
export const loadDeliveryFailure = createAction('[Delivery] Load Delivery Failure', props<{ error: any }>());

export const createDelivery = createAction('[Delivery] Create Delivery', props<{ delivery: DeliveryRequest }>());
export const createDeliverySuccess = createAction('[Delivery] Create Delivery Success', props<{ delivery: Delivery }>());
export const createDeliveryFailure = createAction('[Delivery] Create Delivery Failure', props<{ error: any }>());

export const updateDelivery = createAction('[Delivery] Update Delivery', props<{ id: string; delivery: DeliveryRequest }>());
export const updateDeliverySuccess = createAction('[Delivery] Update Delivery Success', props<{ delivery: Delivery }>());
export const updateDeliveryFailure = createAction('[Delivery] Update Delivery Failure', props<{ error: any }>());

// Assuming delete is possible
export const deleteDelivery = createAction('[Delivery] Delete Delivery', props<{ id: string }>());
export const deleteDeliverySuccess = createAction('[Delivery] Delete Delivery Success', props<{ id: string }>());
export const deleteDeliveryFailure = createAction('[Delivery] Delete Delivery Failure', props<{ error: any }>());
