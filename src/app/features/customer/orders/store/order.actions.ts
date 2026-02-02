import { createAction, props } from '@ngrx/store';
import { Order, OrderRequest } from '../model/order.model';

export const loadOrders = createAction('[Order] Load Orders');
export const loadOrdersSuccess = createAction('[Order] Load Orders Success', props<{ orders: Order[] }>());
export const loadOrdersFailure = createAction('[Order] Load Orders Failure', props<{ error: any }>());

export const loadOrder = createAction('[Order] Load Order', props<{ id: string }>());
export const loadOrderSuccess = createAction('[Order] Load Order Success', props<{ order: Order }>());
export const loadOrderFailure = createAction('[Order] Load Order Failure', props<{ error: any }>());

export const createOrder = createAction('[Order] Create Order', props<{ order: OrderRequest }>());
export const createOrderSuccess = createAction('[Order] Create Order Success', props<{ order: Order }>());
export const createOrderFailure = createAction('[Order] Create Order Failure', props<{ error: any }>());

export const updateOrder = createAction('[Order] Update Order', props<{ id: string; order: OrderRequest }>());
export const updateOrderSuccess = createAction('[Order] Update Order Success', props<{ order: Order }>());
export const updateOrderFailure = createAction('[Order] Update Order Failure', props<{ error: any }>());

export const deleteOrder = createAction('[Order] Delete Order', props<{ id: string }>());
export const deleteOrderSuccess = createAction('[Order] Delete Order Success', props<{ id: string }>());
export const deleteOrderFailure = createAction('[Order] Delete Order Failure', props<{ error: any }>());
