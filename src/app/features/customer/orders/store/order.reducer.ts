import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Order } from '../model/order.model';
import * as OrderActions from './order.actions';

export interface OrderState extends EntityState<Order> {
    selectedOrderId: string | null;
    loading: boolean;
    error: any;
}

export const adapter: EntityAdapter<Order> = createEntityAdapter<Order>();

export const initialState: OrderState = adapter.getInitialState({
    selectedOrderId: null,
    loading: false,
    error: null,
});

export const orderReducer = createReducer(
    initialState,
    on(OrderActions.loadOrders, (state) => ({ ...state, loading: true, error: null })),
    on(OrderActions.loadOrdersSuccess, (state, { orders }) => adapter.setAll(orders, { ...state, loading: false })),
    on(OrderActions.loadOrdersFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(OrderActions.loadOrder, (state) => ({ ...state, loading: true, error: null })),
    on(OrderActions.loadOrderSuccess, (state, { order }) => adapter.upsertOne(order, { ...state, loading: false, selectedOrderId: order.id })),
    on(OrderActions.loadOrderFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(OrderActions.createOrder, (state) => ({ ...state, loading: true, error: null })),
    on(OrderActions.createOrderSuccess, (state, { order }) => adapter.addOne(order, { ...state, loading: false })),
    on(OrderActions.createOrderFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(OrderActions.updateOrder, (state) => ({ ...state, loading: true, error: null })),
    on(OrderActions.updateOrderSuccess, (state, { order }) => adapter.updateOne({ id: order.id, changes: order }, { ...state, loading: false })),
    on(OrderActions.updateOrderFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(OrderActions.deleteOrder, (state) => ({ ...state, loading: true, error: null })),
    on(OrderActions.deleteOrderSuccess, (state, { id }) => adapter.removeOne(id, { ...state, loading: false })),
    on(OrderActions.deleteOrderFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();
